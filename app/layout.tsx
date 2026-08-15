import type { Metadata } from "next";
import { SchemaScript } from "./components/SchemaScript";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { businessConfig, BUSINESS_SOCIAL_LINKS } from "@/lib/business-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://regenis.life"),
  title: {
    default: "Regenis Life | Clinical & Wellness Equipment",
    template: "%s | Regenis Life",
  },
  description:
    "Regenis Life curates a portfolio of clinically-precise, globally certified medical and wellness equipment — hyperbaric chambers, aesthetic platforms, and regenerative therapy systems — for facilities that demand outcomes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Regenis Life | Clinical & Wellness Equipment",
    description:
      "Globally certified medical and wellness equipment, precision-selected for clinical environments where outcomes define reputation.",
    url: "/",
    siteName: "Regenis Life",
    locale: "en_US",
    type: "website",
    images: [{ url: "/regenis-logo.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regenis Life | Clinical & Wellness Equipment",
    description:
      "Globally certified medical and wellness equipment, precision-selected for clinical environments where outcomes define reputation.",
    images: ["/regenis-logo.svg"],
  },
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
        <SchemaScript
          schema={[organizationSchema, websiteSchema]}
          id="business-schema"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
