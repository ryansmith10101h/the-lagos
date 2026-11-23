"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BUSINESS_INFO, NAV_LINKS } from "@/lib/constants";
import { Menu, X, Phone, MessageSquare, MapPin } from "lucide-react";
import { formatTelLink, getWhatsAppLink } from "@/lib/utils";

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-lagos-dark/95 backdrop-blur-md border-b border-lagos-border/50 py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-lagos-dark/90 via-lagos-dark/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-lagos-cream transition-colors group-hover:text-lagos-gold">
            THE LAGOS
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-lagos-gold font-medium -mt-1">
            Lekki Phase 1
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-lagos-cream/80 hover:text-lagos-gold transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={getWhatsAppLink(
              BUSINESS_INFO.contact.whatsappNumber,
              "Hello THE LAGOS Concierge, I would like to make an inquiry."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-lagos-cream/70 hover:text-lagos-gold transition-colors px-3 py-2"
            title="Chat with Concierge"
          >
            <MessageSquare className="w-3.5 h-3.5 text-lagos-gold" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenReservation}
            className="border border-lagos-gold/60 text-lagos-cream hover:bg-lagos-gold hover:text-lagos-dark px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-none shadow-sm hover:shadow-lagos-gold/20"
          >
            Reserve Table
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={onOpenReservation}
            className="text-[11px] font-bold uppercase tracking-widest bg-lagos-gold text-lagos-dark px-3 py-1.5 rounded-none"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-lagos-cream hover:text-lagos-gold focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-lagos-night/98 backdrop-blur-xl border-b border-lagos-border shadow-2xl px-6 py-8 transition-all animate-fadeIn">
          <div className="flex flex-col space-y-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base uppercase tracking-widest text-lagos-cream/90 hover:text-lagos-gold transition-colors py-1 border-b border-lagos-border/20 font-serif"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation?.();
                }}
                className="w-full bg-lagos-gold text-lagos-dark py-3 text-center uppercase tracking-widest text-xs font-bold transition-all shadow-md"
              >
                Reserve a Table
              </button>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${formatTelLink(BUSINESS_INFO.contact.primaryPhone)}`}
                  className="flex items-center justify-center space-x-2 border border-lagos-border text-lagos-cream/90 py-2.5 text-xs uppercase tracking-wider hover:border-lagos-gold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-lagos-gold" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={getWhatsAppLink(
                    BUSINESS_INFO.contact.whatsappNumber,
                    "Hello THE LAGOS, I would like to make an inquiry."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 border border-lagos-border text-lagos-cream/90 py-2.5 text-xs uppercase tracking-wider hover:border-lagos-gold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="text-center pt-3 text-xs text-lagos-muted flex items-center justify-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-lagos-gold shrink-0" />
                <span className="truncate">{BUSINESS_INFO.location.address}, Lekki Phase 1</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
