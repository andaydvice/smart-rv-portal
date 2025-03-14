
// Import the correct test function from whereever it's defined
import { testMarkersVisibility } from './visibility';
import { createMarkerDebugger, createMarkerDebugOverlay } from './debugging';
import type { MarkerVisibilityTestResult, VisibilityIssueDetail } from '../types';

// Re-export from specialized utility files
export { 
  createMarkerDebugger,
  createMarkerDebugOverlay
};

// Re-export the testMarkersVisibility function
export { testMarkersVisibility };

// Export types
export type { MarkerVisibilityTestResult, VisibilityIssueDetail };

// Add alias for backward compatibility
export const testMarkerVisibility = testMarkersVisibility;
