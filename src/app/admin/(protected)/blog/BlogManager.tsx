"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
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
import { upsertBlogPost, deleteBlogPost } from "@/actions/admin";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import Link from "next/link";
import type { BlogPost } from "@/types/database";

const BLOG_CATEGORIES = ["Skincare", "Beauty Tips", "Treatments"];

interface BlogManagerProps {
  posts: BlogPost[];
}

export function BlogManager({ posts }: BlogManagerProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setPublished(false);
    setImageUrl(null);
    setOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditing(post);
    setPublished(post.published);
    setImageUrl(post.image_url);
    setOpen(true);
  }

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  async function handleSubmit(formData: FormData) {
    formData.set("published", String(published));
    if (imageUrl) formData.set("image_url", imageUrl);
    if (!formData.get("slug")) {
      formData.set("slug", generateSlug(formData.get("title_en") as string));
    }
    const result = await upsertBlogPost(formData);
    if (result.success) {
      toast.success(editing ? "Post updated" : "Post created");
      setOpen(false);
    } else {
      toast.error(result.error || "Failed to save");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    const result = await deleteBlogPost(id);
    if (result.success) toast.success("Post deleted");
    else toast.error(result.error || "Failed to delete");
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={openCreate} className="font-[family-name:var(--font-inter)]">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle>
            </DialogHeader>
            <form action={handleSubmit} className="space-y-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Title (EN)</Label>
                  <Input name="title_en" defaultValue={editing?.title_en ?? ""} required className="mt-1" />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Title (FR)</Label>
                  <Input name="title_fr" defaultValue={editing?.title_fr ?? ""} required className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Slug</Label>
                  <Input
                    name="slug"
                    defaultValue={editing?.slug ?? ""}
                    placeholder="auto-generated-from-title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Category</Label>
                  <select
                    name="category"
                    defaultValue={editing?.category ?? BLOG_CATEGORIES[0]}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-[family-name:var(--font-inter)]"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Excerpt (EN)</Label>
                  <Textarea
                    name="excerpt_en"
                    defaultValue={editing?.excerpt_en ?? ""}
                    required
                    rows={2}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="font-[family-name:var(--font-inter)]">Excerpt (FR)</Label>
                  <Textarea
                    name="excerpt_fr"
                    defaultValue={editing?.excerpt_fr ?? ""}
                    required
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="font-[family-name:var(--font-inter)]">Body (EN)</Label>
                <Textarea
                  name="body_en"
                  defaultValue={editing?.body_en ?? ""}
                  required
                  rows={8}
                  className="mt-1 font-mono text-sm"
                />
              </div>
              <div>
                <Label className="font-[family-name:var(--font-inter)]">Body (FR)</Label>
                <Textarea
                  name="body_fr"
                  defaultValue={editing?.body_fr ?? ""}
                  required
                  rows={8}
                  className="mt-1 font-mono text-sm"
                />
              </div>

              <div>
                <Label className="font-[family-name:var(--font-inter)]">Cover Image</Label>
                <div className="mt-1">
                  <ImageUpload
                    currentUrl={imageUrl}
                    onUploaded={(url) => setImageUrl(url)}
                    onRemoved={() => setImageUrl(null)}
                    folder="blog"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={published} onCheckedChange={setPublished} />
                  <Label className="font-[family-name:var(--font-inter)] text-sm">
                    {published ? "Published" : "Draft"}
                  </Label>
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
        {posts.map((post) => (
          <Card key={post.id} className="border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold truncate">{post.title_en}</p>
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className="text-[10px] shrink-0"
                  >
                    {post.published ? (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        Draft
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  {post.category} &middot; {formatDate(post.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {post.published && (
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/blog/${post.slug}`} target="_blank" />}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => openEdit(post)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground text-center py-8 font-[family-name:var(--font-inter)]">
            No blog posts yet.
          </p>
        )}
      </div>
    </div>
  );
}
