"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { type MouseEvent, useEffect, useState } from "react";
import InquiryModal from "./equipment/InquiryModal";

const NAV_ITEMS = [
  { label: "Equipment", href: "/equipment" },
  { label: "Full Catalog", href: "/equipment/all" },
  { label: "Contact", href: "/equipment#contact" },
];

export function ModernNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
    if (label !== "Contact" || window.location.pathname !== "/equipment") return;

    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/equipment#contact");
    setMobileOpen(false);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] pointer-events-none transition-all duration-500"
      style={{ paddingTop: scrolled ? "12px" : "24px" }}
    >
      <div className="mx-auto max-w-[1380px] px-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-between rounded-[18px] px-7 py-4 pointer-events-auto transition-all duration-500 md:px-8"
          style={{
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset"
              : "0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="absolute inset-0 z-[-1] transition-colors duration-500 rounded-[18px]"
            style={{
              background: "#011027",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          />

          {/* Logo */}
          <Link href="/equipment" className="flex items-center flex-shrink-0">
            <Image
              src="/Regenis.png"
              alt="Regenis Life"
              width={1536}
              height={1024}
              className="h-12 w-[240px] object-cover object-center md:h-16 md:w-[320px]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.label)}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold tracking-[0.04em] uppercase text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setInquiryModalOpen(true)}
              className="relative inline-flex items-center gap-2 text-white text-[13px] font-bold tracking-[0.04em] uppercase px-6 py-2.5 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-px active:scale-95"
              style={{ background: "#1c69d4", border: 0, cursor: "pointer", fontFamily: "inherit" }}
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center transition-all"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center transition-all"
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden mx-5 mt-2 rounded-2xl overflow-hidden pointer-events-auto"
            style={{
              background: "#011027",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(event) => {
                    handleNavClick(event, item.label);
                    if (item.label !== "Contact") setMobileOpen(false);
                  }}
                  className="px-3 py-2.5 rounded-xl text-[13px] font-semibold tracking-[0.04em] uppercase text-white/75 hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setInquiryModalOpen(true);
                }}
                className="mt-2 text-white text-[13px] font-bold tracking-[0.04em] uppercase px-6 py-3 rounded-xl text-center"
                style={{ background: "#1c69d4", border: 0, cursor: "pointer", fontFamily: "inherit" }}
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </nav>
  );
}
