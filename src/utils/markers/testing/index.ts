
// Import the correct test function from whereever it's defined
import { testMarkersVisibility } from './visibility';

// Re-export from specialized utility files
export { 
  createMarkerDebugger,
  createMarkerDebugOverlay
} from './debugging';

// Re-export the testMarkersVisibility function
export { testMarkersVisibility };

// Add alias for backward compatibility
export const testMarkerVisibility = testMarkersVisibility;
