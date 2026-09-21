"use client";

import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import EquipmentCard from "./EquipmentCard";
import InquiryModal from "./InquiryModal";
import type { Equipment } from "../../data/equipment";

interface PartnerSectionProps {
  equipments: Equipment[];
  /** "partner" → filter chips by manufacturer/partner (default).
   *  "category" → no chips, list is already scoped by the parent. */
  mode?: "partner" | "category";
  initialValue?: string;
}

const ALL = "All Partners";

export default function PartnerSection({
  equipments,
  mode = "partner",
  initialValue,
}: PartnerSectionProps) {
  const initialActive =
    initialValue && equipments.some((eq) => eq.partner === initialValue)
      ? initialValue
      : ALL;

  const [active, setActive] = useState(initialActive);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    equipments.forEach((eq) => {
      if (!seen.has(eq.partner)) seen.set(eq.partner, eq.logo);
    });
    const cats: { name: string; logo?: string }[] = [{ name: ALL }];
    seen.forEach((logo, name) => cats.push({ name, logo }));
    return cats;
  }, [equipments]);

  const filtered =
    mode === "category" || active === ALL
      ? equipments
      : equipments.filter((eq) => eq.partner === active);

  const handleEnquire = (name: string) => {
    setSelected(name);
    setInquiryOpen(true);
  };

  return (
    <section id="showcase" className="min-h-[50vh]">
      {mode === "partner" && (
        <FilterBar
          categories={categories}
          activeCategory={active}
          onSelect={setActive}
        />
      )}

      <div className="flex flex-col">
        {filtered.map((equipment, index) => (
          <EquipmentCard
            key={equipment.id}
            index={index}
            id={equipment.id}
            name={equipment.name}
            tagline={equipment.tagline}
            description={equipment.description}
            image={equipment.image}
            partner={equipment.partner}
            logo={equipment.logo}
            badge={equipment.badge}
            onEnquire={() => handleEnquire(equipment.name)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-32 text-center text-[15px] font-light text-ink-muted">
            No equipment found for this selection.
          </div>
        )}
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        equipmentName={selected}
      />
    </section>
  );
}
