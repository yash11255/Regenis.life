"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type Props = {
  brand: string;
  postTitle: string;
  whatsappNumber: string;
  accent?: string;
  heading?: string;
};

/** A single, dismissible enquiry prompt on article pages only. */
export default function BlogLeadPopup({
  brand,
  postTitle,
  whatsappNumber,
  accent = "#0b5bb5",
  heading = "Have a question about this article?",
}: Props) {
  const id = useId();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"hidden" | "popup" | "reopen">("hidden");
  const storageKey = `blog-enquiry-prompt:${brand}`;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "seen") {
        const timer = window.setTimeout(() => setMode("reopen"), 0);
        return () => window.clearTimeout(timer);
      }
    } catch { /* Storage can be unavailable in private browsing. */ }
    const timer = window.setTimeout(() => setMode("popup"), 5000);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    if (mode !== "popup") return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mode]);

  useEffect(() => {
    if (mode !== "popup") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mode]);

  function dismiss() {
    setMode("reopen");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") || "").trim();
    const phone = String(fields.get("phone") || "").replace(/\D/g, "");
    if (!name || phone.length < 10 || phone.length > 13) {
      const input = event.currentTarget.elements.namedItem("phone") as HTMLInputElement | null;
      input?.setCustomValidity("Enter a valid mobile number.");
      event.currentTarget.reportValidity();
      return;
    }
    (event.currentTarget.elements.namedItem("phone") as HTMLInputElement | null)?.setCustomValidity("");
    const message = [
      `*${brand} — blog enquiry*`,
      `*Article:* ${postTitle}`,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Page:* ${window.location.href}`,
      "Please contact me about this article.",
    ].join("\n");
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
    else window.location.assign(url);
    try { sessionStorage.setItem(storageKey, "seen"); } catch { /* Ignore storage errors. */ }
    dismiss();
  }

  if (!mounted || mode === "hidden") return null;

  if (mode === "reopen") return createPortal(
    <button type="button" onClick={() => setMode("popup")}
      style={{ position: "fixed", bottom: 20, left: 20, zIndex: 2147483645, border: 0, borderRadius: 999, padding: "12px 18px", background: accent, color: "white", fontWeight: 700, boxShadow: "0 8px 24px #0002", cursor: "pointer" }}>
      Ask about this article
    </button>, document.body
  );

  return createPortal(
    <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}
      style={{ position: "fixed", inset: 0, zIndex: 2147483646, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", padding: 16, background: "#0b1734a6" }}>
      <section role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}
        style={{ width: "100%", maxWidth: 440, maxHeight: "calc(100dvh - 32px)", overflowY: "auto", boxSizing: "border-box", position: "relative", borderRadius: 22, background: "#fff", padding: "30px 28px", boxShadow: "0 24px 80px #0004", fontFamily: "system-ui, sans-serif" }}>
        <button type="button" onClick={dismiss} aria-label="Close enquiry form"
          style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, border: 0, borderRadius: 18, background: "#f1f3f6", color: "#223047", fontSize: 22, cursor: "pointer" }}>×</button>
        <p style={{ color: accent, fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>{brand}</p>
        <h2 id={`${id}-title`} style={{ color: "#0b1734", fontSize: 26, lineHeight: 1.2, margin: "0 28px 10px 0", fontWeight: 750 }}>{heading}</h2>
        <p style={{ color: "#536174", fontSize: 14, lineHeight: 1.5, margin: "0 0 20px" }}>Share your details and send your enquiry directly on WhatsApp.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <label htmlFor={`${id}-name`} style={{ fontSize: 13, fontWeight: 700, color: "#25344d" }}>Your name</label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required maxLength={80} placeholder="Full name"
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid #ccd3db", borderRadius: 10, padding: "12px 14px", color: "#0b1734", background: "#fff", fontSize: 16 }} />
          <label htmlFor={`${id}-phone`} style={{ fontSize: 13, fontWeight: 700, color: "#25344d" }}>Mobile number</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={16} placeholder="10-digit mobile number" onInput={(event) => event.currentTarget.setCustomValidity("")}
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid #ccd3db", borderRadius: 10, padding: "12px 14px", color: "#0b1734", background: "#fff", fontSize: 16 }} />
          <button type="submit" style={{ border: 0, borderRadius: 10, background: accent, color: "white", padding: "14px 18px", marginTop: 8, fontSize: 15, fontWeight: 750, cursor: "pointer" }}>Continue to WhatsApp ↗</button>
          <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.45, margin: 0 }}>WhatsApp opens with your message ready. Review it and tap Send to submit your enquiry.</p>
        </form>
      </section>
    </div>, document.body
  );
}
