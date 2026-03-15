"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createBookingDepositSession } from "@/actions/stripe";
import { sendBookingNotificationToStudio } from "@/lib/email";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  service: z.string().min(1, "Select a service"),
  message: z.string().optional(),
  preferred_date: z.string().optional(),
});

export async function createBooking(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
    preferred_date: formData.get("preferred_date") as string,
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();

  // Save the booking first with "pending_payment" status
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      ...parsed.data,
      status: "pending",
      payment_status: "unpaid",
    })
    .select("id")
    .single();

  if (error || !booking) {
    return { error: { _form: ["Failed to submit booking. Please try again."] } };
  }

  // Notify the studio (fire-and-forget)
  sendBookingNotificationToStudio({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service,
    preferred_date: parsed.data.preferred_date,
    message: parsed.data.message,
  }).catch(console.error);

  // Create Stripe deposit checkout session
  const stripeResult = await createBookingDepositSession({
    bookingId: booking.id,
    name: parsed.data.name,
    email: parsed.data.email,
    service: parsed.data.service,
  });

  if ("error" in stripeResult) {
    // Booking saved but payment failed to create — still a success, admin can follow up
    return { success: true, checkoutUrl: null };
  }

  // Save the Stripe session ID on the booking
  await supabase
    .from("bookings")
    .update({ stripe_session_id: stripeResult.url.split("/").pop() ?? null })
    .eq("id", booking.id);

  return { success: true, checkoutUrl: stripeResult.url };
}
