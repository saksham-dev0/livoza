import type { Metadata } from "next";
import { Poppins, Playfair_Display, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Girls PG near Christ University Yeshwanthpur | Livoza — Fully Furnished, 100m from Campus",
  description:
    "Looking for a girls PG near Christ University Yeshwanthpur? Livoza offers fully furnished single, double & triple sharing rooms 100m from campus. High-speed WiFi, 24/7 security, no broker fees. Call now.",
  keywords: "girls PG near Christ University Yeshwanthpur, ladies PG Yeshwanthpur, girls hostel Yeshwanthpur Bangalore, PG near Christ University, girls accommodation Yeshwanthpur, budget girls PG Yeshwanthpur, fully furnished PG Yeshwanthpur",
  alternates: {
    canonical: "https://livoza.org",
  },
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Girls PG near Christ University Yeshwanthpur | Livoza",
    description: "Fully furnished girls-only PG 100m from Christ University Yeshwanthpur. Single, double & triple sharing. 24/7 security. No broker fees.",
    url: "https://livoza.org",
    siteName: "Livoza Living",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          "name": "Livoza Living — Girls PG near Christ University Yeshwanthpur",
          "description": "Girls-only fully furnished PG accommodation 100m from Christ University Yeshwanthpur, Bangalore. Single, double & triple sharing rooms with WiFi, 24/7 security, and no broker fees.",
          "url": "https://livoza.org",
          "telephone": "+919353477987",
          "email": "info@livoza.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Near Christ University, Yeshwanthpur",
            "addressLocality": "Yeshwanthpur",
            "addressRegion": "Karnataka",
            "postalCode": "560022",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.0219,
            "longitude": 77.5397
          },
          "priceRange": "₹₹",
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "High-Speed WiFi", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Washing Machine", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Refrigerator", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Smart TV", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Power Backup", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Balcony", "value": true }
          ],
          "audience": { "@type": "Audience", "audienceType": "Female students" },
          "sameAs": ["https://livoza.org"]
        }) }} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T3MXF77P');` }} />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ClerkProvider
          signInFallbackRedirectUrl="/referral"
          signUpFallbackRedirectUrl="/referral"
        >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3MXF77P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
