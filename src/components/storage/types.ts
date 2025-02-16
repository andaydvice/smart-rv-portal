
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
}
