import Link from "next/link";
import { BUSINESS_INFO, NAV_LINKS } from "@/lib/constants";
import { MapPin, Phone, Mail, Instagram, ArrowUpRight, Clock } from "lucide-react";
import { formatTelLink, getWhatsAppLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-lagos-night border-t border-lagos-border/60 text-lagos-cream/80 pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-widest text-lagos-cream">
                THE LAGOS
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-lagos-gold font-medium mt-1">
                Lekki Phase 1, Lagos
              </p>
            </Link>
            <p className="text-sm text-lagos-muted leading-relaxed font-light">
              Where Lagos comes to life. A culinary and cultural sanctuary celebrating modern West African cosmopolitan lifestyle, elevated gastronomy, and nocturnal elegance.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-lagos-border text-lagos-gold hover:bg-lagos-gold hover:text-lagos-dark transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink(
                  BUSINESS_INFO.contact.whatsappNumber,
                  "Hello THE LAGOS Concierge"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-lagos-gold hover:underline tracking-wider uppercase font-medium"
              >
                <span>WhatsApp VIP Concierge</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-[0.25em] text-lagos-gold mb-5">
              Explore
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-widest">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-lagos-gold transition-colors text-lagos-cream/70"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="hover:text-lagos-gold transition-colors text-lagos-cream/40 text-[10px]"
                >
                  Portal Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-[0.25em] text-lagos-gold mb-5">
              Location & Contact
            </h3>
            <div className="space-y-3 text-sm font-light text-lagos-cream/80">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-lagos-gold shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-lagos-cream">{BUSINESS_INFO.location.venue}</p>
                  <p>{BUSINESS_INFO.location.address}</p>
                  <p>{BUSINESS_INFO.location.area}, {BUSINESS_INFO.location.city}</p>
                  <a
                    href={BUSINESS_INFO.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-lagos-gold hover:underline mt-1 font-normal tracking-wide"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Phone className="w-4 h-4 text-lagos-gold shrink-0 mt-1" />
                <div className="text-xs space-y-1">
                  <a
                    href={`tel:${formatTelLink(BUSINESS_INFO.contact.primaryPhone)}`}
                    className="block hover:text-lagos-gold transition-colors font-mono"
                  >
                    {BUSINESS_INFO.contact.primaryPhoneDisplay}
                  </a>
                  <a
                    href={`tel:${formatTelLink(BUSINESS_INFO.contact.secondaryPhone)}`}
                    className="block hover:text-lagos-gold transition-colors font-mono"
                  >
                    {BUSINESS_INFO.contact.secondaryPhoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-lagos-gold shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="text-xs hover:text-lagos-gold transition-colors"
                >
                  {BUSINESS_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-[0.25em] text-lagos-gold mb-5 flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Opening Hours</span>
            </h3>
            <div className="space-y-3 text-xs text-lagos-cream/80">
              {BUSINESS_INFO.hours.map((item, idx) => (
                <div key={idx} className="border-b border-lagos-border/30 pb-2">
                  <p className="text-lagos-cream/50 uppercase tracking-wider text-[10px]">
                    {item.day}
                  </p>
                  <p className="font-medium text-lagos-cream">{item.time}</p>
                </div>
              ))}
              <p className="text-[11px] text-lagos-muted italic pt-1">
                Kitchen closes 45 minutes prior to venue closing time.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-lagos-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-lagos-muted">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Lekki Phase 1, Lagos, Nigeria.</p>
          <p className="mt-3 sm:mt-0 tracking-wider uppercase text-[10px]">
            Designed for authentic Nigerian Hospitality & Lifestyle
          </p>
        </div>
      </div>
    </footer>
  );
}
