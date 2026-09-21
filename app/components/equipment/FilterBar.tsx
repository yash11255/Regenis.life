"use client";

import { motion } from "framer-motion";
import { easeOutQuint } from "@/lib/motion";
import { cn } from "@/lib/cn";

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
      transition={{ duration: 0.5, ease: easeOutQuint, delay: 0.15 }}
      className="scrollbar-hide sticky top-0 z-40 overflow-x-auto border-y border-line bg-paper/92 backdrop-blur-xl"
    >
      <div className="flex min-w-max items-stretch gutter">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onSelect(category.name)}
              aria-pressed={isActive}
              className={cn(
                "group relative whitespace-nowrap px-5 py-5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
                isActive ? "text-ink" : "text-ink-faint hover:text-ink"
              )}
            >
              {category.name}
              {isActive && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-x-4 bottom-0 h-[3px] bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
