"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, locale, toggleLocale } = useI18n();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#about", label: t.nav.about },
    { href: "/products", label: t.nav.products },
    { href: "/blog", label: "Blog" },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              Zehra
            </span>
            <span
              className={`text-[10px] font-light tracking-[0.3em] uppercase transition-colors duration-300 ${
                scrolled ? "text-muted-foreground" : "text-white/60"
              }`}
            >
              Glam
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-colors duration-300 font-[family-name:var(--font-inter)] uppercase tracking-wider ${
                  scrolled
                    ? "text-muted-foreground hover:text-primary"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle
              className={scrolled ? "text-foreground" : "text-white"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className={`gap-1.5 font-[family-name:var(--font-inter)] transition-colors duration-300 ${
                scrolled ? "" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === "en" ? "FR" : "EN"}
            </Button>
            <Button
              render={<Link href="/booking" />}
              size="sm"
              className="font-[family-name:var(--font-inter)] text-xs tracking-wider uppercase"
            >
              {t.nav.booking}
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b"
          >
            <div className="px-4 py-6 space-y-3">
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
              <div className="flex items-center gap-3 pt-3 border-t">
                <ThemeToggle />
                <Button variant="ghost" size="sm" onClick={toggleLocale} className="gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  {locale === "en" ? "FR" : "EN"}
                </Button>
                <Button render={<Link href="/booking" />} size="sm">
                  {t.nav.booking}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
