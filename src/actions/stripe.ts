"use server";

import { stripe } from "@/lib/stripe";
import type { Product } from "@/types/database";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mz-zehra.space";

const DEPOSIT_AMOUNT_EUR = 25; // €25 deposit for every appointment

export async function createBookingDepositSession(booking: {
  bookingId: string;
  name: string;
  email: string;
  service: string;
}): Promise<{ url: string } | { error: string }> {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: booking.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: DEPOSIT_AMOUNT_EUR * 100,
            product_data: {
              name: `Deposit – ${booking.service}`,
              description: `Appointment deposit for ${booking.name}. The remaining balance is due at the studio.`,
            },
          },
        },
      ],
      payment_method_types: ["card"],
      metadata: {
        booking_id: booking.bookingId,
        type: "booking_deposit",
      },
      success_url: `${BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/booking?cancelled=1`,
    });

    if (!session.url) return { error: "Failed to create checkout session" };
    return { url: session.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { error: message };
  }
}

export async function createCheckoutSession(
  product: Pick<Product, "id" | "name_en" | "price" | "image_url" | "stripe_price_id">
): Promise<{ url: string } | { error: string }> {
  try {
    let priceId = product.stripe_price_id;

    // If no Stripe price exists yet, create a one-time price on the fly
    if (!priceId) {
      const stripeProduct = await stripe.products.create({
        name: product.name_en,
        images: product.image_url ? [product.image_url] : [],
        metadata: { supabase_product_id: product.id },
      });

      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.price * 100),
        currency: "eur",
      });

      priceId = price.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${BASE_URL}/products?success=1`,
      cancel_url: `${BASE_URL}/products?cancelled=1`,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
    });

    if (!session.url) return { error: "Failed to create checkout session" };
    return { url: session.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { error: message };
  }
}
