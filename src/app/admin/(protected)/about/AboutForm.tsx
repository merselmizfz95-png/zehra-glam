"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateAboutContent } from "@/actions/admin";
import { toast } from "sonner";
import type { AboutContent } from "@/types/database";

interface AboutFormProps {
  about: AboutContent | null;
}

export function AboutForm({ about }: AboutFormProps) {
  async function handleSubmit(formData: FormData) {
    const result = await updateAboutContent(formData);
    if (result.success) {
      toast.success("About section updated");
    } else {
      toast.error(result.error || "Failed to update");
    }
  }

  if (!about) {
    return <p className="text-muted-foreground">No about content found. Please seed the database.</p>;
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="id" value={about.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Years of Experience</Label>
              <Input name="years_experience" type="number" defaultValue={about.years_experience} className="mt-1.5" />
            </div>
            <div>
              <Label className="font-[family-name:var(--font-inter)]">Happy Clients</Label>
              <Input name="happy_clients" type="number" defaultValue={about.happy_clients} className="mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold font-[family-name:var(--font-inter)]">English</h3>
              <div>
                <Label className="font-[family-name:var(--font-inter)]">Title</Label>
                <Input name="title_en" defaultValue={about.title_en} className="mt-1.5" />
              </div>
              <div>
                <Label className="font-[family-name:var(--font-inter)]">Body</Label>
                <Textarea name="body_en" defaultValue={about.body_en} rows={5} className="mt-1.5" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold font-[family-name:var(--font-inter)]">French</h3>
              <div>
                <Label className="font-[family-name:var(--font-inter)]">Titre</Label>
                <Input name="title_fr" defaultValue={about.title_fr} className="mt-1.5" />
              </div>
              <div>
                <Label className="font-[family-name:var(--font-inter)]">Contenu</Label>
                <Textarea name="body_fr" defaultValue={about.body_fr} rows={5} className="mt-1.5" />
              </div>
            </div>
          </div>

          <Button type="submit" className="font-[family-name:var(--font-inter)]">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
