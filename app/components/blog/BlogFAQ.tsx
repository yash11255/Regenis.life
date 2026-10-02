import type { BlogFaqItem } from "@/lib/blog";

export default function BlogFAQ({ items }: { items: BlogFaqItem[] }) {
  if (!items.length) return null;

  return (
    <section id="faq" aria-labelledby="faq-heading" className="mt-12 border-t border-line pt-10">
      <h2 id="faq-heading" className="font-display text-[clamp(28px,4vw,42px)] font-light text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-6 border-t border-line">
        {items.map((item, index) => (
          <details key={item.q} open={index === 0} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-[15px] font-semibold leading-6 text-ink md:text-[16px]">
                {item.q}
              </h3>
              <span className="text-xl font-light text-primary transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="max-w-[68ch] pb-6 text-[15px] font-light leading-7 text-ink-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
