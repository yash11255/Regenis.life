"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import InquiryModal from "./InquiryModal";

interface EquipmentInquiryButtonProps {
  equipmentName: string;
}

export default function EquipmentInquiryButton({ equipmentName }: EquipmentInquiryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cta-btn"
        style={{ border: 0, cursor: "pointer", fontFamily: "inherit" }}
      >
        Enquire Now
        <ArrowUpRight size={16} />
      </button>
      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        equipmentName={equipmentName}
      />
    </>
  );
}
