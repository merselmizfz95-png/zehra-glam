"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { IMAGES } from "@/constants/images";
import type { AboutContent } from "@/types/database";

interface AboutSectionProps {
  about: AboutContent | null;
}

export function AboutSection({ about }: AboutSectionProps) {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const title = locale === "en"
    ? about?.title_en || t.about.title
    : about?.title_fr || t.about.title;
  const body = locale === "en"
    ? about?.body_en || t.about.defaultBody
    : about?.body_fr || t.about.defaultBody;
  const years = about?.years_experience ?? 10;
  const clients = about?.happy_clients ?? 5000;

  const stats = [
    { icon: Award, value: `${years}+`, label: t.about.yearsExp },
    { icon: Users, value: `${clients.toLocaleString()}+`, label: t.about.happyClients },
    { icon: BadgeCheck, value: "100%", label: t.about.certified },
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal variant="slide-left">
            <div className="relative">
              <motion.div
                style={{ y: imgY }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={IMAGES.about}
                  alt="Zehra Glam studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              <motion.div
                style={{ y: img2Y }}
                className="absolute -bottom-8 -right-6 w-48 h-64 rounded-2xl overflow-hidden border-4 border-background shadow-2xl hidden sm:block"
              >
                <Image
                  src={IMAGES.aboutSecondary}
                  alt="Beauty treatment"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </motion.div>

              <motion.div
                style={{ y: badgeY }}
                className="absolute -top-4 -left-4 px-6 py-4 bg-primary text-primary-foreground rounded-2xl shadow-xl"
              >
                <p className="text-3xl font-bold">{years}+</p>
                <p className="text-xs font-[family-name:var(--font-inter)] opacity-90">
                  {t.about.yearsExp}
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-right">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
                {t.about.eyebrow}
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                {title}
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg font-[family-name:var(--font-inter)]">
                {body}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="relative p-5 rounded-2xl bg-muted/50 border border-border/50 text-center group hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <stat.icon className="h-5 w-5 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
