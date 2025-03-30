
export interface Facility {
  name: string;
  rating?: number;
  address?: string;
  description?: string;
  phone?: string;
  features?: string[];
}

export interface MapStyle {
  featureType: string;
  elementType: string;
  stylers: Array<{[key: string]: string | number}>;
}
