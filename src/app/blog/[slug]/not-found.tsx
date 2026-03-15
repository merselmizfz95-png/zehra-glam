import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

export default function BlogPostNotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-lg px-4 text-center py-24">
          <FileX className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Article Not Found</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-inter)] mb-8">
            The article you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button render={<Link href="/blog" />} className="font-[family-name:var(--font-inter)]">
              Back to Blog
            </Button>
            <Button variant="outline" render={<Link href="/" />} className="font-[family-name:var(--font-inter)]">
              Go Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
