
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

// CRITICAL: Preload all header images immediately on page load
// This ensures they display instantly on any page navigation
document.addEventListener('DOMContentLoaded', () => {
  const criticalHeaderImages = [
    '/lovable-uploads/3efce4a3-d382-4b88-b33e-f96074fb7311.png', // RV Weather hero
    '/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png', // Regional climate
    '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png', // Documentation header
    '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png', // Complete documentation
    '/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png', // Main hero
    '/lovable-uploads/53093373-3df3-49cc-b4cc-91b800c53fa9.png', // Calculator header
    '/lovable-uploads/ff43ed8a-b7cd-42f7-a45e-a3a706d39d07.png', // Voice control
    '/lovable-uploads/Luxury_RV_Living-min.jpg', // RV Living
    '/lovable-uploads/Luxury-Class-RVs-min.jpg' // Luxury RVs
  ];
  
  // Create and inject actual image elements (the most reliable way)
  criticalHeaderImages.forEach(src => {
    const img = new Image();
    img.src = src;
    img.style.position = 'absolute';
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.opacity = '0.01';
    img.style.pointerEvents = 'none';
    img.style.left = '-9999px';
    document.body.appendChild(img);
  });
});

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
    
    /* Optimize image loading */
    img[fetchpriority="high"], img[loading="eager"] {
      content-visibility: auto !important;
    }
  `;
  document.head.appendChild(style);
  console.log('Injected emergency styles');
};

// Preload critical header images used across site
const preloadCriticalHeaderImages = () => {
  // List of all critical header images that should load instantly
  const criticalImages = [
    '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png', // Documentation header
    '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png', // Complete documentation
    '/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png', // Hero image
    '/lovable-uploads/3efce4a3-d382-4b88-b33e-f96074fb7311.png', // RV Weather
    '/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png', // Regional climate
    '/lovable-uploads/53093373-3df3-49cc-b4cc-91b800c53fa9.png'  // Calculator header
  ];
  
  // Create preload links for all critical images
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    // Also preload using Image constructor
    const img = new Image();
    img.src = src;
  });
  
  console.log('Preloaded critical header images');
};

// Inject emergency styles immediately
injectEmergencyStyles();

// Preload critical header images immediately
preloadCriticalHeaderImages();

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
