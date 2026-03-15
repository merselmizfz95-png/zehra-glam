import { getAllBlogPosts } from "@/lib/data";
import { BlogManager } from "./BlogManager";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Blog</h1>
      <BlogManager posts={posts} />
    </div>
  );
}
