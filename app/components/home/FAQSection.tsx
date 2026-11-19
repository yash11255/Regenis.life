import type { FAQItem } from "@/lib/schema";
import { getEquipmentFaqs } from "@/lib/seo-content";
import { visibleEquipment } from "../../data/equipment";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";

interface FAQSectionProps {
  faqs?: FAQItem[];
  heading?: string;
  intro?: string;
}

export default function FAQSection({
  faqs,
  heading = "Equipment, answered clearly.",
  intro = "Clear guidance for facilities evaluating clinical, diagnostics, recovery, and wellness technology.",
}: FAQSectionProps = {}) {
  const items = faqs ?? getEquipmentFaqs(visibleEquipment.length);

  return (
    <Section divide aria-labelledby="faq-heading">
      <div className="max-w-[820px]">
        <Eyebrow tone="primary" className="mb-5">
          Common questions
        </Eyebrow>
        <SectionHeading id="faq-heading" className="mb-6">
          {heading}
        </SectionHeading>
        <p className="mb-10 max-w-[620px] text-[15px] font-light leading-[1.75] text-ink-muted">
          {intro}
        </p>

        <div className="border-t border-line">
          {items.map((faq) => (
            <details key={faq.question} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-semibold leading-snug text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden
                  className="text-xl font-light text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[760px] pt-4 text-[14px] font-light leading-[1.75] text-ink-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
