"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { BlogPost } from "@/types/database";

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
  const { t, locale } = useI18n();

  const title = locale === "en" ? post.title_en : post.title_fr;
  const body = locale === "en" ? post.body_en : post.body_fr;
  const date = new Date(post.created_at).toLocaleDateString(
    locale === "en" ? "en-US" : "fr-FR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/blog" />}
          className="mb-8 font-[family-name:var(--font-inter)] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t.blog.backToBlog}
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <Badge
            variant="secondary"
            className="text-[10px] uppercase tracking-wider font-[family-name:var(--font-inter)]"
          >
            <Tag className="h-3 w-3 mr-1" />
            {post.category}
          </Badge>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>
      </ScrollReveal>

      {post.image_url && (
        <ScrollReveal delay={0.15}>
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mt-10 mb-12">
            <Image
              src={post.image_url}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.2}>
        <div className="prose prose-lg dark:prose-invert max-w-none font-[family-name:var(--font-inter)] leading-relaxed">
          {body.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2
                  key={i}
                  className="text-xl font-bold mt-8 mb-4 font-[family-name:var(--font-sans)]"
                >
                  {paragraph.replace(/\*\*/g, "")}
                </h2>
              );
            }

            const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className="mb-4 text-muted-foreground">
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="text-foreground font-semibold">
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              render={<Link href="/blog" />}
              className="font-[family-name:var(--font-inter)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.blog.allArticles}
            </Button>
            <Button
              render={<Link href="/booking" />}
              className="font-[family-name:var(--font-inter)]"
            >
              {t.blog.bookAppointment}
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </article>
  );
}
