"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ReservationModal from "@/components/ui/ReservationModal";
import { SEED_EVENTS } from "@/data/seed-data";
import { formatDate, getWhatsAppLink } from "@/lib/utils";
import { BUSINESS_INFO } from "@/lib/constants";
import { Calendar, Clock, Ticket, ArrowLeft, MessageSquare, Sparkles } from "lucide-react";

export default function EventsPage() {
  const [reservationOpen, setReservationOpen] = useState(false);

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
              <Calendar className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Cultural Program</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-lagos-cream font-bold mb-4">
              Curated Events & Sessions
            </h1>
            <p className="text-sm sm:text-base text-lagos-cream/70 font-light leading-relaxed">
              Experience the rhythmic heartbeat of Lagos through vinyl sound showcases, acoustic brunches, guest chef collaborations, and private cultural salons.
            </p>
          </div>

          {/* Events Listings */}
          <div className="space-y-12">
            {SEED_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-lagos-night border border-lagos-border/60 hover:border-lagos-gold/40 transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl"
              >
                {/* Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[260px] bg-lagos-charcoal">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover filter brightness-90"
                  />
                  <div className="absolute top-4 left-4 bg-lagos-gold text-lagos-dark px-3 py-1 text-xs font-bold uppercase tracking-wider font-mono">
                    {formatDate(event.event_date)}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 text-xs text-lagos-gold font-mono mb-2">
                      <Clock className="w-4 h-4 text-lagos-gold" />
                      <span>{event.event_time}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-lagos-cream font-semibold mb-2">
                      {event.title}
                    </h2>

                    {event.subtitle && (
                      <p className="text-sm text-lagos-gold/90 font-medium mb-4">
                        {event.subtitle}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-lagos-cream/75 font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-lagos-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {event.ticket_info && (
                      <div className="flex items-center space-x-2 text-xs text-lagos-muted">
                        <Ticket className="w-4 h-4 text-lagos-gold shrink-0" />
                        <span>{event.ticket_info}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setReservationOpen(true)}
                        className="bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold px-6 py-2.5 text-xs uppercase tracking-widest transition-colors"
                      >
                        Reserve Table
                      </button>

                      <a
                        href={getWhatsAppLink(
                          BUSINESS_INFO.contact.whatsappNumber,
                          `Hello THE LAGOS Concierge, I would like to inquire about guestlist/table for ${event.title}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-lagos-border hover:border-lagos-gold text-lagos-cream text-xs transition-colors"
                        title="Inquire via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 text-green-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Private Venue Buyout Banner */}
          <div className="mt-20 p-8 sm:p-12 bg-lagos-night border border-lagos-gold/30 text-center max-w-3xl mx-auto space-y-4">
            <Sparkles className="w-6 h-6 text-lagos-gold mx-auto" />
            <h2 className="font-serif text-2xl sm:text-3xl text-lagos-cream font-semibold">
              Host a Private Event at THE LAGOS
            </h2>
            <p className="text-xs sm:text-sm text-lagos-cream/70 max-w-xl mx-auto font-light leading-relaxed">
              We host bespoke corporate celebrations, brand launches, birthday galas, and intimate executive dinners with tailored menus, sound engineering, and dedicated security.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppLink(
                  BUSINESS_INFO.contact.whatsappNumber,
                  "Hello THE LAGOS, I would like to inquire about hosting a Private Event / Buyout."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold px-8 py-3 uppercase tracking-widest text-xs transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Event Coordinator</span>
              </a>
            </div>
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
