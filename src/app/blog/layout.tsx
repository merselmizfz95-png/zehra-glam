import { PageTransition } from "@/components/animations/PageTransition";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
