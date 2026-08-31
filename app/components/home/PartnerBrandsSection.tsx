"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { visibleEquipment } from "../../data/equipment";

// Derive the unique manufacturer partners directly from the equipment
// catalog so this strip always stays in sync with what's actually stocked.
const PARTNERS = Array.from(
  visibleEquipment.reduce((map, eq) => {
    const entry = map.get(eq.partner) || { logo: eq.logo, count: 0 };
    entry.count += 1;
    map.set(eq.partner, entry);
    return map;
  }, new Map<string, { logo: string; count: number }>())
).map(([name, { logo, count }]) => ({ name, logo, count }));

interface PartnerBrandsSectionProps {
  ctaHref?: string;
  ctaLabel?: string;
}

export default function PartnerBrandsSection({
  ctaHref = "/equipment",
  ctaLabel = "View Equipment Partners",
}: PartnerBrandsSectionProps) {
  return (
    <section id="partners" className="partner-brands bg-transparent text-[#eef5ff] antialiased scroll-mt-32">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        .partner-brands { font-family: 'Inter', Helvetica, Arial, sans-serif; }
      `}} />

      <div className="px-[clamp(24px,5vw,80px)] py-[clamp(56px,7vw,100px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between flex-wrap gap-6 mb-16 max-w-[900px]"
        >
          <div>
            <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#1c69d4] leading-[1.3] mb-5">
              Global Partners
            </div>
            <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(28px,3.8vw,48px)] text-[#eef5ff] mb-6">
              Brands We Work With
            </h2>
            <p className="text-[15px] leading-[1.75] text-[#a8b8ca] font-light max-w-[560px]">
              {PARTNERS.length} category-leading manufacturers, sourced directly —
              every device on our floor is FDA-cleared or CE-certified.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-white/[0.12]">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="border-r border-b border-white/[0.12]"
            >
              <Link
                href={`/equipment/all?partner=${encodeURIComponent(partner.name)}`}
                aria-label={`View ${partner.name} equipment`}
                className="group/partner flex h-full min-h-[164px] w-full flex-col items-center justify-center gap-5 px-6 py-10 text-center transition-colors duration-200 hover:bg-[#112b47]"
              >
                <div className="h-12 w-full flex items-center justify-center transition-transform duration-200 group-hover/partner:scale-[1.04]">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={180}
                      height={56}
                      className="max-h-12 max-w-[160px] w-auto h-auto rounded-md bg-[#dce8f5] px-3 py-2 object-contain"
                    />
                  ) : (
                    <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-[#eef5ff]">
                      {partner.name}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#a8b8ca] transition-colors group-hover/partner:text-[#3d8cff]">
                  {partner.count} {partner.count === 1 ? "Device" : "Devices"}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center sm:justify-end">
          <Link
            href={ctaHref}
            className="site-action-secondary site-action-secondary--dark"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
