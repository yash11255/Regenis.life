"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FilterBarProps {
  categories: { name: string; logo?: string }[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function FilterBar({ categories, activeCategory, onSelect }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="sticky top-0 z-40 bg-[#071426]/90 backdrop-blur-xl border-b border-white/[0.10] overflow-x-auto scrollbar-hide"
    >
      <div className="flex items-center px-[clamp(24px,5vw,80px)] min-w-max gap-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;

          return (
            <button
              key={category.name}
              onClick={() => onSelect(category.name)}
              className="group relative py-8 px-8 transition-all duration-300 rounded-none"
            >
              <div className="relative z-10 flex items-center justify-center">
                {category.logo ? (
                  <Image
                    src={category.logo}
                    alt={category.name}
                    width={180}
                    height={48}
                    /* BIG SIZE: h-10 (40px) or h-12 (48px) */
                    className={`h-10 w-auto rounded-md bg-[#dce8f5] px-2 py-1 object-contain transition-all duration-500 ease-[0.22, 1, 0.36, 1] ${isActive
                        ? 'opacity-100 scale-110'
                        : 'opacity-100 scale-100 group-hover:scale-105'
                      }`}
                  />
                ) : (
                  <span className={`text-[11px] font-bold tracking-[0.14em] uppercase ${isActive ? "text-[#eef5ff]" : "text-[#8fa6bd]"
                    }`}>
                    {category.name}
                  </span>
                )}
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#1c69d4]"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
