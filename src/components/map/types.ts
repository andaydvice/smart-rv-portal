
export interface Facility {
  name: string;
  rating?: number;
  address?: string;
  description?: string;
  phone?: string;
  features?: {
    indoor?: boolean;
    climate_controlled?: boolean;
    "24h_access"?: boolean;
    security_system?: boolean;
    vehicle_washing?: boolean;
  };
}

export interface MapStyle {
  featureType: string;
  elementType: string;
  stylers: Array<{[key: string]: string | number}>;
}
