"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import type { HeroContent } from "@/types/database";

// Two models: métisse (smoky eye glamour) + blonde (mirror/brush) — Pressmaster / Pexels UHD
const HERO_VIDEOS = [
  // Métisse – smoky eyes, full glam
  "https://videos.pexels.com/video-files/3181590/3181590-uhd_2560_1440_25fps.mp4",
  // Blonde – brush & mirror, warm glow
  "https://videos.pexels.com/video-files/3181792/3181792-uhd_2560_1440_25fps.mp4",
  // Métisse – second angle
  "https://videos.pexels.com/video-files/3181591/3181591-uhd_2560_1440_25fps.mp4",
  // Blonde – second angle
  "https://videos.pexels.com/video-files/3181791/3181791-uhd_2560_1440_25fps.mp4",
];

const POSTER_URL =
  "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=1920&q=90";

interface HeroSectionProps {
  hero: HeroContent | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const { t, locale } = useI18n();
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const title =
    locale === "en"
      ? hero?.title_en || t.hero.defaultTitle
      : hero?.title_fr || t.hero.defaultTitle;
  const subtitle =
    locale === "en"
      ? hero?.subtitle_en || t.hero.defaultSubtitle
      : hero?.subtitle_fr || t.hero.defaultSubtitle;

  const words = title.split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  const handleVideoEnd = () => {
    setFading(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
      setFading(false);
    }, 700);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [activeIdx]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.7s ease-in-out",
          }}
          poster={POSTER_URL}
        >
          <source src={HERO_VIDEOS[activeIdx]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8 font-[family-name:var(--font-inter)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Beauty & Aesthetics Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] text-white"
          >
            {firstPart}{" "}
            <span className="italic text-primary">{lastWord}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-lg font-[family-name:var(--font-inter)] leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              render={<Link href="#services" />}
              size="lg"
              className="text-base px-8 h-12 font-[family-name:var(--font-inter)]"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/booking" />}
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 border-white/30 text-white hover:bg-white/10 hover:text-white font-[family-name:var(--font-inter)]"
            >
              {t.hero.ctaBooking}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex items-center gap-8 sm:gap-12"
          >
            {[
              { value: "10+", label: locale === "en" ? "Years" : "Ans" },
              { value: "5K+", label: locale === "en" ? "Clients" : "Clientes" },
              { value: "100%", label: locale === "en" ? "Certified" : "Certifiee" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/60 mt-1 font-[family-name:var(--font-inter)] uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
