"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const POINTS = [
  {
    title: "Globally certified",
    desc: "Every platform is sourced directly from category-leading manufacturers, with regulatory clearance confirmed for the market where it is installed.",
  },
  {
    title: "Exclusive partnerships",
    desc: "Sole Indian import rights on select flagship platforms — technology unavailable elsewhere in the market.",
  },
  {
    title: "Clinical-grade precision",
    desc: "Precision-selected for environments where measurable outcomes define clinical reputation.",
  },
  {
    title: "End-to-end support",
    desc: "Site planning, installation, and staff training handled by our team from day one.",
  },
];

export default function WhyPartners() {
  return (
    <Section band="dark" divide>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14 max-w-[640px]"
      >
        <Eyebrow tone="primary" className="mb-5">
          Why Regenis Life
        </Eyebrow>
        <SectionHeading className="text-ink-inverse">
          Built on trusted partnerships.
        </SectionHeading>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {POINTS.map((p, i) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="flex flex-col border-b border-r border-line px-7 py-9"
          >
            <span className="mb-7 text-[10px] font-bold tracking-[0.1em] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mb-3 font-display text-[18px] font-normal leading-snug text-ink-inverse">
              {p.title}
            </h3>
            <p className="text-[13px] font-light leading-[1.65] text-ink-inverse-muted">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
