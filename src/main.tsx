
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { registerWebVitals } from './utils/perf/webVitals'
import { analyzeNetworkAfterLoad } from './utils/perf/networkReport'
import './index.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'
import './styles/emergency-marker-fix.css'
import './styles/map-optimizations.css'
import './styles/force-markers.css'
import './styles/map-fixes.css'
import './styles/map/index.css' // Updated path to use the index file that imports all map styles
import { setupLazyLoading, deferOperation, preloadCriticalImages } from './utils/performance.ts'

// Critical images to preload at application start
const CRITICAL_APPLICATION_IMAGES = [
  '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png', // Documentation header
  '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png', // Completion image
  '/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png'  // Troubleshooting header
];

// Preload critical images as early as possible
preloadCriticalImages(CRITICAL_APPLICATION_IMAGES);

// Log the current deployed URL for debugging
console.log('Application starting, window.location:', window.location.href);
console.log('Application path:', window.location.pathname);

// Force scroll to top on page load
window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  console.log('Forced scroll to top on page load');
});

// Mount the application with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found! Cannot mount React application.');
} else {
  try {
    console.log('Starting React application mount');
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    );
    console.log('React application successfully mounted');
    
    // Performance monitoring and budgets
    registerWebVitals({ LCP: 2500, INP: 200, CLS: 0.1 });
    analyzeNetworkAfterLoad({ totalBundleKB: 200, jsKB: 150, cssKB: 50, imageMaxKB: 200, firstPartyTotalKB: 300 });
    
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
