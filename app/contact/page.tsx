import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import SectionHeading from "../components/ui/SectionHeading";
import InquiryForm from "../components/equipment/InquiryForm";
import { SchemaScript } from "../components/SchemaScript";
import {
  BUSINESS_NAME,
  BUSINESS_URL,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
} from "@/lib/business-config";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { SEO_LAST_MODIFIED } from "@/lib/seo-content";

const PAGE_URL = `${BUSINESS_URL}/contact`;
const PAGE_DESCRIPTION =
  "Contact Regenis Life about medical and wellness equipment — request clinical data, pricing, and availability, or discuss site planning, installation, and training for your facility.";

export const metadata: Metadata = {
  title: "Contact",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Regenis Life",
    description: PAGE_DESCRIPTION,
    url: "/contact",
    type: "website",
    images: [{ url: "/Regenis.png", alt: "Regenis Life" }],
  },
};

export default function ContactPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Contact Regenis Life",
    url: PAGE_URL,
    description: PAGE_DESCRIPTION,
    pageType: "ContactPage",
    isPartOf: { name: BUSINESS_NAME, url: BUSINESS_URL },
    dateModified: SEO_LAST_MODIFIED,
    about: { "@id": `${BUSINESS_URL}/#organization` },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", url: BUSINESS_URL },
    { label: "Contact", url: PAGE_URL },
  ]);

  return (
    <main>
      <SchemaScript id="contact-schema" schema={[webPageSchema, breadcrumbSchema]} />

      <Section space="lg" contained={false} className="pt-[clamp(120px,15vw,180px)]">
        <Container>
          <Eyebrow tone="primary" className="mb-6">
            Contact
          </Eyebrow>
          <SectionHeading as="h1" size="xl" className="max-w-[900px]">
            Let&apos;s equip your <span className="text-primary">facility.</span>
          </SectionHeading>
          <p className="mt-7 max-w-[620px] text-[15px] font-light leading-[1.8] text-ink-muted">
            {PAGE_DESCRIPTION}
          </p>
        </Container>
      </Section>

      <Section divide>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-6 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
              Direct
            </h2>
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                <a
                  href={`mailto:${BUSINESS_EMAIL[0]}`}
                  className="text-[15px] text-ink transition-colors hover:text-primary"
                >
                  {BUSINESS_EMAIL[0]}
                </a>
              </li>
              {BUSINESS_PHONE[0] && (
                <li className="flex items-start gap-3.5">
                  <Phone size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                  <a
                    href={`tel:${BUSINESS_PHONE[0].replace(/\s+/g, "")}`}
                    className="text-[15px] text-ink transition-colors hover:text-primary"
                  >
                    {BUSINESS_PHONE[0]}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3.5">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-[15px] text-ink-muted">India</span>
              </li>
            </ul>
            <p className="mt-8 max-w-[42ch] text-[13px] font-light leading-relaxed text-ink-faint">
              A Regenis Life representative typically responds within one business day with
              clinical data, pricing, and availability.
            </p>
          </div>

          <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <h2 className="mb-6 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
              Send an enquiry
            </h2>
            <InquiryForm tone="page" />
          </div>
        </div>
      </Section>
    </main>
  );
}
