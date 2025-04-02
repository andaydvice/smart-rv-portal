
/**
 * Utility for injecting emergency styles to prevent blank screens
 */

/**
 * Injects critical CSS styles to ensure elements remain visible
 */
export function injectEmergencyStyles(): void {
  console.log('Injected emergency styles');
  
  // Force visibility of map markers and critical content
  const style = document.createElement('style');
  style.textContent = `
    html, body {
      background-color: #080F1F !important;
      min-height: 100vh;
      color: white;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    #root {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      background-color: #080F1F;
      min-height: 100vh;
    }
    
    .mapboxgl-marker, .map-marker, .marker, [class*="marker"] {
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
    
    .page-transition-container {
      min-height: 100vh;
      background-color: #080F1F;
      transition: opacity 0.3s ease;
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Force dark background on html and body */
    html, body {
      background-color: #080F1F !important;
      min-height: 100vh;
      color: white;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Ensure layout elements are visible */
    .layout, .layout > div, .layout-container, .min-h-screen {
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
  `;
  document.head.appendChild(style);
}
