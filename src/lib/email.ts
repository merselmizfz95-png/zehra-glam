import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const STUDIO_EMAIL = process.env.STUDIO_NOTIFICATION_EMAIL ?? "hello@zehra-glam.com";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date?: string;
  message?: string;
}

export async function sendBookingConfirmationToClient(booking: BookingData) {
  const dateText = booking.preferred_date
    ? `<p><strong>Preferred Date:</strong> ${booking.preferred_date}</p>`
    : "";
  const messageText = booking.message
    ? `<p><strong>Your Message:</strong> ${booking.message}</p>`
    : "";

  await resend.emails.send({
    from: `Zehra Glam <${FROM}>`,
    to: booking.email,
    subject: "Booking Request Received – Zehra Glam",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #8b3a3a; padding: 32px 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; font-size: 24px; margin: 0; letter-spacing: 0.02em;">Zehra Glam</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 6px 0 0; font-family: Arial, sans-serif; letter-spacing: 0.15em; text-transform: uppercase;">Beauty &amp; Aesthetics Studio</p>
        </div>
        <div style="background: #fff; padding: 40px; border: 1px solid #f0e8e8; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 20px; margin: 0 0 8px;">Thank you, ${booking.name}!</h2>
          <p style="color: #666; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            We have received your booking request and will confirm your appointment shortly.
          </p>
          <div style="background: #fdf6f6; border-left: 3px solid #8b3a3a; padding: 20px 24px; border-radius: 0 8px 8px 0; margin-bottom: 24px; font-family: Arial, sans-serif; font-size: 14px; line-height: 2;">
            <p style="margin:0;"><strong>Service:</strong> ${booking.service}</p>
            ${dateText}
            <p style="margin:0;"><strong>Phone:</strong> ${booking.phone}</p>
            ${messageText}
          </div>
          <p style="color: #666; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.6;">
            If you have any questions, reply to this email or call us at
            <a href="tel:+32469244955" style="color: #8b3a3a;">+32 469 244 955</a>.
          </p>
          <p style="color: #999; font-family: Arial, sans-serif; font-size: 12px; margin-top: 32px;">
            Rue d'Arlon 25 · Ixelles, Brussels · Belgium
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendBookingNotificationToStudio(booking: BookingData) {
  const dateText = booking.preferred_date ? `\nPreferred Date: ${booking.preferred_date}` : "";
  const messageText = booking.message ? `\nMessage: ${booking.message}` : "";

  await resend.emails.send({
    from: `Zehra Glam Bookings <${FROM}>`,
    to: STUDIO_EMAIL,
    subject: `New Booking Request – ${booking.name} (${booking.service})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-size: 18px; margin-bottom: 16px;">New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666; width: 140px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${booking.email}" style="color:#8b3a3a;">${booking.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Phone</td>
            <td style="padding: 8px 0;">${booking.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; color: #666;">Service</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.service}</td>
          </tr>
          ${booking.preferred_date ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #666;">Preferred Date</td><td style="padding: 8px 0;">${booking.preferred_date}</td></tr>` : ""}
          ${booking.message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 8px 0;">${booking.message}</td></tr>` : ""}
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #999;">
          Manage in <a href="https://zehra-five.vercel.app/admin/bookings" style="color:#8b3a3a;">Admin → Bookings</a>
        </p>
      </div>
    `,
    text: `New Booking\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nService: ${booking.service}${dateText}${messageText}`,
  });
}
