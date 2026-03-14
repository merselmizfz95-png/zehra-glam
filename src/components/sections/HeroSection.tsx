"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import type { HeroContent } from "@/types/database";

interface HeroSectionProps {
  hero: HeroContent | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const { t, locale } = useI18n();

  const title =
    locale === "en"
      ? hero?.title_en || t.hero.defaultTitle
      : hero?.title_fr || t.hero.defaultTitle;
  const subtitle =
    locale === "en"
      ? hero?.subtitle_en || t.hero.defaultSubtitle
      : hero?.subtitle_fr || t.hero.defaultSubtitle;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold-light via-background to-cream" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-8 font-[family-name:var(--font-inter)]">
          <Sparkles className="h-4 w-4" />
          Beauty & Aesthetics Studio
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-primary italic">
            {title.split(" ").slice(-1)}
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button render={<Link href="#services" />} size="lg" className="text-base px-8 font-[family-name:var(--font-inter)]">
              {t.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            render={<Link href="/booking" />}
            variant="outline"
            size="lg"
            className="text-base px-8 font-[family-name:var(--font-inter)]"
          >
            {t.hero.ctaBooking}
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto font-[family-name:var(--font-inter)]">
          <div>
            <p className="text-3xl font-bold text-primary">10+</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "en" ? "Years Experience" : "Ans d'Experience"}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">5K+</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "en" ? "Happy Clients" : "Clientes Satisfaites"}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "en" ? "Certified" : "Certifiee"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
