"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale, toggleLocale } = useI18n();

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#about", label: t.nav.about },
    { href: "/products", label: t.nav.products },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              Zehra
            </span>
            <span className="text-sm font-light tracking-widest uppercase text-muted-foreground">
              Glam
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-[family-name:var(--font-inter)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className="gap-1.5 font-[family-name:var(--font-inter)]"
            >
              <Globe className="h-4 w-4" />
              {locale === "en" ? "FR" : "EN"}
            </Button>
            <Button render={<Link href="/booking" />} size="sm" className="font-[family-name:var(--font-inter)]">
              {t.nav.booking}
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-muted-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary font-[family-name:var(--font-inter)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={toggleLocale} className="gap-1.5">
                <Globe className="h-4 w-4" />
                {locale === "en" ? "FR" : "EN"}
              </Button>
              <Button render={<Link href="/booking" />} size="sm">
                {t.nav.booking}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
