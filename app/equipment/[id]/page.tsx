import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import { visibleEquipment } from "../../data/equipment";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import EquipmentCarousel from "../../components/equipment/EquipmentCarousel";
import EquipmentInquiryButton from "../../components/equipment/EquipmentInquiryButton";
import { SchemaScript } from "../../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import {
  generateBreadcrumbSchema,
  generateMedicalDeviceSchema,
  generateProductSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";

interface EquipmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return visibleEquipment.map((equipment) => ({
    id: equipment.id,
  }));
}

export async function generateMetadata({ params }: EquipmentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const equipment = visibleEquipment.find((eq) => eq.id === id);

  if (!equipment) {
    return {
      title: "Equipment Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = equipment.name;
  const socialTitle = `${equipment.name} | ${equipment.partner}`;
  const description = equipment.description;
  const canonicalUrl = `${BUSINESS_URL}/equipment/${equipment.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/equipment/${equipment.id}`,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: equipment.image, alt: equipment.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [equipment.image],
    },
  };
}

export default async function EquipmentDetailPage({
  params,
}: EquipmentDetailPageProps) {
  const resolvedParams = await params;
  const equipment = visibleEquipment.find((eq) => eq.id === resolvedParams.id);

  if (!equipment) {
    notFound();
  }

  const canonicalUrl = `${BUSINESS_URL}/equipment/${equipment.id}`;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: `${BUSINESS_URL}/equipment` },
    { label: "All Equipment", url: `${BUSINESS_URL}/equipment/all` },
    { label: equipment.name, url: canonicalUrl },
  ]);
  const productSchema = generateMedicalDeviceSchema({
    name: equipment.name,
    description: equipment.fullDescription || equipment.description,
    url: canonicalUrl,
    image: (equipment.images?.length ? equipment.images : [equipment.image]).map((image) =>
      image.startsWith("http") ? image : `${BUSINESS_URL}${image}`
    ),
    manufacturer: equipment.manufacturer || equipment.partner,
    brand: equipment.partner,
    seller: { name: BUSINESS_NAME, url: BUSINESS_URL },
    category: equipment.category,
    additionalProperty: equipment.specifications,
    relatedDeviceName: equipment.alternateOption,
    countryOfOrigin: equipment.manufacturer || equipment.partner,
  });

  // Map equipment status to schema.org availability
  const availabilityMap: Record<string, string> = {
    "Not Arrived": "https://schema.org/PreOrder",
  };
  const availability =
    equipment.currentStatus && availabilityMap[equipment.currentStatus]
      ? availabilityMap[equipment.currentStatus]
      : "https://schema.org/InStoreOnly";

  const productRichResultSchema = generateProductSchema({
    name: equipment.name,
    description: equipment.fullDescription || equipment.description,
    url: canonicalUrl,
    image: (equipment.images?.length ? equipment.images : [equipment.image]).map((image) =>
      image.startsWith("http") ? image : `${BUSINESS_URL}${image}`
    ),
    manufacturer: equipment.manufacturer || equipment.partner,
    brand: equipment.partner,
    seller: { name: BUSINESS_NAME, url: BUSINESS_URL },
    category: equipment.category,
    additionalProperty: equipment.specifications,
    relatedDeviceUrl: `${canonicalUrl}#medical-device`,
    availability,
  });
  const detailPageSchema = generateWebPageSchema({
    name: `${equipment.name} | Regenis Life`,
    url: canonicalUrl,
    description: equipment.description,
    pageType: "MedicalWebPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: SEO_LAST_MODIFIED,
    about: { "@id": `${canonicalUrl}#medical-device` },
    mainEntity: { "@id": `${canonicalUrl}#medical-device` },
    speakable: ["h1", ".equipment-detail-summary"],
  });
  const portfolioDetails: Array<[string, string]> = [
    ["Category", equipment.category || ""],
    ["Manufacturer", equipment.manufacturer || equipment.partner],
    ["Quantity", equipment.quantity ? String(equipment.quantity) : ""],
    ["Site Location", equipment.siteLocation || ""],
    ["Current Status", equipment.currentStatus || ""],
    ["Benchmark Alternate", equipment.alternateOption || ""],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]));

  return (
    <PageShell headerVariant="solid">
      <main className="font-sans antialiased bg-transparent text-[#eef5ff] min-h-screen">
        <SchemaScript
          id="equipment-detail-schema"
          schema={[detailPageSchema, breadcrumbSchema, productSchema, productRichResultSchema]}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');
            * { box-sizing: border-box; }
            body { font-family: 'Plus Jakarta Sans', Helvetica, Arial, sans-serif; }

            /* ── Image panel: fills full height on desktop, fixed height on mobile ── */
            .detail-image-panel {
              position: relative;
              width: 100%;
              min-height: clamp(320px, 55vw, 800px);
            }
            @media (min-width: 1024px) {
              .detail-image-panel {
                /* Stretch to fill the grid row on desktop */
                position: sticky;
                top: 0;
                height: 100vh;
                min-height: unset;
              }
            }

            /* ── Back link ── */
            .back-link {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: #a8b8ca;
              text-decoration: none;
              transition: color 0.2s;
            }
            .back-link:hover { color: #3d8cff; }

            /* ── Section layout ── */
            .detail-grid {
              display: grid;
              grid-template-columns: 1fr;
              border-top: 1px solid rgba(255, 255, 255, 0.12);
            }
            @media (min-width: 1024px) {
              .detail-grid {
                grid-template-columns: 1fr 1fr;
                align-items: start;
              }
            }

            /* ── Text panel ── */
            .detail-text {
              padding: clamp(40px, 7vw, 80px) clamp(24px, 6vw, 64px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            }
            @media (min-width: 1024px) {
              .detail-text {
                border-bottom: none;
                border-right: 1px solid rgba(255, 255, 255, 0.12);
              }
            }

            /* ── Specs table ── */
            .spec-row {
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding: 14px 0;
              border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            }
            @media (min-width: 480px) {
              .spec-row {
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;
                gap: 16px;
              }
            }

            /* ── Footer social links ── */
            .footer-social-link {
              font-size: 10px;
              color: rgba(255,255,255,0.4);
              letter-spacing: 0.14em;
              text-transform: uppercase;
              font-weight: 400;
              text-decoration: none;
              transition: color 0.2s;
            }
            .footer-social-link:hover { color: #fff; }

            /* ── Enquire button ── */
            .cta-btn {
              display: inline-flex;
              align-items: center;
              gap: 12px;
              padding: 16px 32px;
              background: #3d8cff;
              color: #fff;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              text-decoration: none;
              transition: background 0.25s, box-shadow 0.25s;
            }
            .cta-btn:hover {
              background: #2f78e3;
              box-shadow: 0 12px 32px rgba(28, 105, 212, 0.25);
            }
          `,
          }}
        />

        {/* ── Back navigation ── */}
        <div className="pt-24 pb-4 px-[clamp(24px,5vw,80px)]">
          <Link href="/equipment/all" className="back-link">
            <ChevronLeft size={16} />
            Back to All Equipment
          </Link>
        </div>

        {/* ── Main content grid ── */}
        <section className="detail-grid mt-4 lg:mt-8">

          {/* Text panel */}
          <div className="detail-text flex flex-col">

            {/* ID + tagline */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.1em] text-[#8fa6bd]">
                {equipment.id}
              </span>
              <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#1c69d4]">
                {equipment.tagline}
              </div>
              {equipment.badge && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#1c69d4]/10 text-[#1c69d4] border border-[#1c69d4]/20 shadow-[0_0_8px_rgba(28,105,212,0.06)] animate-pulse">
                  {equipment.badge}
                </span>
              )}
            </div>

            {/* Partner logo */}
            <div className="relative mb-10 self-start flex items-center rounded-md bg-[#dce8f5] px-3 py-2" style={{ width: 168, height: 42 }}>
              {equipment.logo ? (
                <Image
                  src={equipment.logo}
                  alt={equipment.partner}
                  fill
                  sizes="168px"
                  className="object-contain object-left"
                />
              ) : (
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#eef5ff]">
                  {equipment.partner}
                </span>
              )}
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 5vw, 72px)",
                fontWeight: 300,
                lineHeight: 1.1,
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "#eef5ff",
                marginBottom: 32,
              }}
            >
              {equipment.name}
            </h1>

            {/* Description */}
            <p
              className="equipment-detail-summary"
              style={{
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.8,
                color: "#a8b8ca",
                fontWeight: 300,
                maxWidth: 480,
                marginBottom: 48,
              }}
            >
              {equipment.fullDescription || equipment.description}
            </p>

            {/* Source portfolio details */}
            {portfolioDetails.length > 0 && (
              <div className="mb-10" style={{ maxWidth: 480 }}>
                <h3 className="text-[11px] font-bold tracking-[0.1em] text-[#eef5ff] mb-6 uppercase">
                  Portfolio Details
                </h3>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  {portfolioDetails.map(([label, value]) => (
                    <div key={label} className="spec-row">
                      <span style={{ fontSize: 13, color: "#a8b8ca", flexShrink: 0 }}>
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#eef5ff",
                          textAlign: "right",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {equipment.specifications && (
              <div className="mb-10" style={{ maxWidth: 480 }}>
                <h3 className="text-[11px] font-bold tracking-[0.1em] text-[#eef5ff] mb-6 uppercase">
                  Technical Specifications
                </h3>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  {equipment.specifications.map((spec, i) => (
                    <div key={i} className="spec-row">
                      <span style={{ fontSize: 13, color: "#a8b8ca", flexShrink: 0 }}>
                        {spec.label}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#eef5ff",
                        }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {equipment.features && (
              <div className="mb-12" style={{ maxWidth: 480 }}>
                <h3 className="text-[11px] font-bold tracking-[0.1em] text-[#eef5ff] mb-6 uppercase">
                  Key Features
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {equipment.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          background: "#1c69d4",
                          borderRadius: 0,
                          marginTop: 8,
                          flexShrink: 0,
                          display: "block",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 15,
                          lineHeight: 1.65,
                          color: "#a8b8ca",
                          fontWeight: 300,
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-8">
              <EquipmentInquiryButton equipmentName={equipment.name} />
            </div>
          </div>

          {/* Image panel — sticky on desktop, fixed height on mobile, containing dynamic brand carousel */}
          <div className="detail-image-panel" style={{ overflow: "hidden" }}>
            <EquipmentCarousel
              images={equipment.images || [equipment.image]}
              alt={equipment.name}
            />
            {/* Subtle number overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                fontSize: 72,
                fontWeight: 900,
                color: "rgba(255,255,255,0.07)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 5,
              }}
            >
              {equipment.id}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <section
          style={{
            padding: "clamp(48px,6vw,80px) clamp(24px,6vw,88px)",
            background: "#050d18",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8fa6bd",
            }}
          >
            Regenis Life © {new Date().getFullYear()}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
