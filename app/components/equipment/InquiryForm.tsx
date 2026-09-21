"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/cn";
import Button from "../ui/Button";

interface InquiryFormProps {
  /** Preselected product name (from an equipment page / card). */
  equipmentName?: string;
  /** Visual density — "drawer" inside the modal, "page" on /contact. */
  tone?: "drawer" | "page";
  onSuccess?: () => void;
}

const FIELD =
  "w-full border-0 border-b border-line-strong bg-transparent py-2 text-[14px] text-ink " +
  "transition-colors placeholder:text-ink-faint focus:border-primary focus:outline-none";

const LABEL =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-ink-faint";

export default function InquiryForm({
  equipmentName,
  tone = "page",
  onSuccess,
}: InquiryFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setSubmitting(true);
    await submitLead("Equipment Inquiry", {
      fullName,
      email,
      phone,
      message,
      product: equipmentName || "General Inquiry",
    });
    setSubmitting(false);
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary-subtle">
          <Check size={26} className="text-primary" />
        </div>
        <h3 className="font-display text-[22px] font-light text-ink">Inquiry received</h3>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-muted">
          Thank you, <span className="font-semibold text-ink">{fullName}</span>. A Regenis
          Life representative will follow up with clinical data, pricing, and availability
          for{" "}
          <span className="font-semibold text-primary">
            {equipmentName || "your enquiry"}
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", tone === "drawer" && "gap-4")}
    >
      {equipmentName && (
        <div className="border border-line bg-sunken px-4 py-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-faint">
            Selected product
          </div>
          <div className="mt-0.5 font-display text-[18px] font-light text-ink">
            {equipmentName}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="iq-name" className={LABEL}>
          Full name *
        </label>
        <input
          id="iq-name"
          type="text"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={FIELD}
          placeholder="Dr. Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="iq-email" className={LABEL}>
          Email address *
        </label>
        <input
          id="iq-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={FIELD}
          placeholder="jane@clinic.com"
        />
      </div>

      <div>
        <label htmlFor="iq-phone" className={LABEL}>
          Phone number *
        </label>
        <input
          id="iq-phone"
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={FIELD}
          placeholder="+91 …"
        />
      </div>

      <div>
        <label htmlFor="iq-message" className={LABEL}>
          Message
        </label>
        <textarea
          id="iq-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(FIELD, "resize-none border border-line bg-raised p-3")}
          placeholder="I'd like clinical data and pricing for…"
        />
      </div>

      <Button type="submit" size="md" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Submit inquiry"}
      </Button>
    </form>
  );
}
