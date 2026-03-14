import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  ShoppingBag,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [services, products, testimonials, bookings] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
  ]);

  const pendingBookings = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  const stats = [
    {
      label: "Services",
      count: services.count ?? 0,
      icon: Briefcase,
      href: "/admin/services",
    },
    {
      label: "Products",
      count: products.count ?? 0,
      icon: ShoppingBag,
      href: "/admin/products",
    },
    {
      label: "Testimonials",
      count: testimonials.count ?? 0,
      icon: MessageSquare,
      href: "/admin/testimonials",
    },
    {
      label: "Bookings",
      count: bookings.count ?? 0,
      icon: CalendarDays,
      href: "/admin/bookings",
      badge: pendingBookings.count ?? 0,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow border-border/50 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  {stat.badge !== undefined && stat.badge > 0 && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-[family-name:var(--font-inter)]">
                      {stat.badge} pending
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold">{stat.count}</p>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/admin/hero", label: "Edit Hero Section" },
            { href: "/admin/about", label: "Edit About Section" },
            { href: "/admin/contact", label: "Edit Contact Info" },
            { href: "/admin/products", label: "Manage Products" },
            { href: "/admin/bookings", label: "View Bookings" },
            { href: "/", label: "View Live Site" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              target={action.href === "/" ? "_blank" : undefined}
              className="block p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors font-[family-name:var(--font-inter)] text-sm font-medium"
            >
              {action.label} &rarr;
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
