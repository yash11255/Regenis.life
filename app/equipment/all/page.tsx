import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PageShell from "../../components/PageShell";
import PartnerSection from "../../components/equipment/PartnerSection";
import { SchemaScript } from "../../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateOfferCatalogSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";

import { visibleEquipment } from "../../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/equipment/all`;
const PAGE_DESCRIPTION =
  "Browse Regenis Life's full medical and wellness equipment catalog, including hyperbaric, aesthetic, rehabilitation, diagnostics, recovery, and robotics systems.";

interface AllEquipmentPageProps {
  searchParams: Promise<{ partner?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "Medical Equipment Catalog",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/equipment/all",
  },
  openGraph: {
    title: "All Equipment | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/equipment/all",
    type: "website",
    images: visibleEquipment[0] ? [{ url: visibleEquipment[0].image, alt: visibleEquipment[0].name }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "All Equipment | Regenis Life",
    description: PAGE_DESCRIPTION,
    images: [visibleEquipment[0]?.image ?? "/Regenis.png"],
  },
};

export default async function AllEquipmentPage({ searchParams }: AllEquipmentPageProps) {
  const params = await searchParams;
  const initialPartner = Array.isArray(params.partner) ? params.partner[0] : params.partner;
  const collectionSchema = generateWebPageSchema({
    name: "All Equipment | Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    mainEntity: { "@id": `${PAGE_URL}#equipment-list` },
    dateModified: SEO_LAST_MODIFIED,
    about: {
      "@type": "Thing",
      name: "Medical and wellness equipment catalog",
    },
    speakable: ["h1", ".catalog-page-summary"],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: `${BUSINESS_URL}/equipment` },
    { label: "All Equipment", url: PAGE_URL },
  ]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Equipment Partners",
    visibleEquipment.map((eq) => ({
      name: eq.name,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
      image: `${BUSINESS_URL}${eq.image}`,
      itemType: ["Product", "MedicalDevice"],
      brand: eq.partner,
      manufacturer: eq.manufacturer || eq.partner,
      category: eq.category,
    })),
    `${PAGE_URL}#equipment-list`
  );
  const offerCatalogSchema = generateOfferCatalogSchema(
    "Regenis Life Equipment Services",
    visibleEquipment.map((eq) => ({
      name: eq.name,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
    }))
  );

  return (
    <PageShell headerVariant="transparent">
      <main className="font-sans antialiased bg-transparent">
        <SchemaScript id="all-equipment-schema" schema={[collectionSchema, breadcrumbSchema, itemListSchema, offerCatalogSchema]} />
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; }
        `}} />

        {/* ── Compact header ── */}
        <section className="px-[clamp(24px,5vw,80px)] pt-[clamp(112px,14vw,160px)] pb-[clamp(48px,6vw,72px)]">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-[6px] text-[11px] font-bold tracking-[0.13em] uppercase text-[#bbbbbb] no-underline mb-10 transition-colors duration-200 hover:text-[#1c69d4]"
          >
            <ChevronLeft size={16} />
            Back to Equipment
          </Link>
          <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#bbbbbb] leading-[1.3] mb-6">
            Regenis Life — Full Catalog
          </div>
          <h1 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(36px,5.5vw,80px)] text-white max-w-[900px]">
            All <span className="text-[#1c69d4]">Equipment</span>
          </h1>
          <p className="catalog-page-summary mt-7 max-w-[680px] text-[15px] leading-[1.75] text-[#bbbbbb]">
            {PAGE_DESCRIPTION}
          </p>
        </section>

        <PartnerSection equipments={visibleEquipment} initialCategory={initialPartner} />

        {/* Footer */}
        <section className="px-[clamp(36px,6vw,88px)] py-[clamp(64px,8vw,112px)] bg-transparent text-white border-t border-white/[0.08] text-center">
          <div className="text-[11px] font-normal tracking-[0.2em] uppercase text-[#bbbbbb] leading-[1.3]">
            Regenis Life © {new Date().getFullYear()}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
