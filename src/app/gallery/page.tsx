"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ReservationModal from "@/components/ui/ReservationModal";
import { SEED_GALLERY } from "@/data/seed-data";
import { Camera, ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [reservationOpen, setReservationOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Works" },
    { id: "interior", label: "Architecture & Design" },
    { id: "food", label: "Gastronomy" },
    { id: "drinks", label: "Mixology & Cellar" },
    { id: "nightlife", label: "Nocturnal Soul" },
    { id: "events", label: "Events & Vinyl" },
  ];

  const filteredItems = activeCategory === "all"
    ? SEED_GALLERY
    : SEED_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <>
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <main className="pt-28 pb-24 bg-lagos-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-lagos-gold hover:text-lagos-cream transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-lagos-night border border-lagos-gold/30 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-4">
              <Camera className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Visual Chronicle</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-lagos-cream font-bold mb-4">
              The Gallery
            </h1>
            <p className="text-sm sm:text-base text-lagos-cream/70 font-light leading-relaxed">
              Moments of communion, culinary precision, and nocturnal elegance at Road 14 Mall, Lekki Phase 1.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-lagos-gold text-lagos-dark border-lagos-gold"
                    : "bg-lagos-night text-lagos-cream/80 border-lagos-border hover:border-lagos-gold/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Masonry / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isFeature = idx % 5 === 0;
              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden border border-lagos-border/50 bg-lagos-charcoal ${
                    isFeature ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lagos-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-5 left-5 right-5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] uppercase tracking-widest text-lagos-gold font-bold">
                      {item.category}
                    </span>
                    <h2 className="font-serif text-lg text-lagos-cream font-medium">
                      {item.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
      <StickyMobileBar onOpenReservation={() => setReservationOpen(true)} />
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </>
  );
}
