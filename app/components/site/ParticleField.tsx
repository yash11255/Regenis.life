"use client";

import { useEffect, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

/** Must be a stable module-level reference — the v4 ParticlesProvider throws
 *  if the `init` callback identity changes between renders. */
async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

const OPTIONS: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  smooth: true,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: ["push", "repulse"] },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.4, color: "#97c0a3" } },
      push: { quantity: 6 },
      repulse: { distance: 170, duration: 0.4 },
    },
  },
  particles: {
    color: { value: ["#97c0a3", "#c9b79a", "#f5f1e8"] },
    links: { color: "#6f8f79", distance: 130, enable: true, opacity: 0.18, width: 1 },
    move: {
      enable: true,
      speed: 0.7,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    number: { density: { enable: true, width: 1200, height: 800 }, value: 42 },
    opacity: {
      value: { min: 0.2, max: 0.6 },
      animation: { enable: true, speed: 0.7, sync: false },
    },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.6 } },
  },
  detectRetina: true,
};

/**
 * Interactive particle field for a `[data-band="dark"]` section — an
 * absolutely-positioned layer, not a global fixed canvas. Keeps the
 * hover/tap grab + push + repulse interactivity, recoloured to the warm
 * palette, and renders nothing under reduced motion.
 */
export default function ParticleField({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={className ?? "pointer-events-none absolute inset-0 z-0 overflow-hidden"}
      aria-hidden
    >
      <ParticlesProvider init={initEngine}>
        <Particles id="tsparticles" className="pointer-events-auto h-full w-full" options={OPTIONS} />
      </ParticlesProvider>
    </div>
  );
}
