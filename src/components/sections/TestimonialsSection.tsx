"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { TESTIMONIAL_IMAGE_MAP } from "@/constants/images";
import type { Testimonial } from "@/types/database";
import { DEFAULT_TESTIMONIALS } from "@/constants/siteConfig";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t, locale } = useI18n();

  const displayTestimonials =
    testimonials.length > 0
      ? testimonials
      : DEFAULT_TESTIMONIALS.map((item, i) => ({ id: String(i), ...item }));

  return (
    <section id="testimonials" className="py-28 bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
              {t.testimonials.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.testimonials.title}
            </h2>
            <div className="mt-6 w-16 h-[2px] bg-primary mx-auto" />
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {displayTestimonials.map((testimonial) => {
            const quote = locale === "en" ? testimonial.quote_en : testimonial.quote_fr;
            const service = locale === "en" ? testimonial.service_en : testimonial.service_fr;
            const avatarUrl = TESTIMONIAL_IMAGE_MAP[testimonial.client_name] || "";

            return (
              <StaggerItem key={testimonial.id}>
                <div className="relative p-8 rounded-2xl bg-background/[0.05] backdrop-blur-sm border border-background/10 hover:border-primary/20 transition-all duration-500 group">
                  <Quote className="h-10 w-10 text-primary/20 mb-6" />

                  <p className="text-background/80 leading-relaxed font-[family-name:var(--font-inter)] text-[15px]">
                    &ldquo;{quote}&rdquo;
                  </p>

                  <div className="flex gap-0.5 mt-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={testimonial.client_name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                          {testimonial.client_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-background">
                        {testimonial.client_name}
                      </p>
                      <p className="text-xs text-background/50 font-[family-name:var(--font-inter)]">
                        {service}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
