"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import ParticleField from "../site/ParticleField";
import HeroVideo from "./HeroVideo";
import { easeOutExpo } from "@/lib/motion";
import { BUSINESS_EMAIL } from "@/lib/business-config";

interface HeroProps {
  eyebrow?: string;
  title?: React.ReactNode;
  summary?: string;
  primary?: { label: string; href: string };
}

export default function Hero({
  eyebrow = "Regenis Life — elite medical systems",
  title = (
    <>
      Clinical precision.
      <br />
      <span className="text-primary-on-dark">Engineered</span> for outcomes.
    </>
  ),
  summary = "The world's most advanced medical and wellness equipment platforms, precision-selected for clinical environments where outcomes define reputation.",
  primary = { label: "Explore equipment", href: "#featured-devices" },
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <section
      ref={ref}
      data-band="dark"
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <HeroVideo mode={reduce ? "poster" : "auto"} />
      </motion.div>
      <ParticleField className="pointer-events-none absolute inset-0 z-[1]" />

      <Container className="relative z-10 py-[clamp(56px,9vw,110px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <Eyebrow className="mb-7 text-ink-inverse-faint">{eyebrow}</Eyebrow>
          <h1 className="max-w-[16ch] font-display text-[clamp(40px,6.5vw,92px)] font-light leading-[1.08] tracking-[-0.02em] text-ink-inverse text-balance">
            {title}
          </h1>
          <p className="mt-8 max-w-[52ch] text-[clamp(15px,1.5vw,18px)] font-light leading-relaxed text-ink-inverse-muted">
            {summary}
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Button href={primary.href} variant="quiet" className="text-ink-inverse">
              {primary.label}
              <ArrowUpRight size={13} />
            </Button>
            <Button
              href={`mailto:${BUSINESS_EMAIL[0]}`}
              variant="quiet"
              className="text-ink-inverse"
            >
              Request consultation
              <ArrowUpRight size={13} />
            </Button>
          </div>
        </motion.div>
      </Container>
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-px bg-line" />
    </section>
  );
}
