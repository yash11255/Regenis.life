"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";
import { CATEGORIES, categoryCount } from "@/app/data/categories";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function CategoryOverview() {
  return (
    <Section divide>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14 max-w-[720px]"
      >
        <Eyebrow tone="primary" className="mb-5">
          Equipment overview
        </Eyebrow>
        <SectionHeading className="mb-5">
          Five capability areas, one curated portfolio.
        </SectionHeading>
        <p className="text-[15px] font-light leading-[1.75] text-ink-muted">
          Each area pairs a flagship device with a benchmarked alternate — precision-selected
          for clinical environments where measurable outcomes define reputation.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {CATEGORIES.map((cat, i) => (
          <motion.div key={cat.slug} variants={fadeUp}>
            <Link
              href={`/equipment/category/${cat.slug}`}
              className="group flex h-full flex-col border-b border-r border-line px-7 py-9 transition-colors hover:bg-sunken"
            >
              <span className="text-[10px] font-bold tracking-[0.1em] text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-[19px] font-normal leading-snug text-ink">
                {cat.name}
              </h3>
              <p className="mt-3 flex-1 text-[13px] font-light leading-[1.6] text-ink-muted">
                {cat.blurb}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                {categoryCount(cat.name)}{" "}
                {categoryCount(cat.name) === 1 ? "device" : "devices"}
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
