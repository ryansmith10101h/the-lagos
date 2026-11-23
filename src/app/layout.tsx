import type { Metadata, Viewport } from "next";
import { BUSINESS_INFO } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thelagos.ng"),
  title: {
    default: `${BUSINESS_INFO.name} | Lekki Phase 1, Lagos`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description:
    "An editorial dining, cocktail, and cultural sanctuary at Road 14 Mall, Plot 153B Adebayo Doherty Road, Lekki Phase 1, Lagos. Fine dining, nightlife, and elevated West African hospitality.",
  keywords: [
    "THE LAGOS",
    "Restaurant Lekki Phase 1",
    "Restaurant on Adebayo Doherty Road",
    "Food in Lekki",
    "Lagos lifestyle restaurant",
    "Road 14 Mall Lekki",
    "Lekki fine dining",
    "Lagos nightlife",
    "Nigerian contemporary dining",
    "Cocktail lounge Lekki",
  ],
  authors: [{ name: "THE LAGOS Hospitality" }],
  creator: "THE LAGOS",
  publisher: "THE LAGOS",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THE LAGOS | Where Lagos Comes to Life",
    description:
      "A culinary and lifestyle destination in Lekki Phase 1. Elevated gastronomy, nocturnal libations, and vibrant Lagos culture.",
    url: "https://thelagos.ng",
    siteName: "THE LAGOS",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "THE LAGOS Sanctuary & Dining Room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE LAGOS | Lekki Phase 1",
    description: "Where Lagos comes to life. Fine dining, craft mixology, and cultural sessions.",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=630&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Restaurant & LocalBusiness JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS_INFO.name,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://thelagos.ng",
    url: "https://thelagos.ng",
    telephone: [BUSINESS_INFO.contact.primaryPhone, BUSINESS_INFO.contact.secondaryPhone],
    priceRange: "₦₦₦",
    servesCuisine: ["West African", "Contemporary Nigerian", "Continental", "Grill & Seafood"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS_INFO.location.venue}, ${BUSINESS_INFO.location.address}`,
      addressLocality: "Lekki Phase 1",
      addressRegion: "Lagos State",
      postalCode: "105102",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.4474,
      longitude: 3.4735,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "23:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "02:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "13:00",
        closes: "23:00",
      },
    ],
    menu: "https://thelagos.ng/menu",
    acceptsReservations: "True",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-lagos-dark text-lagos-cream min-h-screen flex flex-col font-sans selection:bg-lagos-gold selection:text-lagos-dark antialiased">
        {children}
      </body>
    </html>
  );
}
