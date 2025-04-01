
import { StorageFacility } from "../types";

// For GoogleMapView and related components
export interface MapFacility {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  rating?: number;
  priceRange?: string;
  features?: string[];
}

// Convert StorageFacility to the format expected by map components
export function convertToMapFacility(facility: StorageFacility): MapFacility {
  return {
    id: facility.id,
    name: facility.name,
    location: {
      lat: facility.latitude,
      lng: facility.longitude,
    },
    address: `${facility.address}, ${facility.city}, ${facility.state}`,
    rating: facility.avg_rating,
    priceRange: facility.price_range ? 
      `$${facility.price_range.min} - $${facility.price_range.max}` : 
      undefined,
    features: facility.features ? 
      Object.entries(facility.features)
        .filter(([_, enabled]) => enabled)
        .map(([feature]) => feature.replace(/_/g, ' ')) : 
      []
  };
}
