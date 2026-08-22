"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  isExclusive?: boolean;
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
    <motion.div
      className="group grid grid-cols-1 lg:grid-cols-2 border-b border-white/[0.12]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.025, 0.12), ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.12] px-[clamp(32px,6vw,64px)] py-[clamp(48px,8vw,80px)]">
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <span className="text-[10px] font-bold tracking-[0.1em] text-[#bbbbbb]">
            {id}
          </span>
          <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#1c69d4] leading-[1.3]">
            {tagline}
          </div>
          {badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#1c69d4]/10 text-[#1c69d4] border border-[#1c69d4]/20 shadow-[0_0_8px_rgba(28,105,212,0.06)]">
              {badge}
            </span>
          )}
        </div>
        
        <Link href={`/equipment/${id}`} className="group/title block">
          <h3 className="font-light leading-[1.15] uppercase tracking-[0.01em] text-[clamp(28px,3.5vw,52px)] text-[#eef5ff] mb-7 max-w-[380px] group-hover/title:text-[#3d8cff] transition-colors">
            {name}
          </h3>
        </Link>
        
        <p className="text-[15px] leading-[1.75] text-[#a8b8ca] font-light max-w-[360px] mb-8">
          {description}
        </p>

        <Link 
          href={`/equipment/${id}`}
          className="inline-flex items-center gap-[6px] text-[11px] font-bold tracking-[0.13em] uppercase text-[#eef5ff] no-underline pb-[2px] transition-colors duration-200 rounded-none hover:text-[#3d8cff] mb-8"
        >
          View Full Specifications
          <ChevronRight size={14} />
        </Link>

        <div className="mt-auto">
          <button
            onClick={onEnquire}
            className="inline-flex items-center gap-[6px] text-[11px] font-bold tracking-[0.13em] uppercase text-[#1c69d4] no-underline border-b border-[#1c69d4] pb-[2px] transition-colors duration-200 rounded-none hover:text-[#0653b6] hover:border-[#0653b6]"
          >
            Enquire Now
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      <Link href={`/equipment/${id}`} className="overflow-hidden relative min-h-[400px] lg:min-h-[520px] block cursor-pointer">
        <motion.div
          className="w-full h-full absolute inset-0 grayscale-[15%] contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        
        <div className="absolute top-6 left-6 bg-[#dce8f5]/95 backdrop-blur-md px-6 py-3 border-l-[3px] border-[#3d8cff]">
          <div className="relative h-[32px] w-36 flex items-center">
            {logo ? (
              <Image
                src={logo}
                alt={partner}
                fill
                className="object-contain object-left"
              />
            ) : (
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#eef5ff]">
                {partner}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
