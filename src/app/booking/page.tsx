import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "./BookingForm";
import { getServices } from "@/lib/data";

export const metadata = {
  title: "Book Appointment | Zehra Glam",
  description: "Schedule your beauty treatment at Zehra Glam. A €25 deposit confirms your appointment.",
};

interface BookingPageProps {
  searchParams: Promise<{ cancelled?: string }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { cancelled } = await searchParams;
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <BookingForm services={services} cancelled={!!cancelled} />
      </main>
      <Footer />
    </>
  );
}
