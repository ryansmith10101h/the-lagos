import Link from "next/link";
import Image from "next/image";
import { SEED_EVENTS } from "@/data/seed-data";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Ticket, ArrowRight } from "lucide-react";

interface EventsTeaserSectionProps {
  onOpenReservation: () => void;
}

export default function EventsTeaserSection({ onOpenReservation }: EventsTeaserSectionProps) {
  return (
    <section id="events" className="py-24 sm:py-32 bg-lagos-night relative overflow-hidden border-t border-lagos-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-3">
              <Calendar className="w-3.5 h-3.5 text-lagos-gold" />
              <span>Gatherings & Culture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-lagos-cream font-bold">
              Upcoming Events
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold text-lagos-gold hover:text-lagos-cream transition-colors"
          >
            <span>View All Curated Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SEED_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="group bg-lagos-dark border border-lagos-border/60 hover:border-lagos-gold/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-lagos-charcoal">
                <Image
                  src={evt.image_url}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute top-3 left-3 bg-lagos-gold text-lagos-dark px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider font-mono">
                  {formatDate(evt.event_date)}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-lagos-muted mb-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-lagos-gold" />
                    <span>{evt.event_time}</span>
                  </div>

                  <h3 className="font-serif text-xl text-lagos-cream font-semibold group-hover:text-lagos-gold transition-colors mb-1.5">
                    {evt.title}
                  </h3>

                  {evt.subtitle && (
                    <p className="text-xs text-lagos-gold/90 font-medium mb-3">
                      {evt.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-lagos-cream/70 font-light leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-lagos-border/40 flex items-center justify-between">
                  {evt.ticket_info && (
                    <div className="flex items-center space-x-1.5 text-[11px] text-lagos-muted">
                      <Ticket className="w-3.5 h-3.5 text-lagos-gold shrink-0" />
                      <span className="truncate max-w-[170px]">{evt.ticket_info}</span>
                    </div>
                  )}

                  <button
                    onClick={onOpenReservation}
                    className="text-xs font-bold uppercase tracking-widest text-lagos-gold hover:text-lagos-cream shrink-0 transition-colors"
                  >
                    RSVP / Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
