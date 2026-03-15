"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TESTIMONIAL_IMAGE_MAP } from "@/constants/images";
import type { Testimonial } from "@/types/database";
import { DEFAULT_TESTIMONIALS } from "@/constants/siteConfig";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t, locale } = useI18n();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const items =
    testimonials.length > 0
      ? testimonials
      : DEFAULT_TESTIMONIALS.map((item, i) => ({ id: String(i), ...item }));

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const item = items[current];
  const quote = locale === "en" ? item.quote_en : item.quote_fr;
  const service = locale === "en" ? item.service_en : item.service_fr;
  const avatarUrl = TESTIMONIAL_IMAGE_MAP[item.client_name] || "";

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-28 bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
              {t.testimonials.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.testimonials.title}
            </h2>
            <div className="mt-6 w-16 h-[2px] bg-primary mx-auto" />
          </div>
        </ScrollReveal>

        <div className="relative min-h-[320px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center"
            >
              <Quote className="h-12 w-12 text-primary/20 mx-auto mb-8" />

              <p className="text-xl sm:text-2xl lg:text-3xl text-background/90 leading-relaxed font-light italic max-w-3xl mx-auto">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex gap-1 justify-center mt-8">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-foreground">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={item.client_name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-lg font-bold">
                      {item.client_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-background">{item.client_name}</p>
                  <p className="text-sm text-background/50 font-[family-name:var(--font-inter)]">{service}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background/5 hover:bg-background/10 backdrop-blur-sm border border-background/10 flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-background/60" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background/5 hover:bg-background/10 backdrop-blur-sm border border-background/10 flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-background/60" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-background/20 hover:bg-background/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
