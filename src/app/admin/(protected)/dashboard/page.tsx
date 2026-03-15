import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ShoppingBag,
  MessageSquare,
  CalendarDays,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [services, products, testimonials, bookings, blogPosts] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
  ]);

  const [pendingBookings, publishedPosts, recentBookings] = await Promise.all([
    supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("published", true),
    supabase
      .from("bookings")
      .select("id, name, email, service, status, preferred_date, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Services",
      count: services.count ?? 0,
      icon: Briefcase,
      href: "/admin/services",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Products",
      count: products.count ?? 0,
      icon: ShoppingBag,
      href: "/admin/products",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Blog Posts",
      count: blogPosts.count ?? 0,
      icon: FileText,
      href: "/admin/blog",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      badge: publishedPosts.count ?? 0,
      badgeLabel: "published",
    },
    {
      label: "Testimonials",
      count: testimonials.count ?? 0,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Bookings",
      count: bookings.count ?? 0,
      icon: CalendarDays,
      href: "/admin/bookings",
      color: "text-primary",
      bg: "bg-primary/10",
      badge: pendingBookings.count ?? 0,
      badgeLabel: "pending",
    },
  ];

  const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground font-[family-name:var(--font-inter)] mt-1">
          Welcome back — here&apos;s an overview of your studio.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-all duration-200 border-border/50 cursor-pointer hover:border-primary/20 group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} />
                  </div>
                  {stat.badge !== undefined && stat.badge > 0 && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-[family-name:var(--font-inter)]">
                      {stat.badge} {stat.badgeLabel}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold group-hover:text-primary transition-colors">{stat.count}</p>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)] mt-0.5">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Recent Bookings
            </h2>
            <Link
              href="/admin/bookings"
              className="text-xs text-primary hover:underline font-[family-name:var(--font-inter)]"
            >
              View all →
            </Link>
          </div>
          <Card className="border-border/50">
            <CardContent className="p-0">
              {recentBookings.data && recentBookings.data.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {recentBookings.data.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-sm">{booking.name}</p>
                        <p className="text-xs text-muted-foreground font-[family-name:var(--font-inter)]">
                          {booking.service}
                          {booking.preferred_date && ` · ${booking.preferred_date}`}
                        </p>
                      </div>
                      <Badge
                        className={`text-[10px] font-[family-name:var(--font-inter)] ${STATUS_COLORS[booking.status] || ""}`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground font-[family-name:var(--font-inter)] text-sm">
                  No bookings yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { href: "/admin/blog", label: "Write New Post", icon: FileText },
              { href: "/admin/products", label: "Add Product", icon: ShoppingBag },
              { href: "/admin/bookings", label: "Manage Bookings", icon: CalendarDays },
              { href: "/admin/hero", label: "Edit Hero Section", icon: Briefcase },
              { href: "/admin/services", label: "Edit Services", icon: Briefcase },
              { href: "/admin/about", label: "Edit About Section", icon: MessageSquare },
              { href: "/", label: "View Live Site ↗", icon: TrendingUp, external: true },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all font-[family-name:var(--font-inter)] text-sm font-medium"
              >
                <action.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
