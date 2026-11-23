"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ReservationModal from "@/components/ui/ReservationModal";
import { SEED_CATEGORIES, SEED_MENU_ITEMS } from "@/data/seed-data";
import { formatNaira } from "@/lib/utils";
import { Utensils, Sparkles, ArrowLeft, Calendar } from "lucide-react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [reservationOpen, setReservationOpen] = useState(false);

  const filteredItems = activeCategory === "all"
    ? SEED_MENU_ITEMS
    : SEED_MENU_ITEMS.filter((item) => item.category_id === activeCategory);

  return (
    <>
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      <main className="pt-28 pb-24 bg-lagos-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link & Breadcrumbs */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-lagos-gold hover:text-lagos-cream transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-lagos-night border border-lagos-gold/30 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-4">
              <Utensils className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Gastronomic Portfolio</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-lagos-cream font-bold mb-4">
              The Culinary Menu
            </h1>
            <p className="text-sm sm:text-base text-lagos-cream/70 font-light leading-relaxed">
              Every course is a homage to West African culinary ancestry elevated by contemporary mastery. Prices in Nigerian Naira (₦). Service and VAT applicable.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-16">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-200 border ${
                activeCategory === "all"
                  ? "bg-lagos-gold text-lagos-dark border-lagos-gold"
                  : "bg-lagos-night text-lagos-cream/80 border-lagos-border hover:border-lagos-gold/50"
              }`}
            >
              All Courses ({SEED_MENU_ITEMS.length})
            </button>
            {SEED_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-lagos-gold text-lagos-dark border-lagos-gold"
                    : "bg-lagos-night text-lagos-cream/80 border-lagos-border hover:border-lagos-gold/50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const cat = SEED_CATEGORIES.find((c) => c.id === item.category_id);
              return (
                <div
                  key={item.id}
                  className="group bg-lagos-night border border-lagos-border/60 hover:border-lagos-gold/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
                >
                  {item.image_url && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-lagos-charcoal">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                      />
                      {item.is_featured && (
                        <div className="absolute top-3 right-3 bg-lagos-gold text-lagos-dark px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      {cat && (
                        <span className="text-[10px] uppercase tracking-widest text-lagos-gold/80 font-medium block mb-1">
                          {cat.name}
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="font-serif text-lg text-lagos-cream font-medium group-hover:text-lagos-gold transition-colors">
                          {item.name}
                        </h2>
                        <span className="font-serif text-base text-lagos-gold font-bold shrink-0">
                          {formatNaira(item.price)}
                        </span>
                      </div>
                      <p className="text-xs text-lagos-cream/70 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.dietary_tags && item.dietary_tags.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-lagos-border/30">
                        {item.dietary_tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider text-lagos-muted bg-lagos-surface px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Reservation Callout */}
          <div className="mt-20 p-8 sm:p-12 bg-lagos-night border border-lagos-gold/30 text-center max-w-3xl mx-auto space-y-5">
            <Sparkles className="w-6 h-6 text-lagos-gold mx-auto" />
            <h2 className="font-serif text-2xl sm:text-3xl text-lagos-cream font-semibold">
              Reserve Your Tasting Experience
            </h2>
            <p className="text-xs sm:text-sm text-lagos-cream/70 max-w-xl mx-auto font-light leading-relaxed">
              We recommend reserving tables at least 24 hours in advance for dinner and weekend sittings at Road 14 Mall, Lekki Phase 1.
            </p>
            <button
              onClick={() => setReservationOpen(true)}
              className="inline-flex items-center space-x-2 bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold px-8 py-3.5 uppercase tracking-[0.2em] text-xs transition-colors shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Table Now</span>
            </button>
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
