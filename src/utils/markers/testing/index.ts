
// Re-export the core testing functionality
export { testMarkersVisibility } from './core/testVisibility';

// Re-export the debug overlay creators
export { 
  createMarkerDebugger,
  createMarkerDebugOverlay 
} from './ui/debugOverlay';

// Re-export the monitoring functionality
export { monitorMarkerVisibility } from './monitoring/visibilityMonitor';

// Export aliases for backward compatibility
export const testMarkerVisibility = testMarkersVisibility;
export const auditMarkerVisibility = testMarkersVisibility;

// Re-export types from main markers types file
export type {
  MarkerVisibilityTestResult,
  VisibilityIssueDetail,
} from '../types';
