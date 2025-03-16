
import { StorageFacility as StorageFacilityType } from '@/components/storage/types';

// Re-export the StorageFacility type for use in marker utilities
export type StorageFacility = StorageFacilityType;

/**
 * Results of testing marker visibility
 */
export interface MarkerVisibilityTestResult {
  // Original properties - these need to stay for backward compatibility
  total: number;
  visible: number;
  hidden: number;
  issues: VisibilityIssueDetail[];
  
  // Additional properties used in the implementation
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
}

/**
 * Details about a specific marker visibility issue
 */
export interface VisibilityIssueDetail {
  // Original properties - these need to stay for backward compatibility
  facilityId?: string;
  elementId?: string;
  issue: string;
  cssProperties?: Record<string, string>;
  
  // Additional properties used in the implementation
  elementType?: string;
  issueType?: string;
  description?: string;
  recommendation?: string;
  computedStyles?: {
    visibility: string;
    display: string;
    opacity: string;
    zIndex: string;
    position: string;
    pointerEvents: string;
    [key: string]: string;
  };
}
