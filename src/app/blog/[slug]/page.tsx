import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getBlogPostBySlug } from "@/lib/data";
import { BlogArticle } from "./BlogArticle";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title_en} | Zehra Glam Blog`,
    description: post.excerpt_en,
    openGraph: {
      title: post.title_en,
      description: post.excerpt_en,
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <BlogArticle post={post} />
      </main>
      <Footer />
    </>
  );
}
