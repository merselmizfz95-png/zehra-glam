"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { SERVICE_IMAGE_MAP } from "@/constants/images";
import type { Service } from "@/types/database";
import { DEFAULT_SERVICES } from "@/constants/siteConfig";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { t, locale } = useI18n();

  const displayServices =
    services.length > 0
      ? services
      : DEFAULT_SERVICES.map((s, i) => ({
          id: String(i),
          ...s,
          image_url: null,
          display_order: i,
        }));

  return (
    <section id="services" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
              {t.services.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.services.title}
            </h2>
            <div className="mt-6 w-16 h-[2px] bg-primary mx-auto" />
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.12}>
          {displayServices.map((service) => {
            const name = locale === "en" ? service.name_en : service.name_fr;
            const desc = locale === "en" ? service.description_en : service.description_fr;
            const imageUrl = service.image_url || SERVICE_IMAGE_MAP[service.icon] || "";

            return (
              <StaggerItem key={service.id}>
                <div className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{name}</h3>
                    <p className="text-sm text-white/70 leading-relaxed font-[family-name:var(--font-inter)] line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                      {desc}
                    </p>
                    <Button
                      render={<Link href="/booking" />}
                      variant="link"
                      className="mt-3 p-0 text-white/90 hover:text-white font-[family-name:var(--font-inter)] opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      {t.services.learnMore}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
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
