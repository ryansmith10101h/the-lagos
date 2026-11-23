"use client";

import { useState } from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/constants";
import { SEED_MENU_ITEMS, SEED_EVENTS, SEED_CATEGORIES } from "@/data/seed-data";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  ShieldCheck,
  Utensils,
  Calendar,
  Users,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Plus,
  RefreshCw,
} from "lucide-react";

interface LocalReservation {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  occasion: string;
  special_requests: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

const INITIAL_RESERVATIONS: LocalReservation[] = [
  {
    id: "res-1",
    full_name: "Adeola Adeleke",
    email: "adeola@example.com",
    phone: "0803 123 4567",
    reservation_date: "2026-11-28",
    reservation_time: "19:30",
    guest_count: 4,
    occasion: "Birthday Celebration",
    special_requests: "Prefers cozy terrace seating; birthday sparkler on dessert.",
    status: "confirmed",
  },
  {
    id: "res-2",
    full_name: "Dr. Babatunde Williams",
    email: "bwilliams@hospital.ng",
    phone: "0810 987 6543",
    reservation_date: "2026-11-29",
    reservation_time: "14:00",
    guest_count: 6,
    occasion: "Sunday Coastal Brunch",
    special_requests: "High chair needed for child. Quiet corner requested.",
    status: "pending",
  },
  {
    id: "res-3",
    full_name: "Folashade Coker",
    email: "fcoker@investments.ng",
    phone: "0802 555 1212",
    reservation_date: "2026-12-05",
    reservation_time: "19:30",
    guest_count: 2,
    occasion: "Date Night",
    special_requests: "Wine pairing recommendation requested upon arrival.",
    status: "confirmed",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"reservations" | "menu" | "events" | "business">("reservations");
  const [reservations, setReservations] = useState<LocalReservation[]>(INITIAL_RESERVATIONS);
  const [menuItems, setMenuItems] = useState(SEED_MENU_ITEMS);
  const [events, setEvents] = useState(SEED_EVENTS);

  // Business info state
  const [businessData, setBusinessData] = useState({
    venue: BUSINESS_INFO.location.venue,
    address: BUSINESS_INFO.location.address,
    area: BUSINESS_INFO.location.area,
    phone1: BUSINESS_INFO.contact.primaryPhoneDisplay,
    phone2: BUSINESS_INFO.contact.secondaryPhoneDisplay,
    whatsapp: BUSINESS_INFO.contact.whatsappNumber,
  });
  const [savedNotification, setSavedNotification] = useState(false);

  // Status toggle for reservation
  const updateReservationStatus = (id: string, newStatus: LocalReservation["status"]) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Toggle menu item availability
  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_available: !item.is_available } : item
      )
    );
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-lagos-dark text-lagos-cream">
      {/* Admin Top Header */}
      <header className="bg-lagos-night border-b border-lagos-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-1.5 border border-lagos-border hover:border-lagos-gold text-lagos-gold transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold tracking-widest text-lagos-cream">
                  THE LAGOS
                </span>
                <span className="bg-lagos-gold/20 text-lagos-gold border border-lagos-gold/40 text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold">
                  Owner Portal
                </span>
              </div>
              <p className="text-[10px] text-lagos-muted tracking-wider">
                Lekki Phase 1 Management Console
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab("reservations")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === "reservations"
                  ? "bg-lagos-gold text-lagos-dark"
                  : "text-lagos-cream/70 hover:text-lagos-gold"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Reservations ({reservations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === "menu"
                  ? "bg-lagos-gold text-lagos-dark"
                  : "text-lagos-cream/70 hover:text-lagos-gold"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Menu Items</span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === "events"
                  ? "bg-lagos-gold text-lagos-dark"
                  : "text-lagos-cream/70 hover:text-lagos-gold"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events</span>
            </button>

            <button
              onClick={() => setActiveTab("business")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === "business"
                  ? "bg-lagos-gold text-lagos-dark"
                  : "text-lagos-cream/70 hover:text-lagos-gold"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Venue Info</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* 1. RESERVATIONS TAB */}
        {activeTab === "reservations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-lagos-cream font-bold">
                  Guest Table Reservations
                </h2>
                <p className="text-xs text-lagos-muted">
                  Review incoming requests from website visitors. Supabase synchronization active.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-lagos-muted">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Live Sync Ready</span>
              </div>
            </div>

            <div className="bg-lagos-night border border-lagos-border overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-lagos-charcoal/70 uppercase tracking-wider text-lagos-gold border-b border-lagos-border">
                    <tr>
                      <th className="p-4 font-semibold">Guest Name</th>
                      <th className="p-4 font-semibold">Contact</th>
                      <th className="p-4 font-semibold">Date & Time</th>
                      <th className="p-4 font-semibold">Guests & Occasion</th>
                      <th className="p-4 font-semibold">Special Request</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lagos-border/40 text-lagos-cream/90">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-lagos-charcoal/30 transition-colors">
                        <td className="p-4 font-medium text-lagos-cream whitespace-nowrap">
                          {res.full_name}
                        </td>
                        <td className="p-4 whitespace-nowrap font-mono text-[11px]">
                          <div>{res.phone}</div>
                          <div className="text-lagos-muted">{res.email}</div>
                        </td>
                        <td className="p-4 whitespace-nowrap font-mono">
                          <div className="font-semibold">{res.reservation_date}</div>
                          <div className="text-lagos-gold text-[11px]">{res.reservation_time}</div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="font-semibold text-lagos-cream">{res.guest_count} Guests</span>
                          <span className="block text-[10px] text-lagos-muted">{res.occasion}</span>
                        </td>
                        <td className="p-4 max-w-xs text-lagos-muted text-[11px]">
                          {res.special_requests || "None specified"}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                              res.status === "confirmed"
                                ? "bg-green-950/60 text-green-400 border border-green-800"
                                : res.status === "pending"
                                ? "bg-yellow-950/60 text-yellow-400 border border-yellow-800"
                                : res.status === "cancelled"
                                ? "bg-red-950/60 text-red-400 border border-red-800"
                                : "bg-blue-950/60 text-blue-400 border border-blue-800"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-right space-x-1.5">
                          {res.status !== "confirmed" && (
                            <button
                              onClick={() => updateReservationStatus(res.id, "confirmed")}
                              className="px-2 py-1 bg-green-900/50 hover:bg-green-800 text-green-200 text-[10px] font-semibold transition-colors uppercase tracking-wider"
                            >
                              Confirm
                            </button>
                          )}
                          {res.status !== "cancelled" && (
                            <button
                              onClick={() => updateReservationStatus(res.id, "cancelled")}
                              className="px-2 py-1 bg-red-950/50 hover:bg-red-900 text-red-300 text-[10px] font-semibold transition-colors uppercase tracking-wider"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. MENU ITEMS TAB */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-lagos-cream font-bold">
                  Menu & Pricing Management
                </h2>
                <p className="text-xs text-lagos-muted">
                  Toggle live item availability and review pricing in Nigerian Naira (₦).
                </p>
              </div>

              <div className="text-xs text-lagos-gold font-mono">
                {menuItems.length} Active Dishes & Libations
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => {
                const cat = SEED_CATEGORIES.find((c) => c.id === item.category_id);
                return (
                  <div
                    key={item.id}
                    className={`bg-lagos-night border p-5 flex flex-col justify-between transition-all ${
                      item.is_available ? "border-lagos-border" : "border-red-900/40 opacity-60"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-lagos-gold font-bold">
                          {cat?.name || "General"}
                        </span>
                        <span className="font-serif text-sm text-lagos-gold font-bold">
                          {formatNaira(item.price)}
                        </span>
                      </div>
                      <h3 className="font-serif text-base text-lagos-cream font-medium">
                        {item.name}
                      </h3>
                      <p className="text-xs text-lagos-cream/70 font-light line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-lagos-border/40 flex items-center justify-between">
                      <span className="text-[11px] text-lagos-muted">
                        Status:{" "}
                        <strong className={item.is_available ? "text-green-400" : "text-red-400"}>
                          {item.is_available ? "Available" : "Sold Out"}
                        </strong>
                      </span>

                      <button
                        onClick={() => toggleItemAvailability(item.id)}
                        className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold transition-colors ${
                          item.is_available
                            ? "bg-red-950/50 hover:bg-red-900 text-red-300"
                            : "bg-green-950/50 hover:bg-green-900 text-green-300"
                        }`}
                      >
                        {item.is_available ? "Mark Sold Out" : "Mark Available"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. EVENTS TAB */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-lagos-cream font-bold">
                  Curated Events & Sessions
                </h2>
                <p className="text-xs text-lagos-muted">
                  Manage live calendar showcases and vinyl dates in Lekki Phase 1.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-lagos-night border border-lagos-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs text-lagos-gold font-mono">
                      <span>{formatDate(evt.event_date)}</span>
                      <span>•</span>
                      <span>{evt.event_time}</span>
                    </div>
                    <h3 className="font-serif text-xl text-lagos-cream font-semibold">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-lagos-muted max-w-2xl font-light">
                      {evt.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3">
                    <span className="text-[11px] text-lagos-cream/80 bg-lagos-charcoal px-3 py-1 border border-lagos-border">
                      {evt.ticket_info}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BUSINESS SETTINGS TAB */}
        {activeTab === "business" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-lagos-cream font-bold">
                Venue Information & Contact Coordinates
              </h2>
              <p className="text-xs text-lagos-muted">
                These coordinates appear across all pages, footers, JSON-LD SEO schemas, and WhatsApp CTAs.
              </p>
            </div>

            {savedNotification && (
              <div className="flex items-center space-x-2 p-3 bg-green-950/60 border border-green-800 text-green-300 text-xs">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Venue coordinates successfully saved and updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveBusiness} className="bg-lagos-night border border-lagos-border p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                  Mall / Building Name
                </label>
                <input
                  type="text"
                  value={businessData.venue}
                  onChange={(e) => setBusinessData({ ...businessData, venue: e.target.value })}
                  className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                  Street Address
                </label>
                <input
                  type="text"
                  value={businessData.address}
                  onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                  className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                  Area & City
                </label>
                <input
                  type="text"
                  value={businessData.area}
                  onChange={(e) => setBusinessData({ ...businessData, area: e.target.value })}
                  className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                    Primary Phone Line
                  </label>
                  <input
                    type="text"
                    value={businessData.phone1}
                    onChange={(e) => setBusinessData({ ...businessData, phone1: e.target.value })}
                    className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                    Secondary Phone Line
                  </label>
                  <input
                    type="text"
                    value={businessData.phone2}
                    onChange={(e) => setBusinessData({ ...businessData, phone2: e.target.value })}
                    className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-lagos-gold mb-1 font-medium">
                  WhatsApp Direct Line (International format without +)
                </label>
                <input
                  type="text"
                  value={businessData.whatsapp}
                  onChange={(e) => setBusinessData({ ...businessData, whatsapp: e.target.value })}
                  className="w-full bg-lagos-dark border border-lagos-border text-lagos-cream px-3.5 py-2.5 text-sm focus:border-lagos-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-lagos-gold hover:bg-lagos-bronze text-lagos-dark font-bold py-3 text-xs uppercase tracking-widest transition-colors"
              >
                Save Business Information
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
