import Link from "next/link";
import Image from "next/image";
import { SEED_MENU_ITEMS, SEED_CATEGORIES } from "@/data/seed-data";
import { formatNaira } from "@/lib/utils";
import { Utensils, ArrowRight } from "lucide-react";

interface MenuTeaserSectionProps {
  onOpenReservation: () => void;
}

export default function MenuTeaserSection({ onOpenReservation }: MenuTeaserSectionProps) {
  // Select 6 featured items
  const featuredItems = SEED_MENU_ITEMS.slice(0, 6);

  return (
    <section className="py-24 sm:py-32 bg-lagos-dark border-t border-lagos-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-3">
              <Utensils className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Gastronomy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-lagos-cream font-bold">
              The Culinary Craft
            </h2>
          </div>
          <p className="max-w-md text-sm text-lagos-cream/60 leading-relaxed font-light">
            Indulge in charcoal-kissed grills, slow-simmered heritage classics, and contemporary coastal flavors seasoned with authentic local botanicals.
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => {
            const category = SEED_CATEGORIES.find((c) => c.id === item.category_id);
            return (
              <div
                key={item.id}
                className="group bg-lagos-night border border-lagos-border/50 hover:border-lagos-gold/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Image */}
                {item.image_url && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-lagos-charcoal">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                    />
                    {item.dietary_tags && item.dietary_tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.dietary_tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-lagos-dark/90 backdrop-blur-sm text-lagos-gold text-[10px] uppercase tracking-wider px-2 py-0.5 border border-lagos-gold/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg text-lagos-cream font-medium group-hover:text-lagos-gold transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-base text-lagos-gold font-bold shrink-0">
                        {formatNaira(item.price)}
                      </span>
                    </div>
                    {category && (
                      <span className="text-[10px] uppercase tracking-widest text-lagos-muted block mb-2">
                        {category.name}
                      </span>
                    )}
                    <p className="text-xs text-lagos-cream/70 leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 border border-lagos-gold text-lagos-gold hover:bg-lagos-gold hover:text-lagos-dark text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-3.5 bg-lagos-surface hover:bg-lagos-border text-lagos-cream text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
          >
            Reserve Your Dining Table
          </button>
        </div>

      </div>
    </section>
  );
}
