
import { StorageFacility } from '../../../types';

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

export interface MarkerVisibilityTestResult {
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
  issues: VisibilityIssueDetail[];
}

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
