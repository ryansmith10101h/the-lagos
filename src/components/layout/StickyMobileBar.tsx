"use client";

import { BUSINESS_INFO } from "@/lib/constants";
import { formatTelLink, getWhatsAppLink } from "@/lib/utils";
import { Calendar, MessageSquare, Phone, Navigation } from "lucide-react";

interface StickyMobileBarProps {
  onOpenReservation: () => void;
}

export default function StickyMobileBar({ onOpenReservation }: StickyMobileBarProps) {
  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-lagos-dark/95 backdrop-blur-lg border-t border-lagos-gold/30 px-3 py-2.5 lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* Reserve */}
        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-lagos-gold text-lagos-dark font-bold rounded hover:bg-lagos-bronze transition-colors"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider">Reserve</span>
        </button>

        {/* WhatsApp */}
        <a
          href={getWhatsAppLink(
            BUSINESS_INFO.contact.whatsappNumber,
            "Hello THE LAGOS Concierge, I would like to reserve a table / ask a question."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-lagos-surface border border-lagos-border text-green-400 hover:text-green-300 rounded transition-colors"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider text-lagos-cream">WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${formatTelLink(BUSINESS_INFO.contact.primaryPhone)}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-lagos-surface border border-lagos-border text-lagos-gold rounded transition-colors"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider text-lagos-cream">Call Now</span>
        </a>

        {/* Directions */}
        <a
          href={BUSINESS_INFO.location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 bg-lagos-surface border border-lagos-border text-lagos-gold rounded transition-colors"
        >
          <Navigation className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider text-lagos-cream">Directions</span>
        </a>
      </div>
    </aside>
  );
}
