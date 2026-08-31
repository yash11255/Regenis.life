import { getEquipmentFaqs } from "@/lib/seo-content";
import { visibleEquipment } from "../../data/equipment";

export default function FAQSection() {
  const faqs = getEquipmentFaqs(visibleEquipment.length);

  return (
    <section className="bg-transparent text-[#eef5ff] border-t border-white/[0.08] px-[clamp(24px,5vw,80px)] py-[clamp(56px,7vw,100px)]">
      <div className="max-w-[900px]">
        <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#1c69d4] leading-[1.3] mb-5">
          Common Questions
        </div>
        <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(28px,3.8vw,48px)] text-[#eef5ff] mb-6">
          Equipment, answered clearly.
        </h2>
        <p className="text-[15px] leading-[1.75] text-[#a8b8ca] font-light max-w-[620px] mb-10">
          Clear guidance for facilities evaluating medical, wellness, recovery, and performance technology.
        </p>
      </div>

        <div className="mx-auto w-full max-w-[900px]">
          <div className="border-t border-white/[0.12]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/[0.12] py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-semibold leading-[1.4] marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-[#1c69d4] text-xl font-light transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-[760px] pt-4 text-[14px] leading-[1.75] text-[#a8b8ca] font-light">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
    </section>
  );
}
