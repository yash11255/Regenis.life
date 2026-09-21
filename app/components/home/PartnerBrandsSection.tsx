"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { visibleEquipment } from "../../data/equipment";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const PARTNERS = Array.from(
  visibleEquipment.reduce((map, eq) => {
    const entry = map.get(eq.partner) || { logo: eq.logo, count: 0 };
    entry.count += 1;
    map.set(eq.partner, entry);
    return map;
  }, new Map<string, { logo: string; count: number }>())
).map(([name, { logo, count }]) => ({ name, logo, count }));

export default function PartnerBrandsSection({
  ctaHref = "/equipment/all",
  ctaLabel = "Browse the full catalog",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <Section id="partners" divide className="scroll-mt-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14 max-w-[720px]"
      >
        <Eyebrow tone="primary" className="mb-5">
          Global partners
        </Eyebrow>
        <SectionHeading className="mb-5">Brands we work with.</SectionHeading>
        <p className="max-w-[560px] text-[15px] font-light leading-[1.75] text-ink-muted">
          {PARTNERS.length} category-leading manufacturers, sourced directly — each device
          on our floor with regulatory clearance confirmed for its market.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5"
      >
        {PARTNERS.map((partner) => (
          <motion.div key={partner.name} variants={fadeUp}>
            <Link
              href={`/equipment/all?partner=${encodeURIComponent(partner.name)}`}
              aria-label={`View ${partner.name} equipment`}
              className="group flex h-full min-h-[160px] flex-col items-center justify-center gap-5 border-b border-r border-line px-6 py-9 text-center transition-colors hover:bg-sunken"
            >
              <div className="flex h-12 w-full items-center justify-center transition-transform group-hover:scale-[1.04]">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={56}
                    className="max-h-12 w-auto max-w-[150px] rounded bg-raised px-3 py-2 object-contain"
                  />
                ) : (
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">
                    {partner.name}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-faint transition-colors group-hover:text-primary">
                {partner.count} {partner.count === 1 ? "device" : "devices"}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center sm:justify-end">
        <Button href={ctaHref} variant="quiet">
          {ctaLabel}
        </Button>
      </div>
    </Section>
  );
}
