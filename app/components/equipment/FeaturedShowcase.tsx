"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Equipment } from "../../data/equipment";
import { visibleEquipment } from "../../data/equipment";

/* ─── 3D Orbit Constants ─── */
const ORBIT_DURATION = 24; // seconds for a full loop (slow, elegant)

// 8 waypoints around a tilted ellipse — viewed from slightly above.
// Back cards sit higher (negative y), front cards sit lower (positive y).
const WAYPOINTS = [
  { x: 0,    y: -90,  z: -280, ry: 0,   s: 0.55, o: 0.3,  blur: 1.5, zi: 1 },  // 0°   back center (high)
  { x: 184,  y: -72,  z: -198, ry: 12,  s: 0.62, o: 0.4,  blur: 1.1, zi: 2 },  // 45°  back-right
  { x: 260,  y: -20,  z: 0,    ry: 18,  s: 0.80, o: 0.65, blur: 0.5, zi: 4 },  // 90°  right (mid-height)
  { x: 184,  y: 35,   z: 198,  ry: 10,  s: 0.96, o: 0.85, blur: 0.15,zi: 7 },  // 135° front-right
  { x: 0,    y: 70,   z: 280,  ry: 0,   s: 1.15, o: 1.0,  blur: 0,   zi: 10 }, // 180° HERO front (low)
  { x: -184, y: 35,   z: 198,  ry: -10, s: 0.96, o: 0.85, blur: 0.15,zi: 7 },  // 225° front-left
  { x: -260, y: -20,  z: 0,    ry: -18, s: 0.80, o: 0.65, blur: 0.5, zi: 4 },  // 270° left (mid-height)
  { x: -184, y: -72,  z: -198, ry: -12, s: 0.62, o: 0.4,  blur: 1.1, zi: 2 },  // 315° back-left
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function lerpWaypoint(progress: number) {
  let t = ((progress % 1) + 1) % 1;
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
  const totalProgress = elapsed / ORBIT_DURATION;
  let bestIndex = 0;
  let bestZ = -Infinity;
  for (let i = 0; i < count; i++) {
    const cardProgress = totalProgress - i / count;
    const wp = lerpWaypoint(cardProgress);
    if (wp.z > bestZ) {
      bestZ = wp.z;
      bestIndex = i;
    }
  }
  return bestIndex;
}

/* ─── Component Props ─── */
interface FeaturedShowcaseProps {
  eyebrow?: string;
  title?: React.ReactNode;
  items?: Equipment[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function FeaturedShowcase({
  eyebrow = "A First Look at the Portfolio",
  title = (
    <>
      Featured <span className="text-[#1c69d4]">Devices</span>
    </>
  ),
  items = visibleEquipment.slice(0, 6),
  ctaHref = "/equipment/all",
  ctaLabel = "View Full Catalog",
}: FeaturedShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const pausedAtRef = useRef<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobileRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRafRef = useRef<number>(0);

  const CARD_COUNT = items.length;

  // Track mobile state for orbit scaling
  useEffect(() => {
    const check = () => { isMobileRef.current = window.innerWidth < 768; };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      for (let i = 0; i < CARD_COUNT; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const cardProgress = elapsed / ORBIT_DURATION - i / CARD_COUNT;
        const wp = lerpWaypoint(cardProgress);
        const m = isMobileRef.current ? 0.5 : 1;
        const blurVal = isMobileRef.current ? wp.blur * 0.2 : wp.blur;

        el.style.transform = `translate(-50%, -50%) translate3d(${wp.x * m}px, ${wp.y * m}px, ${wp.z * m}px) rotateY(${wp.ry}deg) scale(${wp.s})`;
        el.style.opacity = String(wp.o);
        el.style.zIndex = String(wp.zi);
        el.style.filter =
          blurVal > 0.01
            ? `blur(${blurVal}px) saturate(${0.7 + wp.o * 0.3})`
            : "blur(0px) saturate(1)";
      }

      const newActive = getActiveIndex(elapsed, CARD_COUNT);
      setActiveIndex(newActive);

      rafRef.current = requestAnimationFrame(animate);
    },
    [CARD_COUNT]
  );

  // Pause / resume
  useEffect(() => {
    if (isPaused) {
      pausedAtRef.current = performance.now();
      cancelAnimationFrame(rafRef.current);
    } else if (hasEntered) {
      if (pausedAtRef.current && startTimeRef.current) {
        startTimeRef.current += performance.now() - pausedAtRef.current;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [isPaused, hasEntered, animate]);

  // Intersection observer for entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, hasEntered]);

  // ─── Floating particles ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasEntered) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 25;
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width || window.innerWidth;
      h = rect?.height || 800;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,           // radius 0.5–2
      vx: (Math.random() - 0.5) * 0.3,         // slow horizontal drift
      vy: -(Math.random() * 0.15 + 0.05),       // gentle upward float
      o: Math.random() * 0.35 + 0.08,           // opacity 0.08–0.43
      hue: 210 + Math.random() * 20,            // blue tint (210–230)
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 72%, ${p.o})`;
        ctx.fill();
      }
      particleRafRef.current = requestAnimationFrame(drawParticles);
    };

    particleRafRef.current = requestAnimationFrame(drawParticles);

    return () => {
      cancelAnimationFrame(particleRafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [hasEntered]);

  const activeItem = items[activeIndex];

  return (
    <section
      id="featured-devices"
      ref={sectionRef}
      className="efs3d-section"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

        .efs3d-section {
          font-family: 'Inter', Helvetica, Arial, sans-serif;
          background: transparent;
          color: #fff;
          overflow: hidden;
          padding: clamp(48px, 7vw, 100px) clamp(24px, 5vw, 80px);
          position: relative;
          scroll-margin-top: 8rem;
        }
        .efs3d-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .efs3d-content {
          position: relative;
          z-index: 1;
        }

        /* Header */
        .efs3d-header {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 40px;
          margin-bottom: 48px;
        }
        .efs3d-eyebrow {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #bbbbbb;
          line-height: 1.3;
          margin-bottom: 20px;
        }
        .efs3d-title {
          font-weight: 300;
          line-height: 1.15;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          font-size: clamp(32px, 4.5vw, 56px);
          color: #fff;
          max-width: 640px;
          margin: 0;
        }
        .efs3d-accent { color: #1c69d4; }

        /* Layout: text + orbit */
        .efs3d-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .efs3d-layout {
            display: grid;
            grid-template-columns: minmax(300px, 0.65fr) minmax(400px, 1.35fr);
            align-items: start;
            gap: 32px;
          }
        }

        /* Left text panel with glassmorphic backdrop for crystal clear text readability */
        .efs3d-left {
          padding: 0 0 16px;
        }
        @media (min-width: 768px) {
          .efs3d-left {
            padding: 0;
          }
        }
        .efs3d-text-panel {
          position: relative;
          background: rgba(5, 13, 24, 0.82);
          backdrop-filter: blur(20px) saturate(1.2);
          -webkit-backdrop-filter: blur(20px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: clamp(20px, 4vw, 28px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        /* Step content */
        .efs3d-step {
          animation: efs3d-fadein 0.4s ease;
        }
        @keyframes efs3d-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .efs3d-step-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .efs3d-step-title {
          font-size: clamp(22px, 2.8vw, 32px);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: #ffffff;
          margin: 0 0 16px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .efs3d-step-desc {
          font-size: 14px;
          line-height: 1.65;
          color: #dce8f5;
          margin: 0 0 20px;
          max-width: 420px;
        }
        .efs3d-step-partner {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3d8cff;
          margin-bottom: 8px;
        }
        .efs3d-step-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-top: 8px;
        }
        .efs3d-step-link:hover {
          gap: 10px;
          color: #93c5fd;
        }

        /* Category & manufacturer pills */
        .efs3d-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .efs3d-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 5px 12px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .efs3d-meta-pill.exclusive {
          background: rgba(28, 105, 212, 0.25);
          color: #60a5fa;
          border-color: rgba(96, 165, 250, 0.4);
        }

        /* Specs grid */
        .efs3d-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 16px 0;
          max-width: 420px;
        }
        .efs3d-spec {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 10px 14px;
        }
        .efs3d-spec-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        .efs3d-spec-value {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
        }

        /* Features list */
        .efs3d-features {
          list-style: none;
          padding: 0;
          margin: 12px 0 16px;
          max-width: 420px;
        }
        .efs3d-features li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.5;
          margin-bottom: 6px;
        }
        .efs3d-features li::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3d8cff;
          box-shadow: 0 0 6px #3d8cff;
          flex-shrink: 0;
          margin-top: 7px;
        }

        /* Divider */
        .efs3d-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          margin: 16px 0;
          max-width: 420px;
        }

        /* Dots nav */
        .efs3d-dots {
          display: flex;
          gap: 8px;
          margin-top: 24px;
        }
        .efs3d-dot {
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,0.15);
          border: none;
          padding: 0;
          cursor: default;
          transition: background 0.25s;
        }
        .efs3d-dot.active {
          background: #1c69d4;
        }

        /* 3D perspective container */
        .efs3d-perspective {
          perspective: 900px;
          perspective-origin: 50% 30%;
          height: 420px;
          overflow: hidden;
          position: relative;
        }
        @media (min-width: 768px) {
          .efs3d-perspective {
            perspective: 1400px;
            perspective-origin: 50% 35%;
            height: 620px;
            overflow: visible;
          }
        }

        /* Orbit area */
        .efs3d-orbit {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        /* Card */
        .efs3d-card {
          position: absolute;
          top: 50%;
          left: 50%;
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
          width: clamp(160px, 40vw, 210px);
        }
        @media (min-width: 768px) {
          .efs3d-card {
            width: clamp(240px, 17vw, 300px);
          }
        }
        .efs3d-card:hover {
          box-shadow: 0 30px 60px rgba(28,105,212,0.15);
        }

        /* Card inner */
        .efs3d-card-inner {
          border-radius: 16px;
          overflow: hidden;
          background: rgba(20, 30, 48, 0.85);
          backdrop-filter: blur(16px) saturate(1.1);
          -webkit-backdrop-filter: blur(16px) saturate(1.1);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
        }

        /* Card shine */
        .efs3d-card-shine {
          position: absolute;
          top: -45%;
          left: -38%;
          width: 80%;
          height: 175%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transform: rotate(19deg);
          opacity: 0.7;
          pointer-events: none;
        }

        /* Card accent bar */
        .efs3d-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }

        /* Card image */
        .efs3d-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .efs3d-card-image img {
          object-fit: cover;
        }
        .efs3d-card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,18,32,0.7), transparent);
        }

        /* Card body */
        .efs3d-card-body {
          padding: 12px 14px 14px;
        }
        @media (min-width: 768px) {
          .efs3d-card-body {
            padding: 16px 18px 18px;
          }
        }
        .efs3d-card-partner {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1c69d4;
          margin-bottom: 6px;
        }
        @media (min-width: 768px) {
          .efs3d-card-partner { font-size: 9px; }
        }
        .efs3d-card-name {
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          line-height: 1.3;
          color: #fff;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .efs3d-card-name { font-size: 14px; }
        }
        .efs3d-card-tagline {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .efs3d-card-tagline { font-size: 10px; }
        }

        /* CTA */
        .efs3d-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
      `}} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="efs3d-particles" />

      <div className="efs3d-content">
      {/* Header */}
      <motion.div
        className="efs3d-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div className="efs3d-eyebrow">{eyebrow}</div>
            <h2 className="efs3d-title">{title}</h2>
          </div>
          <Link
            href={ctaHref}
            className="site-action-secondary"
            style={{ display: "none" }}
          >
            {ctaLabel}
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </motion.div>

      {/* Main layout: text left + 3D orbit right */}
      <div className="efs3d-layout">
        {/* Left: active item info */}
        <div className="efs3d-left">
          {/* Dots */}
          <div className="efs3d-dots">
            {items.map((_, i) => (
              <div
                key={i}
                className={`efs3d-dot${activeIndex === i ? " active" : ""}`}
              />
            ))}
          </div>

          {/* Active item panel — auto-sizes to content */}
          <div className="efs3d-text-panel" style={{ marginTop: "24px" }}>
            {(() => {
              const item = items[activeIndex];
              if (!item) return null;
              return (
                <div key={item.id} className="efs3d-step">
                  {/* Partner & category */}
                  <div className="efs3d-step-partner">{item.partner}</div>
                  <h3 className="efs3d-step-title">{item.name}</h3>

                  {/* Meta pills */}
                  <div className="efs3d-meta-row">
                    {item.category && (
                      <span className="efs3d-meta-pill">{item.category}</span>
                    )}
                    {item.manufacturer && (
                      <span className="efs3d-meta-pill">{item.manufacturer}</span>
                    )}
                    {item.isExclusive && (
                      <span className="efs3d-meta-pill exclusive">★ Exclusive Indian Importer</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="efs3d-step-desc">{item.description}</p>

                  {/* Specs */}
                  {item.specifications && item.specifications.length > 0 && (
                    <div className="efs3d-specs">
                      {item.specifications.slice(0, 4).map((spec) => (
                        <div key={spec.label} className="efs3d-spec">
                          <div className="efs3d-spec-label">{spec.label}</div>
                          <div className="efs3d-spec-value">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  {item.features && item.features.length > 0 && (
                    <ul className="efs3d-features">
                      {item.features.slice(0, 3).map((feat, fi) => (
                        <li key={fi}>{feat}</li>
                      ))}
                    </ul>
                  )}

                  <div className="efs3d-divider" />

                  <Link
                    href={`/equipment/${item.id}`}
                    className="efs3d-step-link"
                  >
                    View Full Details <ArrowUpRight size={13} />
                  </Link>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Right: 3D orbit */}
        <div
          className="efs3d-perspective"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="efs3d-orbit">
            {items.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="efs3d-card"
                style={{ opacity: 0 }}
              >
                <Link href={`/equipment/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="efs3d-card-inner">
                    {/* Shine effect */}
                    <div className="efs3d-card-shine" />
                    {/* Accent bar */}
                    <div
                      className="efs3d-card-accent"
                      style={{ background: "linear-gradient(90deg, #1c69d4, #3d8aff)" }}
                    />

                    {/* Card image */}
                    <div className="efs3d-card-image">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="300px"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="efs3d-card-image-overlay" />
                      {item.badge && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            fontSize: "8px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            background: "rgba(28,105,212,0.9)",
                            color: "#fff",
                            padding: "3px 8px",
                            borderRadius: "100px",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Card text */}
                    <div className="efs3d-card-body">
                      <div className="efs3d-card-partner">{item.partner}</div>
                      <h4 className="efs3d-card-name">{item.name}</h4>
                      <div className="efs3d-card-tagline">{item.tagline}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="efs3d-cta-row">
        <Link href={ctaHref} className="site-action-secondary">
          {ctaLabel}
          <ArrowUpRight size={12} />
        </Link>
      </div>
      </div>
    </section>
  );
}
