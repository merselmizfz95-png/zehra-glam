import { PageTransition } from "@/components/animations/PageTransition";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
