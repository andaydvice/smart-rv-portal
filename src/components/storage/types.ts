export interface StorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  contact_phone?: string;
  contact_email?: string;
  avg_rating?: number;
  review_count?: number;
  verified_fields: {
    features: boolean;
    price_range: boolean;
    contact_info: boolean;
    location: boolean;
    business_hours: boolean;
  };
}

export interface RawStorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: string | number;
  longitude: string | number;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  } | null;
  price_range: {
    min: number;
    max: number;
    currency: string;
  } | null;
  contact_phone?: string;
  contact_email?: string;
  avg_rating?: number;
  review_count?: number;
}

export interface FilterState {
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  priceRange: [number, number];
  selectedState: string | null;
  minRating: number | null;
}

export interface DatabaseStorageFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  contact_phone?: string;
  contact_email?: string;
  avg_rating?: number;
  review_count?: number;
}

// Add Facility as an alias for StorageFacility for backward compatibility
export type Facility = StorageFacility;
