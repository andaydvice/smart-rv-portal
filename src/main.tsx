
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'
import './styles/emergency-marker-fix.css'
import './styles/map-optimizations.css'
import './styles/force-markers.css'
import './styles/map-fixes.css'
import './styles/google-maps.css'
import { setupLazyLoading, deferOperation } from './utils/performance.ts'

// Log the current deployed URL for debugging
console.log('Application starting, window.location:', window.location.href);
console.log('Application path:', window.location.pathname);

// Force immediate style injection for emergency fixes
const injectEmergencyStyles = () => {
  // Force visibility of map markers
  const style = document.createElement('style');
  style.textContent = `
    /* Force visibility of root element */
    #root {
      display: block !important;
      visibility: visible !important;
    }
    
    /* Force map elements to be visible */
    .mapboxgl-marker, .map-marker, .marker, [class*="marker"] {
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
    
    /* Fix for blank page */
    body, html {
      height: 100%;
      visibility: visible !important;
      display: block !important;
    }
  `;
  document.head.appendChild(style);
  console.log('Injected emergency styles');
};

// Inject emergency styles immediately
injectEmergencyStyles();

// Mount the application with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found! Cannot mount React application.');
} else {
  try {
    console.log('Starting React application mount');
    ReactDOM.createRoot(rootElement).render(
      <App />
    );
    console.log('React application successfully mounted');
    
    // After app is rendered, setup lazy loading for images
    deferOperation(() => {
      setupLazyLoading();
    }, 300);
    
  } catch (error) {
    console.error('Failed to mount React application:', error);
    
    // Emergency recovery attempt
    setTimeout(() => {
      try {
        ReactDOM.createRoot(rootElement).render(
          <App />
        );
        console.log('Emergency mounting attempted without StrictMode');
      } catch (fallbackError) {
        console.error('Emergency mounting also failed:', fallbackError);
        
        // Display a basic error message
        rootElement.innerHTML = `
          <div style="padding: 20px; text-align: center;">
            <h2>Something went wrong</h2>
            <p>The application couldn't load properly. Please check the console for errors.</p>
          </div>
        `;
      }
    }, 1000);
  }
}
