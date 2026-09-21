"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { springSoft } from "@/lib/motion";
import InquiryForm from "./InquiryForm";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentName?: string;
}

export default function InquiryModal({ isOpen, onClose, equipmentName }: InquiryModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Portal target is only available in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("ui-overlay-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("ui-overlay-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-stretch justify-end">
          <motion.div
            className="absolute inset-0 bg-ground/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Equipment inquiry"
            className="relative z-10 flex h-dvh w-full max-w-[480px] flex-col border-l border-line bg-paper shadow-[var(--shadow-pop)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={springSoft}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                Initiate inquiry
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded p-2 text-ink transition-colors hover:bg-sunken"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <InquiryForm equipmentName={equipmentName} tone="drawer" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
