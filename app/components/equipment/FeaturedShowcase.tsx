"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Equipment } from "../../data/equipment";
import { visibleEquipment } from "../../data/equipment";

interface FeaturedShowcaseProps {
  eyebrow?: string;
  title?: React.ReactNode;
  items?: Equipment[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function FeaturedShowcase({
  eyebrow = "Regenis Life — Equipment Showcase",
  title = (
    <>
      Clinical Precision. <span className="text-[#1c69d4]">Engineered</span> Technology.
    </>
  ),
  items = visibleEquipment.slice(0, 6),
  ctaHref = "/equipment/all",
  ctaLabel = "View All Equipment",
}: FeaturedShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxSlideIndex, setMaxSlideIndex] = useState(Math.max(0, items.length - 1));

  const getMaxSlideIndex = () => {
    const container = scrollRef.current;
    const firstCard = container?.children[0] as HTMLElement | undefined;
    if (!container || !firstCard) return Math.max(0, items.length - 1);

    const cardStep = firstCard.offsetWidth + 20;
    const scrollableWidth = Math.max(0, container.scrollWidth - container.clientWidth);
    const maxIndex = Math.ceil((scrollableWidth + 2) / cardStep);
    return Math.max(0, Math.min(items.length - 1, maxIndex));
  };

  useEffect(() => {
    const updateSlides = () => {
      const nextMaxIndex = getMaxSlideIndex();
      setMaxSlideIndex(nextMaxIndex);
      setActiveIndex((current) => Math.min(current, nextMaxIndex));
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Auto-advance the carousel, looping back to the start; pauses on hover/touch.
  useEffect(() => {
    if (maxSlideIndex <= 0) return;
    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;
      const next = activeIndexRef.current >= maxSlideIndex ? 0 : activeIndexRef.current + 1;
      scrollToCard(next);
    }, 4000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxSlideIndex]);

  function scrollToCard(index: number) {
    const container = scrollRef.current;
    if (!container) return;
    const targetIndex = Math.max(0, Math.min(index, maxSlideIndex));
    const card = container.children[targetIndex] as HTMLElement;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 2, behavior: "smooth" });
      setActiveIndex(targetIndex);
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[0] as HTMLElement | undefined;
    const cardWidth = (card?.offsetWidth || 320) + 20;
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(index, maxSlideIndex)));
  };

  const moveCarousel = (direction: "prev" | "next") => {
    scrollToCard(activeIndex + (direction === "next" ? 1 : -1));
  };

  return (
    <section id="featured-devices" className="equipment-featured-showcase bg-[#050d18] text-white antialiased overflow-hidden scroll-mt-32">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        .equipment-featured-showcase { font-family: 'Inter', Helvetica, Arial, sans-serif; }

        .efs-carousel {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-snap-stop: always;
          touch-action: pan-x;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 2px 2px 8px;
          margin: 0;
        }
        .efs-carousel::-webkit-scrollbar { display: none; }
        .efs-card {
          flex: 0 0 78vw;
          max-width: 340px;
          scroll-snap-align: start;
        }
        @media (min-width: 640px) {
          .efs-card { flex-basis: calc((100% - 40px) / 3); max-width: none; }
        }

        .efs-nav-btn {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.16);
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .efs-nav-btn:hover:not(:disabled) {
          border-color: #1c69d4;
          color: #1c69d4;
        }
        .efs-nav-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }

        .efs-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 40px;
        }
        .efs-dot {
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.25s;
        }
        .efs-dot.active { background: #1c69d4; }
      `}} />

      <div className="px-[clamp(24px,5vw,80px)] py-[clamp(64px,8vw,120px)]">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-14 pb-10 border-b border-white/[0.08]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#bbbbbb] leading-[1.3] mb-5">
              {eyebrow}
            </div>
            <h2 className="font-light leading-[1.15] uppercase tracking-[-0.01em] text-[clamp(32px,4.5vw,56px)] text-white max-w-[640px]">
              {title}
            </h2>
          </motion.div>

          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href={ctaHref}
              className="site-action-secondary hidden sm:inline-flex"
            >
              {ctaLabel}
              <ArrowUpRight size={12} />
            </Link>
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                className="efs-nav-btn"
                onClick={() => moveCarousel("prev")}
                disabled={activeIndex === 0}
                aria-label="Previous equipment"
              >
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="efs-nav-btn"
                onClick={() => moveCarousel("next")}
                disabled={activeIndex >= maxSlideIndex}
                aria-label="Next equipment"
              >
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className="efs-carousel"
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
          onTouchStart={() => { isPausedRef.current = true; }}
          onTouchEnd={() => { isPausedRef.current = false; }}
        >
          {items.map((eq, index) => (
            <motion.div
              key={eq.id}
              className="efs-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/equipment/${eq.id}`}
                className="group relative block bg-[#1c1c1c] overflow-hidden aspect-[4/5]"
              >
                <Image
                  src={eq.image}
                  alt={eq.name}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 33vw"
                  className="object-cover grayscale-[25%] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                {eq.badge && (
                  <span className="absolute top-5 left-5 inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#1c69d4]/90 text-white">
                    {eq.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] tracking-[0.14em] uppercase text-[#1c69d4] font-bold mb-2">
                    {eq.partner}
                  </div>
                  <div className="text-white text-[19px] leading-[1.2] font-light uppercase tracking-[0.01em]">
                    {eq.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="efs-dots">
          {Array.from({ length: maxSlideIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`efs-dot${activeIndex === i ? " active" : ""}`}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href={ctaHref}
            className="site-action-primary"
          >
            {ctaLabel}
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
