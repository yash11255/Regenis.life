"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BUSINESS_EMAIL } from "@/lib/business-config";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  // Maintain the subtle parallax effect for the video container
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="relative min-h-[90vh] bg-[#141414] overflow-hidden flex flex-col justify-end">
      {/* Background Video Container */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: videoY }}
      >
        <div className="relative w-full h-full scale-110"> {/* Scale prevents edge gaps during parallax */}
          <iframe
            suppressHydrationWarning
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/9uoYBcnOF2c?autoplay=1&mute=1&controls=0&loop=1&playlist=9uoYBcnOF2c&rel=0&showinfo=0&iv_load_policy=3"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        </div>
        {/* Overlay for cinematic mood and text readability */}
        <div className="absolute inset-0 bg-[#141414]/40 brightness-[0.35] contrast-110" />
      </motion.div>

      {/* Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 px-[clamp(24px,5vw,80px)] pt-[clamp(64px,8vw,100px)] pb-[clamp(48px,6vw,72px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#bbbbbb] leading-[1.3] mb-8">
            Regenis Life — ELITE MEDICAL SYSTEMS
          </div>

          <h1 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(40px,6.5vw,96px)] text-white max-w-[900px] mb-10">
            Clinical Precision.<br />
            <span className="text-[#1c69d4]">Engineered</span> for Excellence.
          </h1>

          <p className="text-[clamp(15px,1.5vw,18px)] font-light leading-[1.55] text-[#bbbbbb] max-w-[520px] mb-14">
            The world&apos;s most advanced medical equipment platforms. Precision-selected for clinical environments where outcomes define reputation.
          </p>

          <div className="flex gap-5 flex-wrap items-center">
            <a
              href="#featured-devices"
              className="inline-flex items-center gap-[10px] px-8 py-[15px] bg-transparent text-white text-base font-bold leading-[1.2] no-underline border-b border-white transition-colors duration-200 cursor-pointer rounded-none hover:bg-white hover:text-[#262626]"
            >
              Explore Equipment
              <ChevronRight size={16} strokeWidth={2} />
            </a>
            <Link
              href={`mailto:${BUSINESS_EMAIL[0]}`}
              className="inline-flex items-center gap-[6px] text-[11px] font-bold tracking-[0.13em] uppercase text-[#bbbbbb] no-underline border-b border-white/30 pb-[2px] transition-colors duration-200 rounded-none hover:text-[#0653b6] hover:border-[#0653b6]"
            >
              Request Consultation
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.12] z-10" />
    </section>
  );
}
