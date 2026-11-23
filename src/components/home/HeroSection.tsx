import Link from "next/link";
import Image from "next/image";
import { BUSINESS_INFO } from "@/lib/constants";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export default function HeroSection({ onOpenReservation }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-lagos-dark">
      {/* Background Cinematic Image with editorial dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
          alt="THE LAGOS Restaurant & Lounge Interior Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-pulse-slow filter brightness-[0.4] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lagos-dark via-lagos-dark/60 to-lagos-dark/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,12,16,0.8)_100%)]" />
      </div>

      {/* Editorial Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16 flex flex-col items-center">
        
        {/* Subtle Lagos pill tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-lagos-gold/30 bg-lagos-night/60 backdrop-blur-md mb-6 sm:mb-8 text-lagos-gold text-xs uppercase tracking-[0.3em]">
          <Sparkles className="w-3.5 h-3.5 text-lagos-gold animate-spin-slow" />
          <span>Lekki Phase 1 • Adebayo Doherty Road</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-lagos-cream font-bold leading-none uppercase mb-6 sm:mb-8 select-none">
          THIS IS <br className="hidden sm:inline" />
          <span className="gold-gradient-text tracking-wide">LAGOS.</span>
        </h1>

        {/* Sub-editorial copy */}
        <p className="max-w-2xl text-base sm:text-xl text-lagos-cream/80 font-light leading-relaxed mb-10 sm:mb-12 font-sans tracking-wide">
          Where Lagos comes to life. An intimate fusion of elevated West African cuisine, bespoke mixology, and nocturnal rhythm at Road 14 Mall.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/#story"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-lagos-cream/40 text-lagos-cream hover:border-lagos-gold hover:text-lagos-gold uppercase tracking-[0.25em] text-xs font-semibold transition-all duration-300 text-center"
          >
            Explore
          </Link>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-9 py-4 bg-lagos-gold text-lagos-dark hover:bg-lagos-bronze uppercase tracking-[0.25em] text-xs font-bold transition-all duration-300 shadow-xl shadow-lagos-gold/10"
          >
            Reserve a Table
          </button>
        </div>

        {/* Location pill indicator */}
        <div className="mt-12 sm:mt-16 flex items-center space-x-2 text-xs text-lagos-muted tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-lagos-gold" />
          <span>Road 14 Mall, Plot 153B Adebayo Doherty Road</span>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#story"
        aria-label="Scroll down to Story"
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center space-y-2 text-lagos-cream/40 hover:text-lagos-gold transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
