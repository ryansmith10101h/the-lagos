import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function StorySection() {
  return (
    <section id="story" className="py-24 sm:py-32 bg-lagos-night relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute -top-12 -right-12 select-none opacity-5 pointer-events-none">
        <span className="font-serif text-[18vw] leading-none font-black text-lagos-cream">
          EKO
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetrical Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden shadow-2xl border border-lagos-border/50">
              <Image
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80"
                alt="THE LAGOS Dining Experience in Lekki Phase 1"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lagos-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg text-lagos-cream italic">
                  “Lagos is not merely a geographic coordinate. It is an unyielding pulse.”
                </p>
                <p className="text-xs uppercase tracking-widest text-lagos-gold mt-1">
                  The Sanctuary at Adebayo Doherty
                </p>
              </div>
            </div>

            {/* Overlapping Offset Detail Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 w-52 bg-lagos-charcoal border border-lagos-gold/40 p-5 shadow-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-lagos-gold font-bold block mb-1">
                Lekki Phase 1
              </span>
              <p className="text-xs text-lagos-cream/80 leading-snug">
                Road 14 Mall, Plot 153B Adebayo Doherty Road
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em]">
              <Compass className="w-4 h-4 text-lagos-gold" />
              <span>The Lagos Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-lagos-cream font-bold leading-tight">
              A Cultural Sanctuary <br />
              <span className="text-lagos-gold">Where Cosmopolitan Energy</span> Meets Culinary Art.
            </h2>

            <div className="space-y-4 text-lagos-cream/70 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Born from an uncompromising adoration for Lagos—its audacity, its rhythm, its warmth, and its magnetic hospitality—<strong>THE LAGOS</strong> is envisioned as an elevated gathering ground in the heart of Lekki Phase 1.
              </p>
              <p>
                We unite the soul of ancestral West African culinary craft with contemporary fine dining precision. From the rich aroma of firewood-charred spices to carefully curated soundscapes and nocturnal cocktail artistry, every corner is designed for conversation and communion.
              </p>
              <p>
                Whether seeking an intimate dinner, an afternoon business sanctuary, or the soulful pulse of our weekend vinyl sessions, this is where Lagos comes together.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/menu"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold text-lagos-gold hover:text-lagos-cream transition-colors group"
              >
                <span>Discover the Menu</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-medium text-lagos-cream/60 hover:text-lagos-gold transition-colors"
              >
                <span>Curated Events</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
