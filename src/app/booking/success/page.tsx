import Link from "next/link";
import { CheckCircle2, CalendarDays, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Booking Confirmed | Zehra Glam",
};

export default function BookingSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-lg px-4 text-center py-20">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-inter)] mb-8 leading-relaxed">
            Your deposit has been received and your appointment is confirmed.
            Check your email for a confirmation — we look forward to seeing you!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-sm">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 text-left">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Confirmation Email</p>
                <p className="text-muted-foreground font-[family-name:var(--font-inter)] text-xs mt-0.5">
                  Sent to your inbox with all the details.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 text-left">
              <CalendarDays className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Remaining Balance</p>
                <p className="text-muted-foreground font-[family-name:var(--font-inter)] text-xs mt-0.5">
                  Payable at the studio on the day.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button render={<Link href="/" />} className="font-[family-name:var(--font-inter)]">
              Back to Home
            </Button>
            <Button variant="outline" render={<Link href="/blog" />} className="font-[family-name:var(--font-inter)]">
              Read Our Blog
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
