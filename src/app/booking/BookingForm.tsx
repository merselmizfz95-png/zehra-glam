"use client";

import { useState } from "react";
import { CalendarDays, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { createBooking } from "@/actions/booking";
import { createBookingDepositSession } from "@/actions/stripe";
import { toast } from "sonner";
import type { Service } from "@/types/database";

interface BookingFormProps {
  services: Service[];
  cancelled?: boolean;
}

export function BookingForm({ services, cancelled }: BookingFormProps) {
  const { t, locale } = useI18n();
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  const serviceOptions =
    services.length > 0
      ? services.map((s) => (locale === "en" ? s.name_en : s.name_fr))
      : ["Facial Treatments", "Laser Epilation", "Eyelash Extensions", "Skincare Products"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Step 1 — save booking to database
    setLoadingMsg(locale === "en" ? "Saving your booking…" : "Enregistrement…");
    const bookingResult = await createBooking(formData);

    if ("error" in bookingResult) {
      const msgs = Object.values(bookingResult.error ?? {}).flat();
      toast.error(msgs[0] ?? "Something went wrong. Please try again.");
      setLoading(false);
      setLoadingMsg("");
      return;
    }

    // Step 2 — create Stripe checkout session
    setLoadingMsg(locale === "en" ? "Redirecting to payment…" : "Redirection vers le paiement…");
    const stripeResult = await createBookingDepositSession({
      bookingId: bookingResult.bookingId,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
    });

    if ("error" in stripeResult) {
      // Booking saved but Stripe failed — still a success, admin will follow up
      toast.success(
        locale === "en"
          ? "Booking received! We'll contact you to confirm your appointment."
          : "Réservation reçue ! Nous vous contacterons pour confirmer."
      );
      setLoading(false);
      setLoadingMsg("");
      return;
    }

    // Step 3 — redirect to Stripe Checkout
    window.location.href = stripeResult.url;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6 font-[family-name:var(--font-inter)]">
          <CalendarDays className="h-4 w-4" />
          {locale === "en" ? "Online Booking" : "Réservation en Ligne"}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {t.contact.title}
        </h1>
        <p className="mt-4 text-muted-foreground font-[family-name:var(--font-inter)]">
          {t.contact.subtitle}
        </p>
      </div>

      {cancelled && (
        <div className="mb-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-400 text-sm font-[family-name:var(--font-inter)] text-center">
          {locale === "en"
            ? "Payment was cancelled. Fill out the form again to try again."
            : "Paiement annulé. Remplissez le formulaire à nouveau pour réessayer."}
        </div>
      )}

      {/* Deposit info banner */}
      <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold font-[family-name:var(--font-inter)]">
            {locale === "en"
              ? "€25 deposit required to confirm your appointment"
              : "Un acompte de 25€ est requis pour confirmer votre rendez-vous"}
          </p>
          <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)] mt-0.5">
            {locale === "en"
              ? "The remaining balance is payable at the studio. Secure payment via Stripe."
              : "Le solde restant est payable au studio. Paiement sécurisé via Stripe."}
          </p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="font-[family-name:var(--font-inter)]">
                  {t.contact.name}
                </Label>
                <Input id="name" name="name" required className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label htmlFor="email" className="font-[family-name:var(--font-inter)]">
                  {t.contact.email}
                </Label>
                <Input id="email" name="email" type="email" required className="mt-1.5" disabled={loading} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="font-[family-name:var(--font-inter)]">
                  {t.contact.phone}
                </Label>
                <Input id="phone" name="phone" required className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label htmlFor="service" className="font-[family-name:var(--font-inter)]">
                  {t.contact.service}
                </Label>
                <select
                  id="service"
                  name="service"
                  required
                  disabled={loading}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-[family-name:var(--font-inter)]"
                >
                  <option value="">{t.contact.service}</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="preferred_date" className="font-[family-name:var(--font-inter)]">
                {t.contact.preferredDate}
              </Label>
              <Input
                id="preferred_date"
                name="preferred_date"
                type="date"
                className="mt-1.5"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="message" className="font-[family-name:var(--font-inter)]">
                {t.contact.message}
              </Label>
              <Textarea id="message" name="message" rows={4} className="mt-1.5" disabled={loading} />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full font-[family-name:var(--font-inter)] gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {loadingMsg}
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  {locale === "en" ? "Book & Pay €25 Deposit" : "Réserver & Payer 25€ d'acompte"}
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {locale === "en"
                ? "Secured by Stripe — your card info is never stored on our servers"
                : "Sécurisé par Stripe — vos informations ne sont jamais stockées"}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
