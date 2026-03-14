"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import { upsertService, deleteService } from "@/actions/admin";
import { toast } from "sonner";
import type { Service } from "@/types/database";

interface ServicesManagerProps {
  services: Service[];
}

export function ServicesManager({ services }: ServicesManagerProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(service: Service) {
    setEditing(service);
    setOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    const result = await upsertService(formData);
    if (result.success) {
      toast.success(editing ? "Service updated" : "Service created");
      setOpen(false);
    } else {
      toast.error(result.error || "Failed to save");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    const result = await deleteService(id);
    if (result.success) {
      toast.success("Service deleted");
    } else {
      toast.error(result.error || "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={openCreate} className="font-[family-name:var(--font-inter)]">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Service" : "New Service"}</DialogTitle>
            </DialogHeader>
            <form action={handleSubmit} className="space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Name (EN)</Label>
                  <Input name="name_en" defaultValue={editing?.name_en ?? ""} required className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Name (FR)</Label>
                  <Input name="name_fr" defaultValue={editing?.name_fr ?? ""} required className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Description (EN)</Label>
                  <Textarea name="description_en" defaultValue={editing?.description_en ?? ""} required rows={3} className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Description (FR)</Label>
                  <Textarea name="description_fr" defaultValue={editing?.description_fr ?? ""} required rows={3} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Icon</Label>
                  <Input name="icon" defaultValue={editing?.icon ?? "Sparkles"} className="mt-1" placeholder="Sparkles, Zap, Eye, Heart" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Display Order</Label>
                  <Input name="display_order" type="number" defaultValue={editing?.display_order ?? 0} className="mt-1" />
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
        {services.map((service) => (
          <Card key={service.id} className="border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{service.name_en}</p>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  {service.name_fr} &middot; Icon: {service.icon} &middot; Order: {service.display_order}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(service)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {services.length === 0 && (
          <p className="text-muted-foreground text-center py-8 font-[family-name:var(--font-inter)]">
            No services yet. Click &ldquo;Add Service&rdquo; to create one.
          </p>
        )}
      </div>
    </div>
  );
}
