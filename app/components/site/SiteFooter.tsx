"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import {
  BUSINESS_EMAIL,
  BUSINESS_INSTAGRAM_URL,
  BUSINESS_LINKEDIN_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
} from "@/lib/business-config";
import { CATEGORIES } from "@/app/data/categories";
import Image from "next/image";
import { fadeUp, viewportOnce } from "@/lib/motion";

const EXPLORE = [
  { label: "Equipment", href: "/equipment" },
  { label: "Full Catalog", href: "/equipment/all" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Medical Disclaimer", href: "/disclaimer" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-band="dark" className="relative overflow-hidden">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[var(--container-max)] gutter py-[clamp(56px,8vw,104px)]">
        <div className="grid gap-[clamp(32px,5vw,56px)] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Link href="/" aria-label="Regenis Life — home" className="inline-flex">
              <Image
                src="/regenis-logo-cropped.png"
                alt="Regenis Life"
                width={2062}
                height={763}
                className="logo-on-white h-20 w-auto object-contain md:h-24"
              />
            </Link>
            <p className="mt-5 max-w-[320px] text-[14px] leading-[1.75] text-ink-inverse-muted">
              A curated portfolio of clinically precise, globally certified medical and
              wellness equipment for facilities that measure themselves by outcomes.
            </p>
          </motion.div>

          <FooterColumn title="Explore" delay={0.05}>
            {EXPLORE.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="By category" delay={0.1}>
            {CATEGORIES.map((c) => (
              <FooterLink key={c.slug} href={`/equipment/category/${c.slug}`}>
                {c.shortName}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" delay={0.15}>
            <a
              href={`mailto:${BUSINESS_EMAIL[0]}`}
              className="inline-flex items-center gap-2.5 text-[13px] text-ink-inverse-muted transition-colors hover:text-ink-inverse"
            >
              <Mail size={15} className="text-primary-on-dark" />
              {BUSINESS_EMAIL[0]}
            </a>
            {BUSINESS_PHONE[0] && (
              <a
                href={`tel:${BUSINESS_PHONE[0].replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2.5 text-[13px] text-ink-inverse-muted transition-colors hover:text-ink-inverse"
              >
                <Phone size={15} className="text-primary-on-dark" />
                {BUSINESS_PHONE[0]}
              </a>
            )}
            <a
              href={BUSINESS_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[13px] text-ink-inverse-muted transition-colors hover:text-ink-inverse"
            >
              <Linkedin size={15} className="text-primary-on-dark" />
              LinkedIn
            </a>
            <a
              href={BUSINESS_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[13px] text-ink-inverse-muted transition-colors hover:text-ink-inverse"
            >
              <Instagram size={15} className="text-primary-on-dark" />
              Instagram
            </a>
          </FooterColumn>
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-ink-inverse-faint">
            &copy; {year}{" "}
            <Link href="/" className="text-primary-on-dark hover:text-ink-inverse">
              {BUSINESS_NAME}
            </Link>
            . All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-ink-inverse-faint transition-colors hover:text-ink-inverse"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      <h2 className="relative mb-5 pb-3.5 font-display text-[17px] font-normal text-ink-inverse after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-7 after:bg-primary-on-dark">
        {title}
      </h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </motion.div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[14px] font-medium text-ink-inverse-muted transition-colors hover:text-ink-inverse"
    >
      {children}
    </Link>
  );
}
