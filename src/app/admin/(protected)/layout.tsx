import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto ml-0 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
