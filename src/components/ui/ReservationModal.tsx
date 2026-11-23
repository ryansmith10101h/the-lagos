"use client";

import { useState } from "react";
import { X, Calendar, Clock, Users, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    reservation_date: "",
    reservation_time: "19:30",
    guest_count: 2,
    occasion: "Dining",
    special_requests: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit reservation.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = `*RESERVATION REQUEST - THE LAGOS*\n\nName: ${formData.full_name}\nDate: ${formData.reservation_date}\nTime: ${formData.reservation_time}\nGuests: ${formData.guest_count}\nOccasion: ${formData.occasion}\nPhone: ${formData.phone}\n${formData.special_requests ? `Requests: ${formData.special_requests}` : ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-lagos-night border border-lagos-border shadow-2xl z-10 my-8 overflow-hidden rounded-none">
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-lagos-border bg-lagos-charcoal/40">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-lagos-gold font-semibold">
              Table Reservation
            </span>
            <h2 className="font-serif text-2xl text-lagos-cream">THE LAGOS Sanctuary</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-2 text-lagos-muted hover:text-lagos-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-lagos-gold/10 border border-lagos-gold flex items-center justify-center text-lagos-gold">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-lagos-cream">Reservation Received</h3>
              <p className="text-sm text-lagos-muted max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-lagos-cream">{formData.full_name}</strong>. Your reservation request for{" "}
                <span className="text-lagos-gold">{formData.guest_count} guests</span> on{" "}
                <span className="text-lagos-cream font-medium">{formData.reservation_date} at {formData.reservation_time}</span> has been logged.
                Our concierge desk will confirm via WhatsApp or SMS.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppLink(BUSINESS_INFO.contact.whatsappNumber, whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Instant WhatsApp Alert</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-lagos-border text-lagos-cream hover:bg-lagos-surface text-xs uppercase tracking-widest font-medium"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Tunde Adeyemi"
                    className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                    Phone (Nigerian / Intl) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0810 382 7988"
                    className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tunde@example.com"
                    className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="40"
                      required
                      value={formData.guest_count}
                      onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value, 10) || 1 })}
                      className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream pl-3.5 pr-10 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                    />
                    <Users className="w-4 h-4 text-lagos-muted absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                    Reservation Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.reservation_time}
                    onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                    className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Afternoon)</option>
                    <option value="16:00">04:00 PM (Late Lunch)</option>
                    <option value="18:00">06:00 PM (Sundowner)</option>
                    <option value="19:30">07:30 PM (Prime Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Nocturnal Dining)</option>
                    <option value="22:30">10:30 PM (Late Night Lounge)</option>
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                >
                  <option value="Casual Dining">Casual Dining & Drinks</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Business Meeting / Dinner">Business Dinner</option>
                  <option value="Date Night">Date Night / Anniversary</option>
                  <option value="Private VIP Lounge Booking">Private VIP Lounge</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1.5 font-medium">
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="Seating preferences (e.g. terrace, booth), allergies, cake arrangement..."
                  className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2 text-sm focus:border-lagos-gold focus:outline-none resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold py-3.5 uppercase tracking-[0.2em] text-xs transition-all disabled:opacity-50"
                >
                  {loading ? "Confirming Table..." : "Request Reservation"}
                </button>

                <p className="text-[11px] text-lagos-muted text-center leading-relaxed">
                  For immediate assistance or parties larger than 12, call{" "}
                  <a href={`tel:${BUSINESS_INFO.contact.primaryPhone}`} className="text-lagos-gold underline">
                    {BUSINESS_INFO.contact.primaryPhoneDisplay}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
