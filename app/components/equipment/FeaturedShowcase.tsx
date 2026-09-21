"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Equipment } from "../../data/equipment";
import { visibleEquipment } from "../../data/equipment";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { fadeUp, viewportOnce } from "@/lib/motion";
import "./featured-showcase.css";

const ORBIT_DURATION = 24; // seconds per full loop

// 8 waypoints around a tilted ellipse viewed slightly from above.
const WAYPOINTS = [
  { x: 0, y: -90, z: -280, ry: 0, s: 0.55, o: 0.3, blur: 1.5, zi: 1 },
  { x: 184, y: -72, z: -198, ry: 12, s: 0.62, o: 0.4, blur: 1.1, zi: 2 },
  { x: 260, y: -20, z: 0, ry: 18, s: 0.8, o: 0.65, blur: 0.5, zi: 4 },
  { x: 184, y: 35, z: 198, ry: 10, s: 0.96, o: 0.85, blur: 0.15, zi: 7 },
  { x: 0, y: 70, z: 280, ry: 0, s: 1.15, o: 1, blur: 0, zi: 10 },
  { x: -184, y: 35, z: 198, ry: -10, s: 0.96, o: 0.85, blur: 0.15, zi: 7 },
  { x: -260, y: -20, z: 0, ry: -18, s: 0.8, o: 0.65, blur: 0.5, zi: 4 },
  { x: -184, y: -72, z: -198, ry: -12, s: 0.62, o: 0.4, blur: 1.1, zi: 2 },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function lerpWaypoint(progress: number) {
  const t = ((progress % 1) + 1) % 1;
  const count = WAYPOINTS.length;
  const segment = t * count;
  const i = Math.floor(segment) % count;
  const j = (i + 1) % count;
  const f = smoothstep(segment - Math.floor(segment));
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[j];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    z: a.z + (b.z - a.z) * f,
    ry: a.ry + (b.ry - a.ry) * f,
    s: a.s + (b.s - a.s) * f,
    o: a.o + (b.o - a.o) * f,
    blur: a.blur + (b.blur - a.blur) * f,
    zi: Math.round(a.zi + (b.zi - a.zi) * f),
  };
}

function getActiveIndex(elapsed: number, count: number) {
  const total = elapsed / ORBIT_DURATION;
  let best = 0;
  let bestZ = -Infinity;
  for (let i = 0; i < count; i++) {
    const wp = lerpWaypoint(total - i / count);
    if (wp.z > bestZ) {
      bestZ = wp.z;
      best = i;
    }
  }
  return best;
}

interface FeaturedShowcaseProps {
  eyebrow?: string;
  title?: React.ReactNode;
  items?: Equipment[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function FeaturedShowcase({
  eyebrow = "A first look at the portfolio",
  title = (
    <>
      Featured <span className="text-primary">devices.</span>
    </>
  ),
  items = visibleEquipment.slice(0, 6),
  ctaHref = "/equipment/all",
  ctaLabel = "View full catalog",
}: FeaturedShowcaseProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobileRef = useRef(false);
  /** Accumulated orbit time (seconds) — survives pause/resume. */
  const elapsedRef = useRef(0);

  const [paused, setPaused] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_COUNT = items.length;

  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Orbit lifecycle — the per-frame `el.style.*` writes below are the one
  // sanctioned inline-style case (documented in featured-showcase.css).
  useEffect(() => {
    if (!entered) return;
    const count = CARD_COUNT;

    const paint = (progressBase: number, staticFan: boolean) => {
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const progress = staticFan ? 0.5 - i / count : progressBase - i / count;
        const wp = lerpWaypoint(progress);
        const m = isMobileRef.current ? 0.5 : 1;
        const blur = isMobileRef.current ? wp.blur * 0.25 : wp.blur;
        el.style.transform = `translate(-50%, -50%) translate3d(${wp.x * m}px, ${wp.y * m}px, ${wp.z * m}px) rotateY(${wp.ry}deg) scale(${wp.s})`;
        el.style.opacity = String(wp.o);
        el.style.zIndex = String(wp.zi);
        el.style.filter =
          blur > 0.01 ? `blur(${blur}px) saturate(${0.7 + wp.o * 0.3})` : "none";
      }
    };

    if (reduce) {
      const id = requestAnimationFrame(() => {
        paint(0, true);
        setActiveIndex(getActiveIndex(0.5 * ORBIT_DURATION, count));
      });
      return () => cancelAnimationFrame(id);
    }

    if (paused) return;

    let raf = 0;
    let last = 0;
    const step = (ts: number) => {
      if (last) elapsedRef.current += (ts - last) / 1000;
      last = ts;
      const progressBase = elapsedRef.current / ORBIT_DURATION;
      paint(progressBase, false);
      setActiveIndex(getActiveIndex(elapsedRef.current, count));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [entered, paused, reduce, CARD_COUNT]);

  const activeItem = items[activeIndex];

  return (
    <section
      id="featured-devices"
      data-band="dark"
      className="relative scroll-mt-28 overflow-hidden py-[clamp(56px,8vw,110px)]"
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 border-b border-line pb-10"
        >
          <Eyebrow className="mb-4 text-ink-inverse-faint">{eyebrow}</Eyebrow>
          <SectionHeading className="text-ink-inverse">{title}</SectionHeading>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[minmax(300px,0.62fr)_minmax(380px,1.38fr)] md:items-start">
          {/* Left: synced info panel */}
          <div>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 w-6 transition-colors ${
                    activeIndex === i ? "bg-primary" : "bg-line"
                  }`}
                />
              ))}
            </div>

            {activeItem && (
              <div
                key={activeItem.id}
                className="efs3d-step mt-6 rounded-[var(--radius-card)] border border-line bg-[color-mix(in_srgb,var(--color-ground-raised)_82%,transparent)] p-[clamp(20px,4vw,28px)] backdrop-blur-xl"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  {activeItem.partner}
                </div>
                <h3 className="mt-2 font-display text-[clamp(22px,2.8vw,32px)] font-light leading-tight text-ink-inverse">
                  {activeItem.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeItem.category && (
                    <Badge tone="neutral" className="border-line bg-white/5 text-ink-inverse-muted">
                      {activeItem.category}
                    </Badge>
                  )}
                  {activeItem.isExclusive && (
                    <Badge tone="accent">★ Exclusive Indian Importer</Badge>
                  )}
                </div>

                <p className="mt-4 max-w-[42ch] text-[14px] leading-[1.65] text-ink-inverse-muted">
                  {activeItem.description}
                </p>

                {activeItem.specifications?.length ? (
                  <div className="mt-4 grid max-w-[420px] grid-cols-2 gap-2.5">
                    {activeItem.specifications.slice(0, 4).map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-[10px] border border-line bg-white/5 px-3.5 py-2.5"
                      >
                        <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink-inverse-faint">
                          {spec.label}
                        </div>
                        <div className="mt-1 text-[13px] font-semibold text-ink-inverse">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="my-4 h-px w-full max-w-[420px] bg-line" />

                <Link
                  href={`/equipment/${activeItem.id}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary-on-dark"
                >
                  View full details <ArrowUpRight size={13} />
                </Link>
              </div>
            )}
          </div>

          {/* Right: 3D orbit */}
          <div
            ref={sectionRef}
            className="efs3d-perspective"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <div className="efs3d-orbit">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="efs3d-card"
                >
                  <Link href={`/equipment/${item.id}`} className="block text-inherit no-underline">
                    <div className="efs3d-card-inner">
                      <div className="efs3d-card-accent" />
                      <div className="efs3d-card-media">
                        <Image src={item.image} alt={item.name} fill sizes="300px" />
                        {item.badge && (
                          <span className="absolute left-2.5 top-2.5 rounded-full bg-primary/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-primary-contrast">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-3.5 md:p-4">
                        <div className="text-[8px] font-bold uppercase tracking-[0.18em] text-primary md:text-[9px]">
                          {item.partner}
                        </div>
                        <h4 className="mt-1.5 line-clamp-2 font-display text-[12px] font-normal leading-snug text-ink-inverse md:text-[14px]">
                          {item.name}
                        </h4>
                        <div className="mt-1 line-clamp-1 text-[9px] text-ink-inverse-faint md:text-[10px]">
                          {item.tagline}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center border-t border-line pt-10">
          <Button href={ctaHref} variant="quiet" className="text-ink-inverse">
            {ctaLabel}
            <ArrowUpRight size={12} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
