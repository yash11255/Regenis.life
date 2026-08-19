"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/lib/business-config";

const quickLinks = [
  { label: "Equipment", href: "/equipment" },
  { label: "Full Catalog", href: "/equipment/all" },
  { label: "Featured Devices", href: "/equipment#featured-devices" },
  { label: "Our Partners", href: "/equipment#partners" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .rgf-footer {
          font-family: 'Inter', Helvetica, Arial, sans-serif;
        }

        .rgf-main {
          background: #111118;
          padding: clamp(56px, 8vw, 100px) clamp(20px, 5vw, 60px);
          position: relative; overflow: hidden;
        }
        .rgf-dotgrid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .rgf-inner {
          max-width: 1100px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        .rgf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 56px);
        }
        @media (min-width: 640px) {
          .rgf-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .rgf-grid { grid-template-columns: 1.6fr 1fr 1fr; }
        }

        .rgf-brand-desc {
          font-size: 14px; color: rgba(255,255,255,0.45);
          line-height: 1.75; margin: 20px 0 0;
          max-width: 320px;
        }

        .rgf-col-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px; color: white; font-weight: 400;
          margin: 0 0 20px; letter-spacing: -0.01em;
          position: relative; padding-bottom: 14px;
        }
        .rgf-col-title::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 28px; height: 2px;
          background: #1c69d4; border-radius: 2px;
        }
        .rgf-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .rgf-links li a {
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.18s, padding-left 0.18s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .rgf-links li a:hover {
          color: white;
          padding-left: 4px;
        }
        .rgf-link-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #1c69d4; flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.18s;
        }
        .rgf-links li a:hover .rgf-link-dot { opacity: 1; }

        .rgf-contact-items {
          display: flex; flex-direction: column; gap: 14px;
          margin-bottom: 8px;
        }
        .rgf-contact-row {
          display: flex; align-items: flex-start; gap: 12px;
        }
        .rgf-contact-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: rgba(28,105,212,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0; margin-top: 1px;
        }
        .rgf-contact-link {
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.18s; line-height: 1.5;
        }
        .rgf-contact-link:hover { color: white; }

        .rgf-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: clamp(36px, 5vw, 56px) 0 clamp(20px, 3vw, 32px);
        }

        .rgf-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .rgf-copyright {
          font-size: 13px; color: rgba(255,255,255,0.35);
          font-weight: 500; margin: 0;
        }
        .rgf-copyright a {
          color: #7fa8e0; text-decoration: none;
          transition: color 0.18s;
        }
        .rgf-copyright a:hover { color: white; }

        .rgf-bottom-links {
          display: flex; gap: 20px;
        }
        .rgf-bottom-links a {
          font-size: 12px; color: rgba(255,255,255,0.3);
          text-decoration: none; font-weight: 500;
          transition: color 0.18s;
        }
        .rgf-bottom-links a:hover { color: rgba(255,255,255,0.7); }

        .rgf-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #1c69d4 0%, #7c9fe0 100%);
        }
      `}</style>

      <footer className="rgf-footer">
        <div className="rgf-accent-bar" />

        <div className="rgf-main">
          <div className="rgf-dotgrid" aria-hidden />
          <div className="rgf-inner">
            <div className="rgf-grid">

              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/equipment" style={{ textDecoration: "none" }}>
                  <Image
                    src="/Regenis.png"
                    alt="Regenis Life"
                    width={1536}
                    height={1024}
                    className="h-16 w-[300px] object-cover object-center md:h-20 md:w-[380px]"
                  />
                </Link>
                <p className="rgf-brand-desc">
                  Regenis Life curates a portfolio of clinically-precise, globally
                  certified medical and wellness equipment for facilities that
                  demand outcomes.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="rgf-col-title">Explore</h4>
                <ul className="rgf-links">
                  {quickLinks.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href}>
                        <span className="rgf-link-dot" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="rgf-col-title">Contact</h4>
                <div className="rgf-contact-items">
                  <div className="rgf-contact-row">
                    <div className="rgf-contact-icon">✉️</div>
                    <a href={`mailto:${BUSINESS_EMAIL[0]}`} className="rgf-contact-link">
                      {BUSINESS_EMAIL[0]}
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>

            <div className="rgf-divider" />

            <div className="rgf-bottom">
              <p className="rgf-copyright">
                © {new Date().getFullYear()} <Link href="/equipment">{BUSINESS_NAME}</Link>. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}
