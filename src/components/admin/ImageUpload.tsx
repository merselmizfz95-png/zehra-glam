"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/actions/upload";
import { toast } from "sonner";

interface ImageUploadProps {
  currentUrl: string | null;
  onUploaded: (url: string) => void;
  onRemoved?: () => void;
  folder?: string;
  className?: string;
}

export function ImageUpload({
  currentUrl,
  onUploaded,
  onRemoved,
  folder = "general",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);

    const result = await uploadImage(formData);

    if ("error" in result) {
      toast.error(result.error);
      setPreview(currentUrl);
    } else {
      setPreview(result.url);
      onUploaded(result.url);
      toast.success("Image uploaded");
    }

    setUploading(false);
    URL.revokeObjectURL(localPreview);
  }

  function handleRemove() {
    setPreview(null);
    onRemoved?.();
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-border/50 bg-muted">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={250}
            className="w-full h-40 object-cover"
            unoptimized={preview.startsWith("blob:")}
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-7 w-7 p-0"
              onClick={handleRemove}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-32 rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Upload className="h-5 w-5" />
          <span className="text-xs font-[family-name:var(--font-inter)]">
            Click to upload image
          </span>
          <span className="text-[10px] font-[family-name:var(--font-inter)]">
            JPG, PNG, WebP or GIF (max 5 MB)
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && !uploading && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          className="w-full text-xs font-[family-name:var(--font-inter)]"
        >
          <Upload className="h-3 w-3 mr-1.5" />
          Replace Image
        </Button>
      )}
    </div>
  );
}
