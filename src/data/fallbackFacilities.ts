// Emergency fallback data for when Supabase is unavailable
export const fallbackStorageFacilities = [
  {
    id: "fallback-1",
    name: "Secure Indoor RV Storage",
    address: "123 Storage Way",
    city: "Phoenix",
    state: "Arizona",
    latitude: 33.4484,
    longitude: -112.0740,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": true,
      security_system: true,
      vehicle_washing: false
    },
    price_range: {
      min: 150,
      max: 250,
      currency: "USD"
    },
    contact_phone: "(555) 123-4567",
    contact_email: "info@securervstorage.com",
    avg_rating: 4.5,
    review_count: 23,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: true
    }
  },
  {
    id: "fallback-2", 
    name: "Covered RV Solutions",
    address: "456 Safe Harbor Dr",
    city: "Las Vegas",
    state: "Nevada",
    latitude: 36.1699,
    longitude: -115.1398,
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": true,
      security_system: true,
      vehicle_washing: true
    },
    price_range: {
      min: 100,
      max: 180,
      currency: "USD"
    },
    contact_phone: "(555) 234-5678",
    contact_email: "hello@coveredrv.com",
    avg_rating: 4.2,
    review_count: 18,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: false
    }
  },
  {
    id: "fallback-3",
    name: "Premium Indoor Storage",
    address: "789 Shelter Lane", 
    city: "Dallas",
    state: "Texas",
    latitude: 32.7767,
    longitude: -96.7970,
    features: {
      indoor: true,
      climate_controlled: true,
      "24h_access": false,
      security_system: true,
      vehicle_washing: true
    },
    price_range: {
      min: 200,
      max: 350,
      currency: "USD"
    },
    contact_phone: "(555) 345-6789",
    contact_email: "contact@premiumstorage.com",
    avg_rating: 4.8,
    review_count: 31,
    verified_fields: {
      features: true,
      price_range: true,
      contact_info: true,
      location: true,
      business_hours: true
    }
  }
];

export const fallbackPriceRange = {
  min: 100,
  max: 350
};

export const fallbackStates = [
  "Arizona",
  "Nevada", 
  "Texas"
];