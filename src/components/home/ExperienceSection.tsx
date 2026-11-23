import Image from "next/image";
import { Sparkles, Music, Shield, Wine } from "lucide-react";

export default function ExperienceSection() {
  const pillars = [
    {
      icon: Music,
      title: "Curated Soundscapes",
      description: "From mid-tempo Afrobeat and vinyl classics to deep Afro-house and soulful acoustic jazz.",
    },
    {
      icon: Wine,
      title: "Sommelier & Mixology",
      description: "Bespoke libations infused with native West African botanicals and premier cellared vintages.",
    },
    {
      icon: Shield,
      title: "VIP & Private Dining",
      description: "Discreet sanctuaries, private dining suites, and attentive concierge service for discerning gatherings.",
    },
    {
      icon: Sparkles,
      title: "Lekki Nocturnal Energy",
      description: "An intoxicating blend of Lagos cosmopolitan chic, warm lighting, and captivating social atmosphere.",
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 bg-lagos-dark relative overflow-hidden border-t border-lagos-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Pillars text */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-lagos-gold text-xs uppercase tracking-[0.3em] font-medium block mb-3">
                The Atmosphere
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-lagos-cream font-bold leading-tight">
                Designed for Conversation, Indulgence & Rhythm.
              </h2>
            </div>

            <p className="text-sm text-lagos-cream/70 font-light leading-relaxed">
              Every detail at <strong>THE LAGOS</strong> is intentionally calibrated. Textured bronze accents, ambient amber lighting, rich upholstery, and sound architecture designed to invite connection without shouting over the beat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={idx} className="space-y-2 border-l border-lagos-gold/40 pl-4 py-1">
                    <div className="flex items-center space-x-2 text-lagos-gold">
                      <IconComponent className="w-4 h-4" />
                      <h3 className="font-serif text-sm font-semibold text-lagos-cream">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-lagos-cream/60 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Architectural imagery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-lagos-border/50 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Architectural Bar Detail"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
              </div>
              <div className="relative aspect-square w-full overflow-hidden border border-lagos-border/50 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
                  alt="Cocktail Glassware Craft"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative aspect-square w-full overflow-hidden border border-lagos-border/50 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                  alt="Prime Dining Cut"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-lagos-border/50 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                  alt="Nocturnal Lounge Glow"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
