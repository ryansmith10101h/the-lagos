"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ReservationModal from "@/components/ui/ReservationModal";
import { SEED_DRINKS } from "@/data/seed-data";
import { formatNaira, getWhatsAppLink } from "@/lib/utils";
import { BUSINESS_INFO } from "@/lib/constants";
import { GlassWater, ArrowLeft, MessageSquare } from "lucide-react";

export default function DrinksPage() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const categories = Array.from(new Set(SEED_DRINKS.map((d) => d.category)));

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
              <GlassWater className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Beverage Anthology</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-lagos-cream font-bold mb-4">
              Drinks, Mixology & Wine
            </h1>
            <p className="text-sm sm:text-base text-lagos-cream/70 font-light leading-relaxed">
              Curated artisanal spirits, bespoke botanical infusions, handcrafted non-alcoholic mocktails, and rare reserve champagne selections.
            </p>
          </div>

          {/* Grouped by category */}
          <div className="space-y-16">
            {categories.map((catName) => {
              const drinksInCat = SEED_DRINKS.filter((d) => d.category === catName);
              return (
                <div key={catName} className="space-y-6">
                  <div className="border-b border-lagos-gold/30 pb-3 flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-lagos-gold font-semibold tracking-wide">
                      {catName}
                    </h2>
                    <span className="text-xs uppercase tracking-widest text-lagos-muted font-mono">
                      {drinksInCat.length} Selection{drinksInCat.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {drinksInCat.map((drink) => (
                      <div
                        key={drink.id}
                        className="group bg-lagos-night border border-lagos-border/60 hover:border-lagos-gold/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-lagos-charcoal">
                          <Image
                            src={drink.image}
                            alt={drink.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                          />
                        </div>

                        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-serif text-lg text-lagos-cream font-medium group-hover:text-lagos-gold transition-colors">
                                {drink.name}
                              </h3>
                              <span className="font-serif text-sm text-lagos-gold font-bold shrink-0">
                                {formatNaira(drink.price)}
                              </span>
                            </div>
                            <p className="text-xs text-lagos-cream/70 font-light leading-relaxed">
                              {drink.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-lagos-border/30">
                            {drink.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] uppercase tracking-wider text-lagos-gold/90 bg-lagos-dark px-2 py-0.5 border border-lagos-border"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottle Service & Sommelier Consultation */}
          <div className="mt-20 p-8 sm:p-10 bg-lagos-night border border-lagos-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-serif text-xl text-lagos-cream font-medium">
                VIP Bottle Service & Private Cellar Inquiries
              </h3>
              <p className="text-xs sm:text-sm text-lagos-muted max-w-xl font-light">
                For rare vintages, magnum reserves, or tailored sommelier pairings for private dinner events in Lekki Phase 1.
              </p>
            </div>
            <a
              href={getWhatsAppLink(
                BUSINESS_INFO.contact.whatsappNumber,
                "Hello THE LAGOS Concierge, I would like to inquire about VIP Bottle Service / Cellar Reserve."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold px-6 py-3 text-xs uppercase tracking-widest transition-colors shrink-0 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Sommelier</span>
            </a>
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
