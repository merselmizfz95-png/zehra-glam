"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-lg px-4 text-center py-20">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-8 font-[family-name:var(--font-inter)]">
            We couldn&apos;t load the blog. Please try again.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={reset} className="font-[family-name:var(--font-inter)]">
              Try Again
            </Button>
            <Button
              variant="outline"
              render={<Link href="/" />}
              className="font-[family-name:var(--font-inter)]"
            >
              Go Home
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
