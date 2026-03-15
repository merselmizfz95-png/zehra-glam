import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getBlogPosts } from "@/lib/data";
import { BlogGrid } from "./BlogGrid";

export const metadata = {
  title: "Blog | Zehra Glam",
  description: "Beauty tips, skincare advice, and treatment guides from our expert aestheticians.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </>
  );
}
