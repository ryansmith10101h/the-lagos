-- ====================================================================
-- THE LAGOS: Supabase Database Schema & Row-Level Security
-- Location: Road 14 Mall, Plot 153B Adebayo Doherty Road, Lekki Phase 1, Lagos
-- ====================================================================

-- 1. Create Menu Categories Table
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Create Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN' NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  dietary_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Create Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  ticket_info TEXT DEFAULT 'Free Entry / Reservation Recommended',
  reservation_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Create Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  guest_count INT NOT NULL CHECK (guest_count > 0 AND guest_count <= 50),
  occasion TEXT DEFAULT 'Dining',
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. Create Gallery Items Table
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('food', 'drinks', 'interior', 'nightlife', 'events', 'lifestyle')),
  image_url TEXT NOT NULL,
  aspect_ratio TEXT DEFAULT 'square' CHECK (aspect_ratio IN ('square', 'tall', 'wide')),
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. Create Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. Create Business Settings Table
CREATE TABLE IF NOT EXISTS public.business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ====================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow anyone to view menu, events, gallery, settings)
CREATE POLICY "Allow public read on menu_categories" ON public.menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on menu_items" ON public.menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read on gallery_items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read on business_settings" ON public.business_settings FOR SELECT USING (true);

-- Public Insert Policies (Allow visitors to create reservations and send contact messages)
CREATE POLICY "Allow public insert on reservations" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies (Full access for authenticated admins)
CREATE POLICY "Allow admin full access on menu_categories" ON public.menu_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access on menu_items" ON public.menu_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access on events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access on reservations" ON public.reservations FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access on gallery_items" ON public.gallery_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access on contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access on business_settings" ON public.business_settings FOR ALL TO authenticated USING (true);
