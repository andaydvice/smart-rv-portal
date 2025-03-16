
import { StorageFacility as StorageFacilityType } from '@/components/storage/types';

// Re-export the StorageFacility type for use in marker utilities
export type StorageFacility = StorageFacilityType;

/**
 * Results of testing marker visibility
 */
export interface MarkerVisibilityTestResult {
  total: number;
  visible: number;
  hidden: number;
  issues: VisibilityIssueDetail[];
}

/**
 * Details about a specific marker visibility issue
 */
export interface VisibilityIssueDetail {
  facilityId?: string;
  elementId?: string;
  issue: string;
  cssProperties?: Record<string, string>;
}
