
import { 
  testMarkersVisibility,
  createMarkerDebugger,
  monitorMarkerVisibility,
  createMarkerDebugOverlay
} from './visibilityTester';

// Re-export with appropriate aliases
export {
  testMarkersVisibility,
  testMarkersVisibility as testMarkerVisibility,
  testMarkersVisibility as auditMarkerVisibility,
  monitorMarkerVisibility,
  createMarkerDebugger,
  createMarkerDebugOverlay,
};

// Re-export types from main markers index file
export type {
  MarkerVisibilityTestResult,
  VisibilityIssueDetail,
} from '../index';
