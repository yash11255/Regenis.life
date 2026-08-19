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
  generateWebPageSchema,
} from "@/lib/schema";

import { visibleEquipment } from "../../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/equipment/all`;
const PAGE_DESCRIPTION =
  "Browse the full Regenis Life equipment catalog — every hyperbaric chamber, aesthetic platform, body composition analyzer, and regenerative therapy system from our globally certified partners.";

export const metadata: Metadata = {
  title: "All Equipment | Full Medical Technology Catalog",
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
  },
};

export default function AllEquipmentPage() {
  const collectionSchema = generateWebPageSchema({
    name: "All Equipment | Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: `${BUSINESS_URL}/equipment` },
    { label: "All Equipment", url: PAGE_URL },
  ]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Equipment Partners",
    visibleEquipment.map((eq) => ({
      name: `${eq.partner} - ${eq.name}`,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
      image: eq.image,
    }))
  );

  return (
    <PageShell headerVariant="transparent">
      <main className="font-sans antialiased overflow-hidden bg-[#141414]">
        <SchemaScript id="all-equipment-schema" schema={[collectionSchema, breadcrumbSchema, itemListSchema]} />
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
        </section>

        <PartnerSection equipments={visibleEquipment} />

        {/* Footer */}
        <section className="px-[clamp(36px,6vw,88px)] py-[clamp(64px,8vw,112px)] bg-[#141414] text-white border-t border-white/[0.08] text-center">
          <div className="text-[11px] font-normal tracking-[0.2em] uppercase text-[#bbbbbb] leading-[1.3]">
            Regenis Life © {new Date().getFullYear()}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
