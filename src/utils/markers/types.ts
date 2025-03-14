
export interface MarkerVisibilityTestResult {
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
  issues: VisibilityIssueDetail[];
}

export interface VisibilityIssueDetail {
  elementId: string;
  elementType: 'marker' | 'popup' | 'mapElement';
  issueType: 'visibility' | 'display' | 'opacity' | 'position' | 'zIndex';
  description: string;
  computedStyles: {
    visibility?: string;
    display?: string;
    opacity?: string;
    zIndex?: string;
    position?: string;
    pointerEvents?: string;
  };
  recommendation: string;
}

export interface MarkerStatistics {
  total: number;
  created: number;
  visible: number;
  hidden: number;
  failed: number;
  processedNYFacilities: number;
  totalNYFacilities: number;
}

export interface MarkerCount {
  state: string;
  count: number;
  actualCount: number;
}
