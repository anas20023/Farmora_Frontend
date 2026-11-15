"use client";

import { useState } from "react";
import type { ContactPageData, OfficeLocation } from "@/types/contact";
import ContactHero from "./ContactHero";
import ContactFormCard from "./ContactFormCard";
import InfoCardsGrid from "./InfoCardsGrid";
import MapSection from "./MapSection";
import FaqSection from "./FaqSection";

interface ContactClientProps {
  data: ContactPageData;
}

export default function ContactClient({ data }: ContactClientProps) {
  const { hero, phones, emails, workingHours, offices, faqs } = data;
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(offices[0]);

  const handleSelectOffice = (office: OfficeLocation) => {
    setSelectedOffice(office);
    // Smooth scroll to map section if clicked on mobile or small devices
    const mapElement = document.getElementById("interactive-map-section");
    if (mapElement && window.innerWidth < 768) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex w-full flex-col bg-background text-foreground transition-colors duration-200">
      {/* 1. Hero Section */}
      <ContactHero hero={hero} />

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 space-y-12 sm:space-y-16">
        {/* 2. Main Two-Column Layout: Contact Form & Info Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Column: Form Card (7 cols on lg) */}
          <div className="w-full lg:col-span-7">
            <ContactFormCard />
          </div>

          {/* Right Column: Support & Physical Address Cards Grid (5 cols on lg) */}
          <div className="w-full lg:col-span-5">
            <InfoCardsGrid
              phones={phones}
              emails={emails}
              workingHours={workingHours}
              offices={offices}
              onSelectOffice={handleSelectOffice}
              selectedOfficeId={selectedOffice.id}
            />
          </div>
        </div>

        {/* 3. Interactive Map Section */}
        <div id="interactive-map-section" className="w-full">
          <MapSection
            offices={offices}
            selectedOffice={selectedOffice}
            onSelectOffice={handleSelectOffice}
          />
        </div>

        {/* 4. FAQ Accordion Section */}
        <div className="w-full">
          <FaqSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
