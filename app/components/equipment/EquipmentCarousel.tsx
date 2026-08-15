"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EquipmentCarouselProps {
  images: string[];
  alt: string;
}

export default function EquipmentCarousel({ images, alt }: EquipmentCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setDirection(1);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // If there's only 1 image, just render it simply
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full min-h-[400px] lg:min-h-[520px] bg-[#141414]">
        <Image
          src={images[0]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-700 filter grayscale-[15%] contrast-[1.06]"
        />
      </div>
    );
  }

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] bg-[#141414] overflow-hidden group select-none flex flex-col">
      {/* Main Slide view */}
      <div className="relative flex-1 w-full min-h-[400px] lg:min-h-[480px] overflow-hidden">
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
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} slide ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover filter grayscale-[10%] contrast-[1.05]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Floating Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center justify-center hover:scale-105 z-10 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center justify-center hover:scale-105 z-10 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10 bg-black/35 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => handleDotClick(idx, e)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Premium Thumbnail bar */}
      <div className="bg-[#141414] border-t border-white/[0.08] px-4 py-3 flex justify-start gap-3 overflow-x-auto scrollbar-none min-h-[76px]">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleDotClick(idx, e)}
            className={`relative w-16 h-12 flex-shrink-0 transition-all duration-300 border overflow-hidden rounded-none cursor-pointer ${
              idx === activeIndex
                ? "border-[#1c69d4] scale-[1.03] ring-1 ring-[#1c69d4]/30"
                : "border-white/10 opacity-50 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
