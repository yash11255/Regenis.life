import type { Metadata } from "next";
import { SchemaScript } from "./components/SchemaScript";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { businessConfig, BUSINESS_DESCRIPTION, BUSINESS_GEO, BUSINESS_SOCIAL_LINKS } from "@/lib/business-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://regenis.life"),
  title: {
    default: "Regenis Life | Clinical & Wellness Equipment",
    template: "%s | Regenis Life",
  },
  description: BUSINESS_DESCRIPTION,
  applicationName: "Regenis Life",
  authors: [{ name: "Regenis Life" }],
  creator: "Regenis Life",
  publisher: "Regenis Life",
  verification: {
    google: "TTFxLHyYBu9XSuoVpXk7WpsUsSKAsZsYytWNmKQJMzc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Regenis Life | Clinical & Wellness Equipment",
    description: BUSINESS_DESCRIPTION,
    url: "/",
    siteName: "Regenis Life",
    locale: BUSINESS_GEO.locale,
    type: "website",
    images: [{ url: "/Regenis.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regenis Life | Clinical & Wellness Equipment",
    description: BUSINESS_DESCRIPTION,
    images: ["/Regenis.png"],
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema({
    name: businessConfig.name,
    url: businessConfig.url,
    logo: businessConfig.logo,
    image: businessConfig.image,
    description: businessConfig.description,
    telephone: businessConfig.phone,
    email: businessConfig.email,
    sameAs: BUSINESS_SOCIAL_LINKS,
    knowsAbout: [
      "Medical equipment distribution",
      "Wellness technology",
      "Hyperbaric oxygen therapy equipment",
      "Aesthetic and body contouring systems",
      "Rehabilitation and performance diagnostics",
      "Recovery and regeneration technology",
    ],
  });
  const websiteSchema = generateWebSiteSchema({
    name: businessConfig.name,
    url: businessConfig.url,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <meta name="geo.region" content={BUSINESS_GEO.region} />
        <meta name="geo.placename" content={BUSINESS_GEO.placename} />
        <meta httpEquiv="content-language" content={`${BUSINESS_GEO.language}-${BUSINESS_GEO.country}`} />
        <SchemaScript
          schema={[organizationSchema, websiteSchema]}
          id="business-schema"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
