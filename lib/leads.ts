/**
 * Shared client helper for submitting site forms (e.g. the equipment
 * inquiry modal). This is a fresh Regenis Life project extracted from the
 * Medikold codebase, so it is intentionally NOT wired to Medikold's lead
 * pipeline — those are two different businesses and their leads shouldn't
 * mix.
 *
 * To make this live: stand up your own endpoint (a Google Apps Script Web
 * App, a serverless function, a CRM webhook — whatever you use for Regenis
 * Life) and drop the URL into APPS_SCRIPT_URL below. Until then, this
 * function just logs the submission locally so the UI still works end to
 * end during development.
 */

const APPS_SCRIPT_URL = ""; // TODO: set your Regenis Life leads endpoint

export type LeadFormType = "Equipment Inquiry" | "Contact Form" | "Newsletter Signup";

export async function submitLead(
  formType: LeadFormType,
  data: Record<string, string>
): Promise<boolean> {
  const payload = new URLSearchParams({
    formType,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    timestamp: new Date().toLocaleString(),
    ...data,
  });

  if (!APPS_SCRIPT_URL) {
    console.warn(
      `[leads] No endpoint configured — "${formType}" was not sent anywhere. ` +
        "Set APPS_SCRIPT_URL in lib/leads.ts to start capturing real leads.",
      Object.fromEntries(payload)
    );
    return true;
  }

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
    return true;
  } catch (error) {
    console.error(`[leads] Failed to submit "${formType}":`, error);
    return false;
  }
}
