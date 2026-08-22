"use client";

import React, { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import EquipmentCard from "./EquipmentCard";
import InquiryModal from "./InquiryModal";

export interface Equipment {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  partner: string;
  logo: string;
  isExclusive?: boolean;
  badge?: string;
}

interface PartnerSectionProps {
  equipments: Equipment[];
  initialCategory?: string;
}

export default function PartnerSection({ equipments, initialCategory }: PartnerSectionProps) {
  const initialActiveCategory = initialCategory && equipments.some((eq) => eq.partner === initialCategory)
    ? initialCategory
    : "All Partners";
  const [activeCategory, setActiveCategory] = useState(initialActiveCategory);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string | undefined>();

  const categories = useMemo(() => {
    const uniquePartners = new Map<string, string>();
    equipments.forEach((eq) => {
      if (!uniquePartners.has(eq.partner)) {
        uniquePartners.set(eq.partner, eq.logo);
      }
    });

    const cats: { name: string; logo?: string }[] = [{ name: "All Partners" }];
    uniquePartners.forEach((logo, name) => {
      cats.push({ name, logo });
    });
    return cats;
  }, [equipments]);

  const filteredEquipment =
    activeCategory === "All Partners"
      ? equipments
      : equipments.filter((eq) => eq.partner === activeCategory);

  const handleEnquire = (equipmentName: string) => {
    setSelectedEquipment(equipmentName);
    setInquiryModalOpen(true);
  };

  return (
    <section id="showcase" className="bg-[#0b1b2f] text-[#eef5ff] font-sans antialiased min-h-[60vh]">
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="flex flex-col">
        {filteredEquipment.map((equipment, index) => (
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
            isExclusive={equipment.isExclusive}
            badge={equipment.badge}
            onEnquire={() => handleEnquire(equipment.name)}
          />
        ))}
        {filteredEquipment.length === 0 && (
            <div className="py-32 text-center text-[#a8b8ca] font-light text-lg">
            No equipment found for this selection.
          </div>
        )}
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        equipmentName={selectedEquipment}
      />
    </section>
  );
}
