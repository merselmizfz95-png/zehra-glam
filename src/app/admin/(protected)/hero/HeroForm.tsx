"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateHeroContent } from "@/actions/admin";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import type { HeroContent } from "@/types/database";

interface HeroFormProps {
  hero: HeroContent | null;
}

export function HeroForm({ hero }: HeroFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(hero?.image_url ?? null);

  async function handleSubmit(formData: FormData) {
    if (imageUrl) formData.set("image_url", imageUrl);
    const result = await updateHeroContent(formData);
    if (result.success) {
      toast.success("Hero section updated");
    } else {
      toast.error(result.error || "Failed to update");
    }
  }

  if (!hero) {
    return <p className="text-muted-foreground">No hero content found. Please seed the database.</p>;
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={hero.id} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-inter)]">English</h3>
              <div className="space-y-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Title</Label>
                  <Input name="title_en" defaultValue={hero.title_en} className="mt-1.5" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Subtitle</Label>
                  <Textarea name="subtitle_en" defaultValue={hero.subtitle_en} rows={3} className="mt-1.5" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">CTA Text</Label>
                  <Input name="cta_text_en" defaultValue={hero.cta_text_en} className="mt-1.5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-inter)]">French</h3>
              <div className="space-y-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Titre</Label>
                  <Input name="title_fr" defaultValue={hero.title_fr} className="mt-1.5" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Sous-titre</Label>
                  <Textarea name="subtitle_fr" defaultValue={hero.subtitle_fr} rows={3} className="mt-1.5" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Texte CTA</Label>
                  <Input name="cta_text_fr" defaultValue={hero.cta_text_fr} className="mt-1.5" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label className="font-[family-name:var(--font-inter)]">Hero Image</Label>
            <div className="mt-1">
              <ImageUpload
                currentUrl={imageUrl}
                onUploaded={(url) => setImageUrl(url)}
                onRemoved={() => setImageUrl(null)}
                folder="hero"
              />
            </div>
          </div>

          <Button type="submit" className="font-[family-name:var(--font-inter)]">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
