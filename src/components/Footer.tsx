"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tight">Zehra</span>{" "}
              <span className="text-xs font-light tracking-[0.3em] uppercase opacity-50">
                Glam
              </span>
            </Link>
            <p className="mt-4 text-sm opacity-60 font-[family-name:var(--font-inter)] max-w-sm leading-relaxed">
              {t.footer.tagline}. Premium aesthetic treatments crafted to enhance your natural beauty.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 opacity-40 font-[family-name:var(--font-inter)]">
              {t.nav.services}
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-inter)]">
              {["Facial Treatments", "Laser Epilation", "Eyelash Extensions", "Skincare Products"].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/booking"
                      className="text-sm opacity-50 hover:opacity-100 hover:text-primary transition-all duration-300 inline-flex items-center gap-1"
                    >
                      {service}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 opacity-40 font-[family-name:var(--font-inter)]">
              {t.nav.contact}
            </h3>
            <div className="space-y-3 text-sm opacity-50 font-[family-name:var(--font-inter)]">
              <p>Rue d&apos;Arlon 25, Ixelles</p>
              <p>0469 24 49 55</p>
              <p>hello@zehra-glam.com</p>
              <p>Mon&ndash;Sat: 9:00 &ndash; 20:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-30 font-[family-name:var(--font-inter)]">
            &copy; {new Date().getFullYear()} Zehra Glam. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {[t.nav.products, t.nav.booking].map((label, i) => (
              <Link
                key={label}
                href={i === 0 ? "/products" : "/booking"}
                className="text-xs opacity-30 hover:opacity-70 transition-opacity font-[family-name:var(--font-inter)]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
