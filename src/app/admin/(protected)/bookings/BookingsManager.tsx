"use client";

import { Trash2, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateBookingStatus, deleteBooking } from "@/actions/admin";
import { toast } from "sonner";
import type { Booking } from "@/types/database";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

interface BookingsManagerProps {
  bookings: Booking[];
}

export function BookingsManager({ bookings }: BookingsManagerProps) {
  async function handleStatusChange(id: string, status: string) {
    const result = await updateBookingStatus(id, status);
    if (result.success) toast.success(`Status updated to ${status}`);
    else toast.error(result.error || "Failed to update");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this booking?")) return;
    const result = await deleteBooking(id);
    if (result.success) toast.success("Booking deleted");
    else toast.error(result.error || "Failed to delete");
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarDays className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
          No bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <Card key={booking.id} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{booking.name}</p>
                  <Badge className={`text-[10px] ${STATUS_COLORS[booking.status] || ""}`}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-0.5 font-[family-name:var(--font-inter)]">
                  <p>{booking.email} &middot; {booking.phone}</p>
                  <p>Service: {booking.service}</p>
                  {booking.preferred_date && <p>Date: {booking.preferred_date}</p>}
                  {booking.message && <p className="italic">&ldquo;{booking.message}&rdquo;</p>}
                  <p className="text-xs opacity-60">
                    {new Date(booking.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select
                  defaultValue={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className="text-xs rounded-md border border-input bg-background px-2 py-1.5 font-[family-name:var(--font-inter)]"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Button variant="outline" size="sm" onClick={() => handleDelete(booking.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
