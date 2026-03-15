"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  sendBookingConfirmationToClient,
  sendBookingNotificationToStudio,
} from "@/lib/email";

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
  const { error } = await supabase.from("bookings").insert({
    ...parsed.data,
    status: "pending",
  });

  if (error) {
    return { error: { _form: ["Failed to submit booking. Please try again."] } };
  }

  // Send emails – fire-and-forget so a mail failure doesn't break the booking
  const emailData = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service,
    preferred_date: parsed.data.preferred_date,
    message: parsed.data.message,
  };

  await Promise.allSettled([
    sendBookingConfirmationToClient(emailData),
    sendBookingNotificationToStudio(emailData),
  ]);

  return { success: true };
}
