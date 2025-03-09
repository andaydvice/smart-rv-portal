
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
  [key: string]: any; // Allow additional properties to support both types
}
