"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface EquipmentCarouselProps {
  images: string[];
  alt: string;
}

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9IiNlZGU3ZDkiLz48L3N2Zz4=";

export default function EquipmentCarousel({ images, alt }: EquipmentCarouselProps) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (images.length <= 1 || reduce) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, reduce]);

  if (!images || images.length === 0) return null;

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(next);
  };
  const handlePrev = () =>
    go(activeIndex === 0 ? images.length - 1 : activeIndex - 1, -1);
  const handleNext = () =>
    go(activeIndex === images.length - 1 ? 0 : activeIndex + 1, 1);

  if (images.length === 1) {
    return (
      <div className="relative h-full min-h-[380px] bg-sunken lg:min-h-[520px]">
        <Image
          src={images[0]}
          alt={alt}
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div className="group relative flex h-full min-h-[460px] flex-col overflow-hidden bg-sunken select-none lg:min-h-[560px]">
      <div className="relative min-h-[380px] flex-1 overflow-hidden lg:min-h-[460px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.35 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} — image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              loading={activeIndex === 0 ? undefined : "lazy"}
              placeholder="blur"
              blurDataURL={BLUR}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground/40 to-transparent"
        />

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-ink-inverse/20 bg-ground/30 p-3 text-ink-inverse backdrop-blur-md transition hover:bg-ground/50 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-ink-inverse/20 bg-ground/30 p-3 text-ink-inverse backdrop-blur-md transition hover:bg-ground/50 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-ink-inverse/10 bg-ground/35 px-4 py-2 backdrop-blur-md">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => go(idx, idx > activeIndex ? 1 : -1)}
              aria-label={`Go to image ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === activeIndex
                  ? "w-6 bg-ink-inverse"
                  : "w-1.5 bg-ink-inverse/40 hover:bg-ink-inverse/70"
              )}
            />
          ))}
        </div>
      </div>

      <div className="scrollbar-thin flex min-h-[72px] justify-start gap-3 overflow-x-auto border-t border-line bg-sunken px-4 py-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => go(idx, idx > activeIndex ? 1 : -1)}
            aria-label={`Show image ${idx + 1}`}
            className={cn(
              "relative h-12 w-16 flex-shrink-0 overflow-hidden border transition-all duration-300",
              idx === activeIndex
                ? "border-primary ring-1 ring-primary/30"
                : "border-line opacity-55 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="64px"
              loading="lazy"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
