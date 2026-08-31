"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    n: "01",
    title: "Globally Certified",
    desc: "Every platform is FDA-cleared or CE-certified, sourced directly from category-leading manufacturers.",
  },
  {
    n: "02",
    title: "Exclusive Partnerships",
    desc: "Sole Indian import rights on select flagship platforms — technology unavailable elsewhere in the market.",
  },
  {
    n: "03",
    title: "Clinical-Grade Precision",
    desc: "Precision-selected for environments where measurable outcomes define clinical reputation.",
  },
  {
    n: "04",
    title: "End-to-End Support",
    desc: "Site planning, installation, and staff training handled by our team from day one.",
  },
];

export default function WhyPartners() {
  return (
    <section className="equipment-why-partners bg-transparent text-[#eef5ff] antialiased border-t border-white/[0.08]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        .equipment-why-partners { font-family: 'Inter', Helvetica, Arial, sans-serif; }
      `}} />

      <div className="px-[clamp(24px,5vw,80px)] py-[clamp(56px,7vw,100px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-[640px]"
        >
          <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#1c69d4] leading-[1.3] mb-5">
            Why Regenis Life
          </div>
          <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(28px,3.8vw,48px)] text-[#eef5ff]">
            Built on Trusted Partnerships
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.12]">
          {POINTS.map((point, index) => (
            <motion.div
              key={point.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-r border-b border-white/[0.12] px-7 py-10 flex flex-col"
            >
              <span className="text-[10px] font-bold tracking-[0.1em] text-[#1c69d4] mb-8">
                {point.n}
              </span>
              <h3 className="text-[17px] font-bold uppercase tracking-[0.01em] text-[#eef5ff] leading-[1.3] mb-3">
                {point.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#a8b8ca] font-light">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
