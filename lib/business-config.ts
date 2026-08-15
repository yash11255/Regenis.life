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
export const BUSINESS_LOGO = `${BUSINESS_URL}/regenis-logo.svg`;
export const BUSINESS_IMAGE = `${BUSINESS_URL}/regenis-logo.svg`;

// TODO: replace with real contact details before launch
export const BUSINESS_EMAIL = ["hello@regenis.life"];
export const BUSINESS_PHONE = ["+91-00000-00000"];

export const BUSINESS_DESCRIPTION =
  "Regenis Life curates a portfolio of clinically-precise, globally certified medical and wellness equipment — from hyperbaric oxygen chambers to aesthetic platforms and regenerative therapy systems — for clinics and facilities that demand outcomes.";

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
