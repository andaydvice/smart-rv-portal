
/**
 * Main application initializer
 */

import { fixBlankScreen } from '../navigation/fixNavigation';
import { injectEmergencyStyles } from '../emergency/injectEmergencyStyles';
import { setupNavigationMonitoring } from '../emergency/navigationMonitor';
import { mountReactApp } from '../emergency/reactMounter';

/**
 * Initialize the application
 */
export function initializeApplication(): void {
  // Inject emergency styles immediately
  injectEmergencyStyles();
  
  // Apply blank screen fix immediately
  fixBlankScreen();
  
  // Set up navigation monitoring
  setupNavigationMonitoring();
  
  // Ensure emergency styles are loaded first
  import('../../styles/marker-fix.css').catch(err => 
    console.error('Failed to load marker fix styles:', err)
  );
  
  // Mount the React application
  mountReactApp();
}
