"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Star, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { PRODUCT_IMAGE_MAP } from "@/constants/images";
import { createCheckoutSession } from "@/actions/stripe";
import { toast } from "sonner";
import type { Product } from "@/types/database";

interface ProductsGridProps {
  products: Product[];
  categories: string[];
}

export function ProductsGrid({ products, categories }: ProductsGridProps) {
  const { t, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleBuy(product: Product) {
    setLoadingId(product.id);
    startTransition(async () => {
      const result = await createCheckoutSession({
        id: product.id,
        name_en: product.name_en,
        price: product.price,
        image_url: product.image_url,
        stripe_price_id: product.stripe_price_id,
      });
      if ("error" in result) {
        toast.error(result.error);
        setLoadingId(null);
      } else {
        window.location.href = result.url;
      }
    });
  }

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
            {t.products.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t.products.title}
          </h1>
          <div className="mt-6 w-16 h-[2px] bg-primary mx-auto" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === "All" ? "All" : cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 font-[family-name:var(--font-inter)] ${
                (cat === "All" ? "All" : cat) === activeCategory
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat === "All" ? t.products.allCategories : cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7" staggerDelay={0.08}>
            {filtered.map((product) => {
              const name = locale === "en" ? product.name_en : product.name_fr;
              const desc = locale === "en" ? product.description_en : product.description_fr;
              const imageUrl = product.image_url || PRODUCT_IMAGE_MAP[product.name_en] || "";

              return (
                <StaggerItem key={product.id}>
                  <div className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-muted" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {product.featured && (
                        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm font-[family-name:var(--font-inter)]">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {t.products.featured}
                        </Badge>
                      )}
                      {!product.in_stock && (
                        <Badge variant="secondary" className="absolute top-4 left-4 backdrop-blur-sm font-[family-name:var(--font-inter)]">
                          {t.products.outOfStock}
                        </Badge>
                      )}
                    </div>

                    <div className="p-6">
                      <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-inter)]">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-tight">{name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-[family-name:var(--font-inter)] leading-relaxed">
                        {desc}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-xl font-bold text-foreground font-[family-name:var(--font-inter)]">
                          &euro;{Number(product.price).toFixed(2)}
                        </p>
                        <Button
                          size="sm"
                          variant={product.in_stock ? "default" : "outline"}
                          disabled={!product.in_stock || loadingId === product.id || isPending}
                          onClick={() => handleBuy(product)}
                          className="font-[family-name:var(--font-inter)] gap-1.5"
                        >
                          {loadingId === product.id ? (
                            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Redirecting…</>
                          ) : product.in_stock ? (
                            <><ShoppingBag className="h-3.5 w-3.5" /> {t.products.addToCart}</>
                          ) : (
                            t.products.outOfStock
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
            {locale === "en"
              ? "No products found in this category."
              : "Aucun produit trouve dans cette categorie."}
          </p>
        </div>
      )}
    </div>
  );
}
