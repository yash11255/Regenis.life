import React from "react";
import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import Hero from "../components/equipment/Hero";
import CategoryOverview from "../components/equipment/CategoryOverview";
import WhyPartners from "../components/equipment/WhyPartners";
import FeaturedShowcase from "../components/equipment/FeaturedShowcase";
import FAQSection from "../components/home/FAQSection";
import PartnerBrandsSection from "../components/home/PartnerBrandsSection";
import ParticleBackground from "../components/ParticleBackground";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SchemaScript } from "../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL, BUSINESS_EMAIL } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateFAQSchema, generateItemListSchema, generateVideoObjectSchema, generateWebPageSchema } from "@/lib/schema";
import { getEquipmentFaqs, SEO_LAST_MODIFIED } from "@/lib/seo-content";

import { visibleEquipment } from "../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/equipment`;
const PAGE_DESCRIPTION =
  "Explore Regenis Life's medical and wellness equipment portfolio: hyperbaric, aesthetic, rehabilitation, diagnostics, recovery, and robotics systems for professional facilities.";
const FEATURED_ITEMS = visibleEquipment.slice(0, 6);

export const metadata: Metadata = {
  title: "Medical & Wellness Equipment",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/equipment",
  },
  openGraph: {
    title: "Medical Equipment Showcase | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/equipment",
    type: "website",
    images: visibleEquipment[0] ? [{ url: visibleEquipment[0].image, alt: visibleEquipment[0].name }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Equipment Showcase | Regenis Life",
    description: PAGE_DESCRIPTION,
    images: [visibleEquipment[0]?.image ?? "/Regenis.png"],
  },
};

export default function EquipmentShowcasePage() {
  const collectionSchema = generateWebPageSchema({
    name: "Medical & Wellness Equipment | Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "CollectionPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    mainEntity: { "@id": `${PAGE_URL}#featured-equipment` },
    dateModified: SEO_LAST_MODIFIED,
    about: {
      "@type": "Thing",
      name: "Medical and wellness equipment for professional facilities",
    },
    speakable: ["h1", ".equipment-page-summary"],
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: PAGE_URL },
  ]);
  const itemListSchema = generateItemListSchema(
    "Regenis Life Featured Equipment",
    FEATURED_ITEMS.map((eq) => ({
      name: eq.name,
      url: `${BUSINESS_URL}/equipment/${eq.id}`,
      description: eq.description,
      image: `${BUSINESS_URL}${eq.image}`,
      itemType: ["Product", "MedicalDevice"],
      brand: eq.partner,
      manufacturer: eq.manufacturer || eq.partner,
      category: eq.category,
    })),
    `${PAGE_URL}#featured-equipment`
  );
  const faqSchema = generateFAQSchema(getEquipmentFaqs(visibleEquipment.length));
  const videoSchema = generateVideoObjectSchema({
    name: "Regenis Life Clinical Equipment Showcase",
    description: "Regenis Life presents medical, wellness, rehabilitation, recovery, diagnostics, and clinical equipment for professional facilities.",
    thumbnailUrl: "https://i.ytimg.com/vi/9uoYBcnOF2c/maxresdefault.jpg",
    uploadDate: SEO_LAST_MODIFIED,
    embedUrl: "https://www.youtube.com/embed/9uoYBcnOF2c",
  });

  return (
    <PageShell headerVariant="transparent">
      <main className="font-sans antialiased bg-transparent relative">
        <SchemaScript id="equipment-list-schema" schema={[collectionSchema, breadcrumbSchema, itemListSchema, faqSchema, videoSchema]} />
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #050d18; }
        `}} />

        <div style={{ position: "relative", zIndex: 2 }}>
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
          <FAQSection />

          {/* CTA banner */}
          <section id="contact" className="px-[clamp(24px,5vw,80px)] py-[clamp(56px,7vw,96px)] bg-transparent text-white border-t border-white/[0.08] text-center scroll-mt-32">
            <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#bbbbbb] leading-[1.3] mb-6">
              Ready to Equip Your Facility?
            </div>
            <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(28px,4vw,52px)] text-white max-w-[720px] mx-auto mb-10">
              Talk to Our Team About <span className="text-[#1c69d4]">Clinical Equipment</span>
            </h2>
            <div className="flex gap-5 flex-wrap items-center justify-center">
              <a
                href={`mailto:${BUSINESS_EMAIL[0]}`}
                className="site-action-secondary"
              >
                Enquire Now
                <ArrowUpRight size={16} strokeWidth={2} />
              </a>
              <Link
                href="/equipment/all"
                className="site-action-secondary"
              >
                View Full Catalog
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <section className="px-[clamp(36px,6vw,88px)] py-[clamp(64px,8vw,112px)] bg-transparent text-white border-t border-white/[0.08] text-center">
            <div className="text-[11px] font-normal tracking-[0.2em] uppercase text-[#bbbbbb] leading-[1.3]">
              Regenis Life © {new Date().getFullYear()}
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
