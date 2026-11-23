# THE LAGOS

> **Where Lagos Comes to Life**  
> An editorial dining, cocktail, and cultural lifestyle sanctuary located at Road 14 Mall, Plot 153B Adebayo Doherty Road, Lekki Phase 1, Lagos, Nigeria.

---

## 🌟 Brand & Experience Concept

**THE LAGOS** is a premier Nigerian hospitality and cultural destination designed to reflect the unmistakable energy, sophistication, and warmth of Lagos. Moving beyond generic restaurant templates, the platform features a Vogue-inspired editorial design aesthetic, rich imagery, authentic Nigerian culinary heritage elevated with contemporary techniques, bespoke mixology, and curated vinyl music sessions.

---

## 📍 Verified Business Coordinates

- **Venue**: Road 14 Mall
- **Address**: Plot 153B Adebayo Doherty Road, Lekki Phase 1, Lagos, Nigeria
- **Primary Phone**: `0810 382 7988` (`+234 810 382 7988`)
- **Secondary Phone**: `0803 489 5239` (`+234 803 489 5239`)
- **WhatsApp Concierge**: `+234 810 382 7988`
- **Email**: `reservations@thelagos.ng`
- **Timezone**: `Africa/Lagos` (WAT, UTC+1)
- **Currency**: Nigerian Naira (`₦`)

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict type checking)
- **Styling**: Tailwind CSS with custom editorial brand tokens (`lagos-gold`, `lagos-night`, `lagos-dark`, `lagos-cream`)
- **Icons**: Lucide Icons
- **Database / Backend**: Supabase (PostgreSQL with Row Level Security, public reservations insert, admin policies)
- **Images**: Remote pattern optimized for Unsplash and Supabase Storage with responsive srcsets and blur fallbacks
- **SEO & Performance**: 
  - Dynamic JSON-LD structured data (`Restaurant`, `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`)
  - Canonical URLs, Open Graph, and Twitter metadata
  - Automated `sitemap.xml` and `robots.txt`
  - Mobile-first responsive layouts with sticky action bars (`RESERVE`, `WHATSAPP`, `CALL`, `DIRECTIONS`)

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/page.tsx         # Business owner CMS portal (Reservations, Menu, Events, Venue Coordinates)
│   │   ├── api/
│   │   │   ├── contact/route.ts   # Contact & event inquiry handler with validation
│   │   │   └── reservations/route.ts # Table reservation handler with validation & Supabase integration
│   │   ├── drinks/page.tsx        # Nocturnal Libations, Craft Cocktails, Cellar Reserves
│   │   ├── events/page.tsx        # Curated Events & Vinyl Sessions
│   │   ├── gallery/page.tsx       # Visual Chronicle (Architecture, Food, Drinks, Nightlife)
│   │   ├── menu/page.tsx          # Full Gastronomy Menu with ₦ pricing & category filters
│   │   ├── globals.css            # Custom typography, scrollbars, and reduced-motion rules
│   │   ├── layout.tsx             # Root layout with JSON-LD schema & global metadata
│   │   ├── not-found.tsx          # Editorial 404 page
│   │   ├── page.tsx               # Homepage with complete editorial narrative
│   │   ├── robots.ts              # Production robots.txt
│   │   └── sitemap.ts             # Production sitemap.xml
│   ├── components/
│   │   ├── home/                  # Editorial sections (Hero, Story, MenuTeaser, Drinks, Experience, Events, Gallery, Location)
│   │   ├── layout/                # Navbar, Footer, StickyMobileBar
│   │   └── ui/                    # ReservationModal with Nigerian phone formatting & WhatsApp alert
│   ├── data/
│   │   └── seed-data.ts           # Authentic initial data for menu, drinks, events, and gallery
│   ├── lib/
│   │   ├── constants.ts           # Verified business coordinates & opening hours
│   │   ├── utils.ts               # Currency (₦), Nigerian tel formatting, and WhatsApp link builders
│   │   └── supabase/              # Supabase browser & admin server clients
│   └── types/
│       └── index.ts               # Strict TypeScript definitions
├── supabase/
│   └── migrations/                # PostgreSQL schema & Row Level Security (RLS) policies
└── ...config files
```

---

## 🗄️ Supabase Database Setup

Run the SQL migration in `supabase/migrations/20240101000000_init_the_lagos.sql` inside your Supabase SQL Editor:

1. `menu_categories`
2. `menu_items`
3. `events`
4. `reservations`
5. `gallery_items`
6. `contact_messages`
7. `business_settings`

Row Level Security (RLS) is enabled across all tables, allowing public reads on published content, customer submissions on reservations/messages, and restricting administrative actions to authenticated staff.

---

## 🚀 Getting Started

### 1. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase project keys when connecting live backend:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
*(Note: The platform includes complete graceful fallback handling, allowing instant full preview and testing even before live Supabase credentials are configured).*

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📱 Mobile-First Nigerian UX

- **Sticky Quick-Action Drawer**: Fast single-tap access to **Reserve a Table**, **WhatsApp Concierge**, **Call Desk (0810 382 7988)**, and **Google Maps Directions** to Road 14 Mall, Lekki Phase 1.
- **Reservation Modal**: Captures guest count, date, time, occasion, and special requests. Submits to API and provides a one-tap pre-filled WhatsApp alert button so guests can ping the restaurant concierge instantly.
- **Admin Portal (`/admin`)**: Non-technical dashboard for the owner to manage reservations, toggle sold-out menu items, update upcoming events, and adjust venue details.
