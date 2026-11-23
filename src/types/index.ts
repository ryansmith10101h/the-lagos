export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
  is_active: boolean;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  image_url?: string;
  is_featured: boolean;
  is_available: boolean;
  dietary_tags?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  event_date: string;
  event_time: string;
  description: string;
  image_url: string;
  is_featured: boolean;
  ticket_info?: string;
  reservation_required: boolean;
}

export interface Reservation {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  occasion?: string;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'drinks' | 'interior' | 'nightlife' | 'events' | 'lifestyle';
  image_url: string;
  aspect_ratio: 'square' | 'tall' | 'wide';
  display_order: number;
  is_featured: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  subtagline: string;
  location: {
    venue: string;
    address: string;
    area: string;
    city: string;
    state: string;
    country: string;
    landmark: string;
    googleMapsUrl: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    primaryPhoneDisplay: string;
    secondaryPhoneDisplay: string;
    whatsappNumber: string;
    email: string;
    instagram: string;
  };
  hours: {
    day: string;
    time: string;
  }[];
}
