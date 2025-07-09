
import type { StorageFacility } from '@/components/storage/types';
import type { MarkerVisibilityTestResult, VisibilityIssueDetail } from '@/utils/markers/types';

export interface UseMarkerCreationProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
}

export interface MarkerStatistics {
  markersCreated: number;
  skippedFacilities: number;
  processedNYFacilities: number;
  totalFacilities: number;
  totalNYFacilities: number;
  startTime?: number;
  endTime?: number;
}

export interface MarkerError {
  facilityId: string;
  facilityName: string;
  error: Error;
  timestamp: number;
  type: string;
  recovered: boolean;
}

export interface UseMarkerErrorHandlingReturn {
  addError: (facility: any, error: Error, type: string) => void;
  hasErrorForFacility: (facilityId: string) => boolean;
  markErrorAsRecovered: (facilityId: string) => void;
  attemptErrorRecovery: (facilityId: string) => boolean;
  errors: MarkerError[];
}

export interface UseMarkerHighlightProps {
  map: mapboxgl.Map | null;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
}

export interface UseMarkerVisibilityProps {
  map: mapboxgl.Map | null;
}

export interface UseMarkerPersistenceProps {
  map: mapboxgl.Map | null;
}

// Re-export these types for backward compatibility
export type { MarkerVisibilityTestResult, VisibilityIssueDetail };
