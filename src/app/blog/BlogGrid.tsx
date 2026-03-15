"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import type { BlogPost } from "@/types/database";

const BLOG_CATEGORIES = ["All", "Skincare", "Beauty Tips", "Treatments"];

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const { t, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-inter)]">
            {t.blog.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t.blog.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            {t.blog.subtitle}
          </p>
          <div className="mt-6 w-16 h-[2px] bg-primary mx-auto" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 font-[family-name:var(--font-inter)] ${
                cat === activeCategory
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat === "All" ? t.blog.all : cat}
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
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.08}
          >
            {filtered.map((post) => {
              const title = locale === "en" ? post.title_en : post.title_fr;
              const excerpt = locale === "en" ? post.excerpt_en : post.excerpt_fr;

              return (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <article className="rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        {post.image_url ? (
                          <Image
                            src={post.image_url}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-muted" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase tracking-wider font-[family-name:var(--font-inter)]"
                          >
                            {post.category}
                          </Badge>
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.created_at)}
                          </span>
                        </div>

                        <h2 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                          {title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-[family-name:var(--font-inter)] leading-relaxed">
                          {excerpt}
                        </p>

                        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary font-[family-name:var(--font-inter)]">
                          {t.blog.readMore}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
            {t.blog.noArticles}
          </p>
        </div>
      )}
    </div>
  );
}
