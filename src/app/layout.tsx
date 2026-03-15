import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/lib/i18n/context";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zehra Glam | Beauty & Aesthetics Studio",
  description:
    "Premium aesthetic treatments crafted to enhance your natural beauty with expert care and luxurious results. Facial treatments, laser epilation, eyelash extensions, and curated skincare products in Brussels.",
  keywords: [
    "beauty", "aesthetics", "facial treatment", "laser epilation",
    "eyelash extensions", "skincare", "Brussels", "Ixelles",
    "beauty products", "cosmetics",
  ],
  metadataBase: new URL("https://zehra-five.vercel.app"),
  openGraph: {
    title: "Zehra Glam | Beauty & Aesthetics Studio",
    description:
      "Premium aesthetic treatments crafted to enhance your natural beauty.",
    url: "https://zehra-five.vercel.app",
    siteName: "Zehra Glam",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Zehra Glam Beauty Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zehra Glam | Beauty & Aesthetics Studio",
    description: "Premium aesthetic treatments crafted to enhance your natural beauty.",
    images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop&q=80"],
  },
  robots: { index: true, follow: true },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Zehra Glam",
    description:
      "Premium aesthetic treatments crafted to enhance your natural beauty with expert care and luxurious results.",
    url: "https://zehra-five.vercel.app",
    telephone: "+32469244955",
    email: "hello@zehra-glam.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue d'Arlon 25",
      addressLocality: "Ixelles",
      addressCountry: "BE",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "5000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Beauty Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facial Treatments" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Epilation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eyelash Extensions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Skincare Products" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <CustomCursor />
            {children}
            <Toaster position="top-right" />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
