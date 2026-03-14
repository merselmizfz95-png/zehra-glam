import { getBookings } from "@/lib/data";
import { BookingsManager } from "./BookingsManager";

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Bookings</h1>
      <BookingsManager bookings={bookings} />
    </div>
  );
}
