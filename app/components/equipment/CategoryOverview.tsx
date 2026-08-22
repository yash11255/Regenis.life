"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    n: "01",
    name: "Body Contouring & Facial Aesthetics",
    desc: "Non-invasive muscle, skin, and facial rejuvenation technologies.",
    count: 7,
  },
  {
    n: "02",
    name: "Pelvic Health & Neuro Wellness",
    desc: "Pelvic floor therapy and non-invasive neuro-wellness devices.",
    count: 2,
  },
  {
    n: "03",
    name: "Recovery & Regeneration",
    desc: "Cryotherapy, hyperbaric, shockwave, and pain/recovery modalities.",
    count: 8,
  },
  {
    n: "04",
    name: "Diagnostics & Performance Testing",
    desc: "Body composition, movement, and strength diagnostics platforms.",
    count: 6,
  },
  {
    n: "05",
    name: "Innovation & Robotics",
    desc: "Emerging AI and robotics showcase for the facility.",
    count: 1,
  },
];

export default function CategoryOverview() {
  return (
    <section className="equipment-category-overview bg-[#071426] text-[#eef5ff] antialiased">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        .equipment-category-overview { font-family: 'Inter', Helvetica, Arial, sans-serif; }
      `}} />

      <div className="px-[clamp(24px,5vw,80px)] py-[clamp(56px,7vw,100px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-[720px]"
        >
          <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#1c69d4] leading-[1.3] mb-5">
            Equipment Overview
          </div>
          <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(28px,3.8vw,48px)] text-[#eef5ff] mb-6">
            Flagship Devices. 5 Capability Areas.
          </h2>
          <p className="text-[15px] leading-[1.75] text-[#a8b8ca] font-light">
            Each capability area pairs a flagship device with a benchmarked
            alternate — precision-selected for clinical environments where
            outcomes define reputation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-white/[0.12]">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-r border-b border-white/[0.12] px-7 py-10 flex flex-col"
            >
              <span className="text-[10px] font-bold tracking-[0.1em] text-[#8fa6bd] mb-6">
                {cat.n}
              </span>

              <h3 className="text-[15px] font-bold uppercase tracking-[0.01em] text-[#eef5ff] leading-[1.3] mb-3">
                {cat.name}
              </h3>
              <p className="text-[13px] leading-[1.6] text-[#a8b8ca] font-light">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
