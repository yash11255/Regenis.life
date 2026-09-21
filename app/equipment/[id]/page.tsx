import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { visibleEquipment } from "../../data/equipment";
import { slugForCategory } from "../../data/categories";
import EquipmentCarousel from "../../components/equipment/EquipmentCarousel";
import EquipmentInquiryButton from "../../components/equipment/EquipmentInquiryButton";
import Container from "../../components/ui/Container";
import Badge from "../../components/ui/Badge";
import { SchemaScript } from "../../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL } from "@/lib/business-config";
import {
  generateBreadcrumbSchema,
  generateMedicalDeviceSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";

interface EquipmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return visibleEquipment.map((equipment) => ({ id: equipment.id }));
}

export async function generateMetadata({
  params,
}: EquipmentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const equipment = visibleEquipment.find((eq) => eq.id === id);
  if (!equipment) {
    return { title: "Equipment Not Found", robots: { index: false, follow: false } };
  }
  const socialTitle = `${equipment.name} | ${equipment.partner}`;
  return {
    title: equipment.name,
    description: equipment.description,
    alternates: { canonical: `/equipment/${equipment.id}` },
    openGraph: {
      title: socialTitle,
      description: equipment.description,
      url: `${BUSINESS_URL}/equipment/${equipment.id}`,
      type: "website",
      images: [{ url: equipment.image, alt: equipment.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: equipment.description,
      images: [equipment.image],
    },
  };
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { id } = await params;
  const equipment = visibleEquipment.find((eq) => eq.id === id);
  if (!equipment) notFound();

  const canonicalUrl = `${BUSINESS_URL}/equipment/${equipment.id}`;
  const categorySlug = slugForCategory(equipment.category);
  const images = (equipment.images?.length ? equipment.images : [equipment.image]).map(
    (image) => (image.startsWith("http") ? image : `${BUSINESS_URL}${image}`)
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Equipment", url: `${BUSINESS_URL}/equipment` },
    { label: "All Equipment", url: `${BUSINESS_URL}/equipment/all` },
    { label: equipment.name, url: canonicalUrl },
  ]);
  const deviceSchema = generateMedicalDeviceSchema({
    name: equipment.name,
    description: equipment.fullDescription || equipment.description,
    url: canonicalUrl,
    image: images,
    manufacturer: equipment.manufacturer || equipment.partner,
    brand: equipment.partner,
    seller: { name: BUSINESS_NAME, url: BUSINESS_URL },
    category: equipment.category,
    additionalProperty: equipment.specifications,
    relatedDeviceName: equipment.alternateOption,
    countryOfOrigin: equipment.manufacturer || equipment.partner,
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

  const portfolioDetails = (
    [
      ["Category", equipment.category ?? ""],
      ["Manufacturer", equipment.manufacturer || equipment.partner],
      ["Quantity", equipment.quantity ? String(equipment.quantity) : ""],
      ["Site location", equipment.siteLocation ?? ""],
      ["Current status", equipment.currentStatus ?? ""],
      ["Benchmark alternate", equipment.alternateOption ?? ""],
    ] as Array<[string, string]>
  ).filter(([, value]) => Boolean(value));

  return (
    <main>
      <SchemaScript
        id="equipment-detail-schema"
        schema={[detailPageSchema, breadcrumbSchema, deviceSchema]}
      />

      <Container className="pt-24 pb-4">
        <Link
          href="/equipment/all"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-primary"
        >
          <ChevronLeft size={16} />
          Back to all equipment
        </Link>
      </Container>

      <article className="mt-4 grid border-t border-line lg:mt-8 lg:grid-cols-2 lg:items-start">
        {/* Text panel */}
        <div className="flex flex-col border-b border-line px-[clamp(24px,6vw,64px)] py-[clamp(40px,7vw,80px)] lg:border-b-0 lg:border-r">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.1em] text-ink-faint">
              {equipment.id}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
              {equipment.tagline}
            </span>
            {equipment.badge && <Badge tone="accent">{equipment.badge}</Badge>}
          </div>

          <div className="mb-10 flex h-11 w-[168px] items-center self-start rounded bg-raised px-3 py-2">
            {equipment.logo ? (
              <span className="relative h-full w-full">
                <Image
                  src={equipment.logo}
                  alt={equipment.partner}
                  fill
                  sizes="168px"
                  className="object-contain object-left"
                />
              </span>
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                {equipment.partner}
              </span>
            )}
          </div>

          <h1 className="mb-8 font-display text-[clamp(30px,5vw,64px)] font-light leading-[1.1] text-ink text-balance">
            {equipment.name}
          </h1>

          <p className="equipment-detail-summary mb-12 max-w-[52ch] text-[clamp(14px,1.4vw,16px)] font-light leading-[1.8] text-ink-muted">
            {equipment.fullDescription || equipment.description}
          </p>

          {portfolioDetails.length > 0 && (
            <section aria-labelledby="portfolio-heading" className="mb-10 max-w-[480px]">
              <h2
                id="portfolio-heading"
                className="mb-5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink"
              >
                Portfolio details
              </h2>
              <dl className="border-t border-line">
                {portfolioDetails.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <dt className="flex-shrink-0 text-[13px] text-ink-muted">{label}</dt>
                    <dd className="text-[14px] font-semibold text-ink sm:text-right">
                      {label === "Category" && categorySlug ? (
                        <Link
                          href={`/equipment/category/${categorySlug}`}
                          className="text-primary underline underline-offset-2 hover:text-primary-hover"
                        >
                          {value}
                        </Link>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {equipment.specifications && (
            <section aria-labelledby="specs-heading" className="mb-10 max-w-[480px]">
              <h2
                id="specs-heading"
                className="mb-5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink"
              >
                Technical specifications
              </h2>
              <dl className="border-t border-line">
                {equipment.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <dt className="flex-shrink-0 text-[13px] text-ink-muted">{spec.label}</dt>
                    <dd className="text-[14px] font-semibold text-ink sm:text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {equipment.features && (
            <section aria-labelledby="features-heading" className="mb-12 max-w-[480px]">
              <h2
                id="features-heading"
                className="mb-5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink"
              >
                Key features
              </h2>
              <ul className="space-y-4">
                {equipment.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3.5">
                    <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-[15px] font-light leading-[1.65] text-ink-muted">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-auto pt-8">
            <EquipmentInquiryButton equipmentName={equipment.name} />
          </div>
        </div>

        {/* Image panel */}
        <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
          <EquipmentCarousel images={equipment.images || [equipment.image]} alt={equipment.name} />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-6 right-6 select-none font-display text-[72px] font-light leading-none text-ink-inverse/10"
          >
            {equipment.id}
          </span>
        </div>
      </article>
    </main>
  );
}
