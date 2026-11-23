import Link from "next/link";
import Image from "next/image";
import { SEED_DRINKS } from "@/data/seed-data";
import { formatNaira } from "@/lib/utils";
import { GlassWater, ArrowRight } from "lucide-react";

export default function DrinksSection() {
  return (
    <section id="drinks" className="py-24 sm:py-32 bg-lagos-night relative overflow-hidden border-t border-lagos-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-3">
            <GlassWater className="w-3.5 h-3.5 text-lagos-gold" />
            <span>The Bar & Cellar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-lagos-cream font-bold mb-4">
            Nocturnal Libations
          </h2>
          <p className="text-sm text-lagos-cream/70 font-light leading-relaxed">
            From signature hibiscus reductions and handcrafted botanicals to zero-proof elixirs and prestige vintage champagnes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SEED_DRINKS.map((drink) => (
            <div
              key={drink.id}
              className="group bg-lagos-dark border border-lagos-border/60 hover:border-lagos-gold/40 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-lagos-charcoal">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {drink.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-lagos-night/90 text-lagos-gold text-[10px] uppercase tracking-wider px-2 py-0.5 border border-lagos-gold/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-lagos-muted block mb-1">
                    {drink.category}
                  </span>
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
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="mt-14 text-center">
          <Link
            href="/drinks"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold text-lagos-gold hover:text-lagos-cream transition-colors"
          >
            <span>Explore Complete Beverage & Wine List</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
