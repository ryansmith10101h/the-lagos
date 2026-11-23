"use client";

import { useState } from "react";
import { BUSINESS_INFO } from "@/lib/constants";
import { formatTelLink, getWhatsAppLink } from "@/lib/utils";
import { MapPin, Phone, MessageSquare, Clock, Send, CheckCircle2, AlertCircle, Navigation } from "lucide-react";

export default function LocationContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Private Event / Table Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="location" className="py-24 sm:py-32 bg-lagos-night relative overflow-hidden border-t border-lagos-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-lagos-gold text-xs uppercase tracking-[0.3em] mb-3">
            <MapPin className="w-3.5 h-3.5 text-lagos-gold" />
            <span>Lekki Phase 1 Destination</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-lagos-cream font-bold mb-4">
            Find Us in Lekki
          </h2>
          <p className="text-sm text-lagos-cream/70 font-light leading-relaxed">
            Situated within the prestigious Road 14 Mall along Adebayo Doherty Road. Ample secured parking and dedicated guest concierge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Location & Quick Action Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Address Card */}
            <div className="bg-lagos-dark border border-lagos-border/60 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-lagos-gold font-bold">
                  Physical Address
                </span>
                <h3 className="font-serif text-xl text-lagos-cream font-medium">
                  {BUSINESS_INFO.location.venue}
                </h3>
                <p className="text-sm text-lagos-cream/80 leading-relaxed font-light">
                  {BUSINESS_INFO.location.address}<br />
                  {BUSINESS_INFO.location.area}, {BUSINESS_INFO.location.city}, {BUSINESS_INFO.location.state}
                </p>
                <p className="text-xs text-lagos-gold/90 font-mono pt-1">
                  {BUSINESS_INFO.location.landmark}
                </p>
              </div>

              {/* Fast Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_INFO.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark py-3 px-4 text-xs uppercase tracking-widest font-bold transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={getWhatsAppLink(
                    BUSINESS_INFO.contact.whatsappNumber,
                    "Hello THE LAGOS Concierge, I am on my way / need directions."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 border border-lagos-border hover:border-lagos-gold text-lagos-cream py-3 px-4 text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              {/* Direct Lines */}
              <div className="pt-4 border-t border-lagos-border/40 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-lagos-gold font-bold block">
                  Direct Concierge Lines
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono">
                  <a
                    href={`tel:${formatTelLink(BUSINESS_INFO.contact.primaryPhone)}`}
                    className="flex items-center space-x-2 p-2.5 bg-lagos-night border border-lagos-border text-lagos-cream hover:border-lagos-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-lagos-gold shrink-0" />
                    <span>{BUSINESS_INFO.contact.primaryPhoneDisplay}</span>
                  </a>

                  <a
                    href={`tel:${formatTelLink(BUSINESS_INFO.contact.secondaryPhone)}`}
                    className="flex items-center space-x-2 p-2.5 bg-lagos-night border border-lagos-border text-lagos-cream hover:border-lagos-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-lagos-gold shrink-0" />
                    <span>{BUSINESS_INFO.contact.secondaryPhoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-2 border-t border-lagos-border/40 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-lagos-gold font-bold block flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Operating Hours</span>
                </span>
                <div className="space-y-1.5 text-xs text-lagos-cream/80">
                  {BUSINESS_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-lagos-border/20">
                      <span className="text-lagos-muted">{h.day}</span>
                      <span className="font-medium text-lagos-cream">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-lagos-dark border border-lagos-border/60 p-6 sm:p-10">
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-lagos-gold font-bold block mb-1">
                Concierge Desk
              </span>
              <h3 className="font-serif text-2xl text-lagos-cream font-semibold">
                Send a Message or Private Booking Inquiry
              </h3>
              <p className="text-xs text-lagos-cream/70 font-light mt-1">
                Looking to host a private celebration, corporate brand showcase, or chef&apos;s table experience? Leave a note.
              </p>
            </div>

            {success ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-lagos-gold mx-auto" />
                <h4 className="font-serif text-xl text-lagos-cream font-medium">Message Delivered</h4>
                <p className="text-sm text-lagos-muted max-w-md mx-auto">
                  Thank you, {formState.name}. Our hospitality manager has received your message and will respond within business hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2.5 border border-lagos-gold text-lagos-gold text-xs uppercase tracking-widest font-semibold hover:bg-lagos-gold hover:text-lagos-dark transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Chioma Okeke"
                      className="w-full bg-lagos-night border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="0803 489 5239"
                      className="w-full bg-lagos-night border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="chioma@example.com"
                    className="w-full bg-lagos-night border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                    Inquiry Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-lagos-night border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  >
                    <option value="Table Reservation Inquiry">Table Reservation Inquiry</option>
                    <option value="Private Event / Buyout">Private Event / Venue Buyout</option>
                    <option value="Corporate Hosting">Corporate Hosting & Dinners</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Brand Collaboration / Media">Brand Collaboration / Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your requested dates, guest numbers, or specific preferences..."
                    className="w-full bg-lagos-night border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark text-xs uppercase tracking-[0.2em] font-bold transition-colors inline-flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Delivering..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
