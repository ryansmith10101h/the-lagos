import { BusinessInfo } from "@/types";

export const BUSINESS_INFO: BusinessInfo = {
  name: "THE LAGOS",
  tagline: "WHERE LAGOS COMES TO LIFE",
  subtagline: "An editorial dining and cultural sanctuary in Lekki Phase 1.",
  location: {
    venue: "Road 14 Mall",
    address: "Plot 153B Adebayo Doherty Road",
    area: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
    landmark: "Directly on Adebayo Doherty Road, Road 14 Mall",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Plot+153B+Adebayo+Doherty+Road+Lekki+Phase+1+Lagos",
  },
  contact: {
    primaryPhone: "+2348103827988",
    secondaryPhone: "+2348034895239",
    primaryPhoneDisplay: "0810 382 7988",
    secondaryPhoneDisplay: "0803 489 5239",
    whatsappNumber: "2348103827988",
    email: "reservations@thelagos.ng",
    instagram: "@thelagos_experience",
  },
  hours: [
    { day: "Tuesday – Thursday", time: "12:00 PM – 11:30 PM" },
    { day: "Friday – Saturday", time: "12:00 PM – 02:00 AM" },
    { day: "Sunday", time: "01:00 PM – 11:00 PM" },
    { day: "Monday", time: "Closed for Private Bookings & Maintenance" },
  ],
};

export const NAV_LINKS = [
  { name: "Story", href: "/#story" },
  { name: "Menu", href: "/menu" },
  { name: "Drinks", href: "/drinks" },
  { name: "The Experience", href: "/#experience" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Location", href: "/#location" },
];
