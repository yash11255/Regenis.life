import { getEquipmentFaqs } from "@/lib/seo-content";
import { visibleEquipment } from "../../data/equipment";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";

export default function FAQSection() {
  const faqs = getEquipmentFaqs(visibleEquipment.length);

  return (
    <Section divide aria-labelledby="faq-heading">
      <div className="max-w-[820px]">
        <Eyebrow tone="primary" className="mb-5">
          Common questions
        </Eyebrow>
        <SectionHeading id="faq-heading" className="mb-6">
          Equipment, answered clearly.
        </SectionHeading>
        <p className="mb-10 max-w-[620px] text-[15px] font-light leading-[1.75] text-ink-muted">
          Clear guidance for facilities evaluating medical, wellness, recovery, and
          performance technology.
        </p>

        <div className="border-t border-line">
          {faqs.map((faq) => (
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
