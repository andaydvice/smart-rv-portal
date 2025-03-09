
/**
 * Central type definitions for marker utilities
 */

// Results from visibility testing
export interface MarkerVisibilityTestResult {
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
  issues: VisibilityIssueDetail[];
}

// Details about visibility issues
export interface VisibilityIssueDetail {
  elementId: string;
  elementType: string;
  issueType: 'visibility' | 'display' | 'opacity' | 'zIndex' | 'position' | 'events' | 'other';
  description: string;
  computedStyles: {
    visibility: string;
    display: string;
    opacity: string;
    zIndex: string;
    position: string;
    pointerEvents: string;
  };
  recommendation: string;
}

// Type for facility objects used by the markers
// This is a minimal version that only includes what markers need
export interface StorageFacility {
  id: string;
  name: string;
  latitude: number | string;
  longitude: number | string;
  // Add optional properties to make it more compatible with the full StorageFacility type
  address?: string;
  city?: string;
  state?: string;
  features?: {
    indoor?: boolean;
    climate_controlled?: boolean;
    "24h_access"?: boolean;
    security_system?: boolean;
    vehicle_washing?: boolean;
    [key: string]: boolean | undefined;
  };
  price_range?: {
    min: number;
    max: number;
    currency: string;
  };
  contact_phone?: string;
  contact_email?: string;
  avg_rating?: number;
  review_count?: number;
  verified_fields?: {
    features?: boolean;
    price_range?: boolean;
    contact_info?: boolean;
    location?: boolean;
    business_hours?: boolean;
  };
  [key: string]: any; // Allow additional properties to support both types
}
