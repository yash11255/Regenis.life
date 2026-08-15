import React from "react";
import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import Hero from "../components/equipment/Hero";
import CategoryOverview from "../components/equipment/CategoryOverview";
import WhyPartners from "../components/equipment/WhyPartners";
import FeaturedShowcase from "../components/equipment/FeaturedShowcase";
import PartnerBrandsSection from "../components/home/PartnerBrandsSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SchemaScript } from "../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL, BUSINESS_EMAIL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateItemListSchema, generateWebPageSchema } from "@/lib/schema";

import { equipmentMockData } from "../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/equipment`;
const PAGE_DESCRIPTION =
  "Regenis Life's exclusive medical equipment portfolio — flagship devices across 5 capability areas, from hyperbaric oxygen chambers to aesthetic platforms and regenerative therapy systems, sourced from globally certified partners.";
const FEATURED_ITEMS = equipmentMockData.slice(0, 6);

export const metadata: Metadata = {
  title: "Medical Equipment Showcase | Exclusive Partner Technologies",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/equipment",
  },
  openGraph: {
    title: "Medical Equipment Showcase | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/equipment",
    type: "website",
    images: equipmentMockData[0] ? [{ url: equipmentMockData[0].image, alt: equipmentMockData[0].name }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Equipment Showcase | Regenis Life",
    description: PAGE_DESCRIPTION,
  },
};

export default function EquipmentShowcasePage() {
  const collectionSchema = generateWebPageSchema({
    name: "Medical Equipment Showcase",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: PAGE_URL },
  ]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Featured Equipment",
    FEATURED_ITEMS.map((eq) => ({
      name: `${eq.partner} - ${eq.name}`,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
      image: eq.image,
    }))
  );

  return (
    <PageShell headerVariant="transparent">
      <main className="font-sans antialiased overflow-hidden bg-[#141414]">
        <SchemaScript id="equipment-list-schema" schema={[collectionSchema, breadcrumbSchema, itemListSchema]} />
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; }
        `}} />

        <Hero />
        <PartnerBrandsSection />

        <CategoryOverview />
        <FeaturedShowcase
          eyebrow="A First Look at the Portfolio"
          title={<>Featured <span className="text-[#1c69d4]">Devices</span></>}
          items={FEATURED_ITEMS}
          ctaHref="/equipment/all"
          ctaLabel="View Full Catalog"
        />
        <WhyPartners />

        {/* CTA banner */}
        <section className="px-[clamp(24px,5vw,80px)] py-[clamp(56px,7vw,96px)] bg-[#141414] text-white border-t border-white/[0.08] text-center">
          <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#bbbbbb] leading-[1.3] mb-6">
            Ready to Equip Your Facility?
          </div>
          <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(28px,4vw,52px)] text-white max-w-[720px] mx-auto mb-10">
            Talk to Our Team About <span className="text-[#1c69d4]">Clinical Equipment</span>
          </h2>
          <div className="flex gap-5 flex-wrap items-center justify-center">
            <a
              href={`mailto:${BUSINESS_EMAIL[0]}`}
              className="inline-flex items-center gap-[10px] px-8 py-[15px] bg-transparent text-white text-base font-bold leading-[1.2] no-underline border-b border-white transition-colors duration-200 cursor-pointer rounded-none hover:bg-white hover:text-[#262626]"
            >
              Enquire Now
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
            <Link
              href="/equipment/all"
              className="inline-flex items-center gap-[6px] text-[11px] font-bold tracking-[0.13em] uppercase text-[#bbbbbb] no-underline border-b border-white/30 pb-[2px] transition-colors duration-200 rounded-none hover:text-[#1c69d4] hover:border-[#1c69d4]"
            >
              View Full Catalog
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </section>

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
