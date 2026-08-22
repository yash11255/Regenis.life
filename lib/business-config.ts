/**
 * Regenis Life — Business Configuration
 * Centralized business details used across schema/SEO metadata.
 *
 * NOTE: This project was extracted from the Medikold equipment showcase as
 * a standalone site for Regenis Life. The values below are placeholders —
 * swap in the real phone / email / address / social links before launch.
 */

export const BUSINESS_NAME = "Regenis Life";
export const BUSINESS_URL = "https://regenis.life";
export const BUSINESS_LOGO = `${BUSINESS_URL}/Regenis.png`;
export const BUSINESS_IMAGE = `${BUSINESS_URL}/Regenis.png`;

export const BUSINESS_EMAIL = ["hello@regenis.life"];
export const BUSINESS_PHONE: string[] = [];

export const BUSINESS_DESCRIPTION =
  "Regenis Life curates medical and wellness equipment for clinical facilities, including hyperbaric chambers, aesthetic platforms, rehabilitation systems, diagnostics, recovery technologies, and robotics.";

// TODO: replace with real social handles once created
export const BUSINESS_SOCIAL_LINKS: string[] = [];

export const businessConfig = {
  name: BUSINESS_NAME,
  url: BUSINESS_URL,
  logo: BUSINESS_LOGO,
  image: BUSINESS_IMAGE,
  email: BUSINESS_EMAIL,
  phone: BUSINESS_PHONE,
  description: BUSINESS_DESCRIPTION,
  socialLinks: BUSINESS_SOCIAL_LINKS,
};
