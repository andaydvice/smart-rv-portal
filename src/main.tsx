
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
import './styles/map/index.css'
import { setupLazyLoading, deferOperation, preloadCriticalImages } from './utils/performance.ts'
import { setupCaching } from './utils/caching.ts'
import { optimizeCSSDelivery } from './utils/criticalCss.ts'
import { preloadCriticalModules } from './utils/bundleOptimization.ts'
import { setupPerformanceMonitoring } from './utils/performanceReport.ts'

// Register service worker for PWA features
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content available! Page will refresh...');
              // Auto-refresh for better UX
              setTimeout(() => window.location.reload(), 1000);
            }
          });
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}

// Critical images to preload at application start
const CRITICAL_APPLICATION_IMAGES = [
  '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png', // Documentation header
  '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png', // Completion image
  '/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png'  // Troubleshooting header
];

// Preload critical images as early as possible
preloadCriticalImages(CRITICAL_APPLICATION_IMAGES);

// Setup caching for optimal performance
setupCaching();

// Optimize CSS delivery
optimizeCSSDelivery();

// Preload critical modules
deferOperation(() => {
  preloadCriticalModules();
}, 200);

// Setup comprehensive performance monitoring
setupPerformanceMonitoring();

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
        <App />
      </React.StrictMode>
    );
    console.log('React application successfully mounted');
    
    // After app is rendered, setup lazy loading for images
    deferOperation(() => {
      setupLazyLoading();
    }, 300);
    
    // Monitor and log performance metrics
    deferOperation(() => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        console.log(`DOM ready time: ${domReady}ms`);
        
        if (loadTime > 3000) {
          console.warn('Page load time exceeds 3s target:', loadTime);
        }
      }
    }, 1000);
    
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
