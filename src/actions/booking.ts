"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
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
    message: (formData.get("message") as string) || undefined,
    preferred_date: (formData.get("preferred_date") as string) || undefined,
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    const supabase = await createClient();

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        message: parsed.data.message ?? null,
        preferred_date: parsed.data.preferred_date ?? null,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id")
      .single();

    if (error || !booking) {
      console.error("Booking insert error:", error);
      return { error: { _form: ["Failed to save booking. Please try again."] } };
    }

    // Notify studio in the background — don't block the response
    sendBookingNotificationToStudio({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      service: parsed.data.service,
      preferred_date: parsed.data.preferred_date,
      message: parsed.data.message,
    }).catch(console.error);

    return { success: true, bookingId: booking.id };
  } catch (err) {
    console.error("Unexpected booking error:", err);
    return { error: { _form: ["Unexpected error. Please try again."] } };
  }
}
