"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { submitLead } from "@/lib/leads";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentName?: string;
}

export default function InquiryModal({ isOpen, onClose, equipmentName }: InquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      return;
    }

    setIsSubmitting(true);
    await submitLead("Equipment Inquiry", {
      fullName,
      email,
      phone,
      message,
      product: equipmentName || "General Inquiry",
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    // Reset state when closing
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setIsSubmitted(false);
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end font-inter overflow-hidden">
          {/* Backdrop blur overlay */}
          <motion.div 
            className="absolute inset-0 bg-[#141414]/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />
          
          {/* Modal Panel */}
          <motion.div 
            className="relative w-full max-w-[500px] h-screen bg-white flex flex-col border-l border-[#262626]/[0.12] shadow-2xl overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626]/[0.12]">
              <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#262626]">
                {isSubmitted ? "Inquiry Confirmed" : "Initiate Inquiry"}
              </div>
              <button 
                onClick={handleClose} 
                className="p-2 transition-colors hover:bg-[#262626]/5 rounded-none"
              >
                <X size={20} className="text-[#262626]" />
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1c69d4]/10 border border-[#1c69d4]/20 flex items-center justify-center mb-6">
                    <Check size={28} className="text-[#1c69d4]" />
                  </div>
                  <h3 className="text-xl font-medium text-[#262626] uppercase tracking-wide mb-3">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#757575] leading-relaxed max-w-sm">
                    Thank you, <span className="font-semibold text-[#262626]">{fullName}</span>. A Regenis Life representative will reach out to you within the next 2 hours with clinical data, pricing, and availability details for <span className="font-semibold text-[#1c69d4]">{equipmentName || "your selected product"}</span>.
                  </p>
                  
                  <button
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 border border-[#262626] hover:bg-[#262626] hover:text-white transition-colors text-[11px] font-bold tracking-widest uppercase"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex-1 flex flex-col min-h-0 overflow-hidden"
                >
                  {/* Body */}
                  <div className="px-6 py-4 flex-1 overflow-y-auto min-h-0">
                    {equipmentName && (
                      <div className="mb-4 p-4 bg-[#f8f8f8] border border-[#262626]/[0.08]">
                        <div className="text-[10px] text-[#757575] font-bold uppercase tracking-[0.1em] mb-1">
                          Selected Product
                        </div>
                        <div className="text-xl font-light text-[#262626] uppercase">
                          {equipmentName}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] text-[#757575] mb-1.5 uppercase">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-transparent border-b border-[#262626]/20 py-2 text-[14px] text-[#262626] placeholder-[#bbbbbb] focus:outline-none focus:border-[#1c69d4] transition-colors rounded-none" 
                          placeholder="Dr. John Doe" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] text-[#757575] mb-1.5 uppercase">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-[#262626]/20 py-2 text-[14px] text-[#262626] placeholder-[#bbbbbb] focus:outline-none focus:border-[#1c69d4] transition-colors rounded-none" 
                          placeholder="john@clinic.com" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] text-[#757575] mb-1.5 uppercase">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent border-b border-[#262626]/20 py-2 text-[14px] text-[#262626] placeholder-[#bbbbbb] focus:outline-none focus:border-[#1c69d4] transition-colors rounded-none" 
                          placeholder="+91..." 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] text-[#757575] mb-1.5 uppercase">Message</label>
                        <textarea 
                          rows={2} 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-[#f8f8f8] border border-[#262626]/10 p-3 text-[14px] text-[#262626] placeholder-[#bbbbbb] focus:outline-none focus:border-[#1c69d4] transition-colors resize-none rounded-none" 
                          placeholder="I would like to receive clinical data and pricing..." 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-[#262626]/[0.12] bg-[#f8f8f8]">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#262626] text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-[#1c69d4] transition-colors rounded-none border-none shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(28,105,212,0.23)] flex items-center justify-center gap-2 disabled:bg-[#757575]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : "Submit Inquiry"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
