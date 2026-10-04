import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { FacilitiesGrid } from './FacilitiesGrid';
import { BadmintonSpotlight } from './BadmintonSpotlight';
import { ArenaSpotlight } from './ArenaSpotlight';
import { GymSpotlight } from './GymSpotlight';
import { PoolSpotlight } from './PoolSpotlight';
import { EventsSpotlight } from './EventsSpotlight';
import { WhyUs } from './WhyUs';
import { GallerySection } from './GallerySection';
import { ReviewsSection } from './ReviewsSection';
import { LocationSection } from './LocationSection';
import { EnquiryModal } from './EnquiryModal';
import { Footer } from './Footer';

interface PublicWebsiteProps {
  onOpenAdmin: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onOpenAdmin }) => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (facilityName?: string) => {
    setSelectedFacility(facilityName);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sticky Navigation */}
      <Navbar 
        onOpenEnquiry={() => handleOpenEnquiry()} 
        onOpenAdmin={onOpenAdmin} 
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenEnquiry={() => handleOpenEnquiry()} />
        <About />
        <FacilitiesGrid onOpenEnquiry={handleOpenEnquiry} />
        <BadmintonSpotlight onOpenEnquiry={handleOpenEnquiry} />
        <ArenaSpotlight onOpenEnquiry={handleOpenEnquiry} />
        <GymSpotlight onOpenEnquiry={handleOpenEnquiry} />
        <PoolSpotlight onOpenEnquiry={handleOpenEnquiry} />
        <EventsSpotlight onOpenEnquiry={handleOpenEnquiry} />
        <WhyUs />
        <GallerySection />
        <ReviewsSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />

      {/* Interactive Booking & Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        preselectedFacility={selectedFacility}
      />
    </div>
  );
};
