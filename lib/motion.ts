import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion vocabulary. Components import these instead of re-declaring
 * inline `initial` / `animate` / `transition` objects everywhere.
 *
 * `prefers-reduced-motion` is handled globally in `app/globals.css` (which
 * neutralises CSS + most framer transitions) and, for the JS-driven rAF loops
 * (3D orbit, canvas particles, carousel autoplay), via `useReducedMotion()`
 * checks in the components themselves.
 */

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeOutQuint: Transition["ease"] = [0.22, 1, 0.36, 1];
export const springSoft: Transition = { type: "spring", stiffness: 200, damping: 26 };

/** Standard "reveal on scroll" viewport config. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

/** Parent that staggers its `fadeUp` / `fadeIn` children. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Item for use inside `staggerContainer`. */
export const staggerItem: Variants = fadeUp;
