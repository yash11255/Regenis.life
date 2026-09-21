"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Badge from "../ui/Badge";
import { easeOutExpo } from "@/lib/motion";

interface EquipmentCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  partner: string;
  logo: string;
  onEnquire: () => void;
  index: number;
  badge?: string;
}

export default function EquipmentCard({
  id,
  name,
  tagline,
  description,
  image,
  partner,
  logo,
  onEnquire,
  index,
  badge,
}: EquipmentCardProps) {
  return (
    <motion.article
      className="group grid grid-cols-1 border-b border-line lg:grid-cols-2"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.12), ease: easeOutExpo }}
    >
      <div className="flex flex-col justify-center border-b border-line px-[clamp(28px,6vw,64px)] py-[clamp(40px,8vw,72px)] lg:border-b-0 lg:border-r">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.1em] text-ink-faint">{id}</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
            {tagline}
          </span>
          {badge && <Badge tone="accent">{badge}</Badge>}
        </div>

        <Link href={`/equipment/${id}`} className="block">
          <h3 className="mb-6 max-w-[420px] font-display text-[clamp(26px,3.4vw,44px)] font-light leading-[1.12] text-ink transition-colors group-hover:text-primary">
            {name}
          </h3>
        </Link>

        <p className="mb-8 max-w-[400px] text-[15px] font-light leading-[1.75] text-ink-muted">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={`/equipment/${id}`}
            className="inline-flex items-center gap-1.5 border-b border-current/40 pb-0.5 text-[11px] font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:border-primary hover:text-primary"
          >
            View specifications
            <ChevronRight size={14} />
          </Link>
          <button
            type="button"
            onClick={onEnquire}
            className="inline-flex items-center gap-1.5 border-b border-primary pb-0.5 text-[11px] font-bold uppercase tracking-[0.13em] text-primary transition-colors hover:text-primary-hover hover:border-primary-hover"
          >
            Enquire Now
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      <Link
        href={`/equipment/${id}`}
        className="relative block min-h-[360px] overflow-hidden bg-sunken lg:min-h-[500px]"
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute left-6 top-6 flex items-center border-l-2 border-primary bg-raised/95 px-5 py-3 backdrop-blur-sm">
          <div className="relative flex h-8 w-32 items-center">
            {logo ? (
              <Image src={logo} alt={partner} fill className="object-contain object-left" />
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                {partner}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
