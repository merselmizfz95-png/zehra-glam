import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { sendBookingConfirmationToClient } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("Stripe webhook error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Handle booking deposit payment
    if (session.metadata?.type === "booking_deposit") {
      const bookingId = session.metadata.booking_id;
      if (bookingId) {
        const supabase = await createClient();

        // Update booking to confirmed + paid
        const { data: booking } = await supabase
          .from("bookings")
          .update({
            status: "confirmed",
            payment_status: "paid",
            stripe_session_id: session.id,
          })
          .eq("id", bookingId)
          .select("name, email, phone, service, preferred_date, message")
          .single<{
            name: string;
            email: string;
            phone: string;
            service: string;
            preferred_date: string | null;
            message: string | null;
          }>();

        // Send confirmation email to client
        if (booking) {
          sendBookingConfirmationToClient({
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            service: booking.service,
            preferred_date: booking.preferred_date ?? undefined,
            message: booking.message ?? undefined,
          }).catch(console.error);
        }
      }
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;
    console.error("Payment failed:", intent.id, intent.last_payment_error?.message);
  }

  return NextResponse.json({ received: true });
}
