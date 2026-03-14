"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { upsertTestimonial, deleteTestimonial } from "@/actions/admin";
import { toast } from "sonner";
import type { Testimonial } from "@/types/database";

interface TestimonialsManagerProps {
  testimonials: Testimonial[];
}

export function TestimonialsManager({ testimonials }: TestimonialsManagerProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    const result = await upsertTestimonial(formData);
    if (result.success) {
      toast.success(editing ? "Testimonial updated" : "Testimonial created");
      setOpen(false);
    } else {
      toast.error(result.error || "Failed to save");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const result = await deleteTestimonial(id);
    if (result.success) toast.success("Testimonial deleted");
    else toast.error(result.error || "Failed to delete");
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={openCreate} className="font-[family-name:var(--font-inter)]">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Testimonial" : "New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form action={handleSubmit} className="space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Client Name</Label>
                  <Input name="client_name" defaultValue={editing?.client_name ?? ""} required className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Rating (1-5)</Label>
                  <Input name="rating" type="number" min={1} max={5} defaultValue={editing?.rating ?? 5} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Service (EN)</Label>
                  <Input name="service_en" defaultValue={editing?.service_en ?? ""} required className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Service (FR)</Label>
                  <Input name="service_fr" defaultValue={editing?.service_fr ?? ""} required className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Quote (EN)</Label>
                  <Textarea name="quote_en" defaultValue={editing?.quote_en ?? ""} required rows={3} className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Quote (FR)</Label>
                  <Textarea name="quote_fr" defaultValue={editing?.quote_fr ?? ""} required rows={3} className="mt-1" />
                </div>
              </div>

              <Button type="submit" className="font-[family-name:var(--font-inter)]">
                {editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <Card key={t.id} className="border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{t.client_name}</p>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  {t.service_en}
                </p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(t)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <p className="text-muted-foreground text-center py-8 font-[family-name:var(--font-inter)]">
            No testimonials yet.
          </p>
        )}
      </div>
    </div>
  );
}
