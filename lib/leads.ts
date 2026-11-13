import { BUSINESS_PHONE } from "@/lib/business-config";

export type LeadFormType = "Equipment Inquiry" | "Contact Form" | "Newsletter Signup";

/** Open a formatted enquiry in the business's published WhatsApp account. */
export async function submitLead(formType: LeadFormType, data: Record<string, string>): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const fields = Object.entries(data)
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `*${key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}:* ${value.trim()}`);
  const message = [`*Regenis Life — ${formType}*`, ...fields, `*Page:* ${window.location.href}`].join("\n");
  const number = BUSINESS_PHONE[0]?.replace(/\D/g, "");
  if (!number) return false;

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, "_blank");
  if (opened) opened.opener = null;
  else window.location.assign(url);
  return true;
}
