"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { upsertProduct, deleteProduct } from "@/actions/admin";
import { toast } from "sonner";
import type { Product } from "@/types/database";

interface ProductsManagerProps {
  products: Product[];
  categories: string[];
}

export function ProductsManager({ products, categories }: ProductsManagerProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);

  function openCreate() {
    setEditing(null);
    setInStock(true);
    setFeatured(false);
    setOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setInStock(product.in_stock);
    setFeatured(product.featured);
    setOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    formData.set("in_stock", String(inStock));
    formData.set("featured", String(featured));
    const result = await upsertProduct(formData);
    if (result.success) {
      toast.success(editing ? "Product updated" : "Product created");
      setOpen(false);
    } else {
      toast.error(result.error || "Failed to save");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const result = await deleteProduct(id);
    if (result.success) toast.success("Product deleted");
    else toast.error(result.error || "Failed to delete");
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={openCreate} className="font-[family-name:var(--font-inter)]">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Product" : "New Product"}</DialogTitle>
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Price (EUR)</Label>
                  <Input name="price" type="number" step="0.01" defaultValue={editing?.price ?? 0} required className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Category</Label>
                  <select
                    name="category"
                    defaultValue={editing?.category ?? categories[0]}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-[family-name:var(--font-inter)]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={inStock} onCheckedChange={setInStock} />
                    <Label className="font-[family-name:var(--font-inter)] text-sm">In Stock</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={featured} onCheckedChange={setFeatured} />
                    <Label className="font-[family-name:var(--font-inter)] text-sm">Featured</Label>
                  </div>
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
        {products.map((product) => (
          <Card key={product.id} className="border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{product.name_en}</p>
                    {product.featured && <Badge variant="default" className="text-[10px]">Featured</Badge>}
                    {!product.in_stock && <Badge variant="secondary" className="text-[10px]">Out of Stock</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                    {product.category} &middot; &euro;{Number(product.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(product)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {products.length === 0 && (
          <p className="text-muted-foreground text-center py-8 font-[family-name:var(--font-inter)]">
            No products yet.
          </p>
        )}
      </div>
    </div>
  );
}
