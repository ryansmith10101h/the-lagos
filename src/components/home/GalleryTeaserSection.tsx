import Link from "next/link";
import Image from "next/image";
import { SEED_GALLERY } from "@/data/seed-data";
import { Camera, ArrowRight } from "lucide-react";

export default function GalleryTeaserSection() {
  return (
    <section className="py-24 sm:py-32 bg-lagos-dark relative overflow-hidden border-t border-lagos-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-3">
              <Camera className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Visual Chronicle</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-lagos-cream font-bold">
              Moments at THE LAGOS
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold text-lagos-gold hover:text-lagos-cream transition-colors"
          >
            <span>View Full Editorial Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_GALLERY.map((item, idx) => {
            const isSpan = idx === 0 || idx === 4;
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden border border-lagos-border/40 ${
                  isSpan ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lagos-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-lagos-gold font-bold">
                    {item.category}
                  </span>
                  <p className="font-serif text-base text-lagos-cream font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
