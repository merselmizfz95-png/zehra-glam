"use client";

import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/context";
import { createBooking } from "@/actions/booking";
import { toast } from "sonner";
import type { ContactInfo } from "@/types/database";
import type { Service } from "@/types/database";

interface ContactSectionProps {
  contact: ContactInfo | null;
  services: Service[];
}

export function ContactSection({ contact, services }: ContactSectionProps) {
  const { t, locale } = useI18n();

  const info = {
    address: contact?.address ?? "Rue d'Arlon 25, Ixelles",
    phone: contact?.phone ?? "0469 24 49 55",
    email: contact?.email ?? "hello@zehra-glam.com",
    hours: contact?.hours ?? "Mon-Sat: 9:00 - 20:00",
    booking_url: contact?.booking_url ?? "https://www.zehra-glam.com/booking",
  };

  async function handleSubmit(formData: FormData) {
    const result = await createBooking(formData);
    if (result.success) {
      toast.success(t.contact.success);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const serviceOptions = services.length > 0
    ? services.map((s) => locale === "en" ? s.name_en : s.name_fr)
    : ["Facial Treatments", "Laser Epilation", "Eyelash Extensions", "Skincare Products"];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3 font-[family-name:var(--font-inter)]">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, label: info.address },
                { icon: Phone, label: info.phone },
                { icon: Mail, label: info.email },
                { icon: Clock, label: info.hours },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 font-[family-name:var(--font-inter)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button render={<a href={info.booking_url} target="_blank" rel="noopener noreferrer" />} className="font-[family-name:var(--font-inter)]">
                {t.contact.bookOnline}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="font-[family-name:var(--font-inter)]">
                  {t.contact.name}
                </Label>
                <Input id="name" name="name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email" className="font-[family-name:var(--font-inter)]">
                  {t.contact.email}
                </Label>
                <Input id="email" name="email" type="email" required className="mt-1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="font-[family-name:var(--font-inter)]">
                  {t.contact.phone}
                </Label>
                <Input id="phone" name="phone" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="service" className="font-[family-name:var(--font-inter)]">
                  {t.contact.service}
                </Label>
                <select
                  id="service"
                  name="service"
                  required
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background font-[family-name:var(--font-inter)]"
                >
                  <option value="">{t.contact.service}</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
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
              />
            </div>

            <div>
              <Label htmlFor="message" className="font-[family-name:var(--font-inter)]">
                {t.contact.message}
              </Label>
              <Textarea id="message" name="message" rows={4} className="mt-1.5" />
            </div>

            <Button type="submit" size="lg" className="w-full font-[family-name:var(--font-inter)]">
              {t.contact.send}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
