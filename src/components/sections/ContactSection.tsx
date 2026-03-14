"use client";

import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { createBooking } from "@/actions/booking";
import { toast } from "sonner";
import type { ContactInfo, Service } from "@/types/database";

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

  const contactItems = [
    { icon: MapPin, label: info.address },
    { icon: Phone, label: info.phone },
    { icon: Mail, label: info.email },
    { icon: Clock, label: info.hours },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
              {t.contact.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-lg font-[family-name:var(--font-inter)]">
              {t.contact.subtitle}
            </p>
            <div className="mt-6 w-16 h-[2px] bg-primary mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <ScrollReveal variant="slide-left" className="lg:col-span-2">
            <div className="space-y-6">
              {contactItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="pt-3">
                    <p className="text-sm text-foreground font-[family-name:var(--font-inter)]">
                      {label}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button
                  render={<a href={info.booking_url} target="_blank" rel="noopener noreferrer" />}
                  size="lg"
                  className="font-[family-name:var(--font-inter)] h-12"
                >
                  {t.contact.bookOnline}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
              <form action={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c-name" className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground">
                      {t.contact.name}
                    </Label>
                    <Input id="c-name" name="name" required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="c-email" className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground">
                      {t.contact.email}
                    </Label>
                    <Input id="c-email" name="email" type="email" required className="mt-2 h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c-phone" className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground">
                      {t.contact.phone}
                    </Label>
                    <Input id="c-phone" name="phone" required className="mt-2 h-11" />
                  </div>
                  <div>
                    <Label htmlFor="c-service" className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground">
                      {t.contact.service}
                    </Label>
                    <select
                      id="c-service"
                      name="service"
                      required
                      className="mt-2 w-full h-11 rounded-md border border-input bg-background px-3 text-sm font-[family-name:var(--font-inter)]"
                    >
                      <option value="">{t.contact.service}</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="c-date" className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground">
                    {t.contact.preferredDate}
                  </Label>
                  <Input id="c-date" name="preferred_date" type="date" className="mt-2 h-11" />
                </div>

                <div>
                  <Label htmlFor="c-message" className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted-foreground">
                    {t.contact.message}
                  </Label>
                  <Textarea id="c-message" name="message" rows={4} className="mt-2" />
                </div>

                <Button type="submit" size="lg" className="w-full h-12 font-[family-name:var(--font-inter)]">
                  {t.contact.send}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
