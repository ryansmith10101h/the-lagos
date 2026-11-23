"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ReservationModal from "@/components/ui/ReservationModal";
import HeroSection from "@/components/home/HeroSection";
import StorySection from "@/components/home/StorySection";
import MenuTeaserSection from "@/components/home/MenuTeaserSection";
import DrinksSection from "@/components/home/DrinksSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import EventsTeaserSection from "@/components/home/EventsTeaserSection";
import GalleryTeaserSection from "@/components/home/GalleryTeaserSection";
import LocationContactSection from "@/components/home/LocationContactSection";

export default function HomePage() {
  const [reservationOpen, setReservationOpen] = useState(false);

  const handleOpenReservation = () => setReservationOpen(true);
  const handleCloseReservation = () => setReservationOpen(false);

  return (
    <>
      <Navbar onOpenReservation={handleOpenReservation} />

      <main className="flex-grow">
        {/* 1. Hero */}
        <HeroSection onOpenReservation={handleOpenReservation} />

        {/* 2. Brand Story */}
        <StorySection />

        {/* 3. Culinary Craft Teaser */}
        <MenuTeaserSection onOpenReservation={handleOpenReservation} />

        {/* 4. Nocturnal Libations */}
        <DrinksSection />

        {/* 5. The Experience & Atmosphere */}
        <ExperienceSection />

        {/* 6. Curated Events */}
        <EventsTeaserSection onOpenReservation={handleOpenReservation} />

        {/* 7. Gallery */}
        <GalleryTeaserSection />

        {/* 8. Location & Concierge Desk */}
        <LocationContactSection />
      </main>

      <Footer />

      {/* Sticky Mobile CTAs */}
      <StickyMobileBar onOpenReservation={handleOpenReservation} />

      {/* Reservation Dialog */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={handleCloseReservation}
      />
    </>
  );
}
