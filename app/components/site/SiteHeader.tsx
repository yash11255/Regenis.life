"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { easeOutQuint } from "@/lib/motion";
import Button from "../ui/Button";
import InquiryModal from "../equipment/InquiryModal";

const NAV_ITEMS = [
  { label: "Equipment", href: "/equipment" },
  { label: "Full Catalog", href: "/equipment/all" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Routes that open with a full-bleed dark hero — header floats transparent
 *  over them until the user scrolls. */
const OVERLAY_ROUTES = new Set(["/", "/equipment"]);

export default function SiteHeader() {
  const pathname = usePathname();
  const isOverlay = OVERLAY_ROUTES.has(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close the mobile menu after a client-side navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Inverse (light-on-dark) styling only while floating over a dark hero.
  const inverse = isOverlay && !scrolled;
  const solid = !inverse;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div
        className={cn(
          "mx-auto flex max-w-[var(--container-max)] items-center justify-between gutter transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto flex w-full items-center justify-between rounded-2xl px-4 py-2.5 transition-colors duration-300 md:px-6",
            solid
              ? "border border-line bg-paper/85 shadow-[var(--shadow-raised)] backdrop-blur-xl"
              : "border border-transparent"
          )}
        >
          <Link href="/" aria-label="Regenis Life — home" className="flex flex-shrink-0 items-center">
            <Image
              src="/regenis-logo-cropped.png"
              alt="Regenis Life"
              width={2062}
              height={763}
              priority
              className={cn(
                "h-16 w-auto object-contain transition md:h-[76px]",
                inverse && "logo-on-white"
              )}
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors",
                        inverse
                          ? "text-ink-inverse/75 hover:bg-white/10 hover:text-ink-inverse"
                          : "text-ink-muted hover:bg-sunken hover:text-ink",
                        active && (inverse ? "text-ink-inverse" : "text-primary")
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center lg:flex">
            <Button
              type="button"
              size="sm"
              onClick={() => setInquiryOpen(true)}
              className={cn(inverse && "bg-primary-on-dark text-ground hover:bg-primary-on-dark/90")}
            >
              Enquire Now
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden",
              inverse ? "text-ink-inverse hover:bg-white/10" : "text-ink hover:bg-sunken"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: easeOutQuint }}
            className="pointer-events-auto mx-auto mt-1 max-w-[var(--container-max)] gutter lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-raised shadow-[var(--shadow-pop)]">
              <nav aria-label="Primary" className="flex flex-col p-3">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-muted hover:bg-sunken hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  type="button"
                  size="md"
                  className="mt-2"
                  onClick={() => {
                    setMobileOpen(false);
                    setInquiryOpen(true);
                  }}
                >
                  Enquire Now
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </header>
  );
}
