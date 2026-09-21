"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const VIDEO_ID = "9uoYBcnOF2c";
const EMBED = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

/**
 * Ambient background video. The YouTube poster renders immediately as a
 * `next/image` (the LCP element); the muted autoplay iframe is mounted just
 * after first paint so it never blocks LCP. Under reduced motion the iframe
 * is never mounted.
 */
export default function HeroVideo({ mode = "auto" }: { mode?: "auto" | "poster" }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (mode !== "auto") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const t = window.setTimeout(() => setShowVideo(true), 600);
    return () => window.clearTimeout(t);
  }, [mode]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {showVideo && (
        <iframe
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={EMBED}
          title="Regenis Life — clinical equipment showcase"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex={-1}
        />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ground/50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ground via-ground/70 to-transparent"
      />
    </div>
  );
}
