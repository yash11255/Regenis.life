import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import SectionHeading from "../components/ui/SectionHeading";
import Prose from "../components/ui/Prose";
import Button from "../components/ui/Button";
import WhyPartners from "../components/equipment/WhyPartners";
import PartnerBrandsSection from "../components/home/PartnerBrandsSection";
import { SchemaScript } from "../components/SchemaScript";
import { BUSINESS_NAME, BUSINESS_URL, businessConfig } from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";
import { visibleEquipment } from "../data/equipment";

const PAGE_URL = `${BUSINESS_URL}/about`;
const PAGE_DESCRIPTION =
  "Regenis Life curates globally certified medical and wellness equipment for clinical, rehabilitation, aesthetic, recovery, and performance facilities — with end-to-end support across sourcing, installation, and training.";

export const metadata: Metadata = {
  title: "About",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/about",
    type: "website",
    images: [{ url: "/Regenis.png", alt: "Regenis Life" }],
  },
};

export default function AboutPage() {
  const partnerCount = new Set(visibleEquipment.map((e) => e.partner)).size;

  const webPageSchema = generateWebPageSchema({
    name: "About Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "AboutPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: SEO_LAST_MODIFIED,
    about: { "@id": `${BUSINESS_URL}/#organization` },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "About", url: PAGE_URL },
  ]);

  return (
    <main>
      <SchemaScript id="about-schema" schema={[webPageSchema, breadcrumbSchema]} />

      <Section space="lg" contained={false} className="pt-[clamp(120px,15vw,180px)]">
        <Container>
          <Eyebrow tone="primary" className="mb-6">
            About Regenis Life
          </Eyebrow>
          <SectionHeading as="h1" size="xl" className="max-w-[900px]">
            A curated portfolio for facilities that measure themselves by{" "}
            <span className="text-primary">outcomes.</span>
          </SectionHeading>
          <p className="mt-7 max-w-[640px] text-[15px] font-light leading-[1.8] text-ink-muted">
            {PAGE_DESCRIPTION}
          </p>
        </Container>
      </Section>

      <Section divide>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="grid grid-cols-2 gap-6">
              <Stat value={String(visibleEquipment.length)} label="Devices in portfolio" />
              <Stat value={`${partnerCount}`} label="Global manufacturers" />
              <Stat value="5" label="Capability areas" />
              <Stat value="India" label="Primary market" />
            </div>
          </div>
          <Prose>
            <h2>What we do</h2>
            <p>
              Regenis Life sources medical and wellness technology directly from
              category-leading manufacturers and presents it as a single, coherent portfolio
              for clinical, rehabilitation, aesthetic, recovery, and sports-performance
              facilities. Every capability area pairs a flagship device with a benchmarked
              alternate so operators can compare like for like.
            </p>
            <h2>How we work</h2>
            <p>
              We hold sole Indian import rights on selected flagship platforms and work as a
              single point of contact from first evaluation through procurement. Support
              covers site planning, installation, and staff training. Product availability,
              regulatory status, indications, and specifications are confirmed with the
              manufacturer for the market where a device is installed.
            </p>
            <h2>Who we serve</h2>
            <p>
              Clinics, wellness centres, rehabilitation facilities, sports-performance
              environments, and longevity practices evaluating clinical and wellness
              technology where measurable outcomes define reputation.
            </p>
          </Prose>
        </div>
      </Section>

      <WhyPartners />
      <PartnerBrandsSection ctaHref="/equipment" ctaLabel="View equipment partners" />

      <Section band="dark" divide className="text-center">
        <SectionHeading className="mx-auto mb-8 max-w-[680px] text-ink-inverse">
          Talk to the team about your facility.
        </SectionHeading>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button href="/contact">Contact Regenis Life</Button>
          <Button
            href={`mailto:${businessConfig.email[0]}`}
            variant="quiet"
            className="text-ink-inverse"
          >
            {businessConfig.email[0]}
            <ArrowUpRight size={14} />
          </Button>
        </div>
      </Section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-4">
      <div className="font-display text-[clamp(28px,4vw,44px)] font-light text-ink">
        {value}
      </div>
      <div className="mt-1 text-[12px] uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </div>
    </div>
  );
}
