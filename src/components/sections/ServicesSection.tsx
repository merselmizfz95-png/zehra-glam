"use client";

import { Sparkles, Zap, Eye, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import type { Service } from "@/types/database";
import { DEFAULT_SERVICES } from "@/constants/siteConfig";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Zap,
  Eye,
  Heart,
};

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
    <section id="services" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3 font-[family-name:var(--font-inter)]">
            {t.services.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            const name = locale === "en" ? service.name_en : service.name_fr;
            const desc =
              locale === "en"
                ? service.description_en
                : service.description_fr;

            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-inter)]">
                    {desc}
                  </p>
                  <Button
                    render={<Link href="/booking" />}
                    variant="link"
                    className="mt-4 p-0 text-primary font-[family-name:var(--font-inter)]"
                  >
                    {t.services.learnMore}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
