"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";
import InquiryModal from "./InquiryModal";

export default function EquipmentInquiryButton({ equipmentName }: { equipmentName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="button" size="lg" onClick={() => setIsOpen(true)}>
        Enquire Now
        <ArrowUpRight size={16} />
      </Button>
      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        equipmentName={equipmentName}
      />
    </>
  );
}
