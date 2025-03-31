
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'
import './styles/critical-loading.css' // Add critical loading styles
import './styles/emergency-marker-fix.css'
import './styles/map-optimizations.css'

// Mark root as loading while React initializes
const markRootLoading = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.classList.add('loading');
  }
};

// Remove loading state when React takes over
const removeRootLoading = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.classList.remove('loading');
  }
};

// Add loading state immediately
markRootLoading();

// Log the current deployed URL for debugging
console.log('Application starting, window.location:', window.location.href);
console.log('Application path:', window.location.pathname);

// Force immediate style injection for emergency fixes
const injectEmergencyStyles = () => {
  // Force visibility of map markers
  const style = document.createElement('style');
  style.textContent = `
    .mapboxgl-marker, .map-marker, .marker, [class*="marker"] {
      visibility: visible !important;
      opacity: 1 !important;
      display: block !important;
    }
    
    /* Force critical elements to be visible */
    body, #root, main, .mapboxgl-map {
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
  console.log('Injected emergency marker and visibility styles');
};

// Inject emergency styles immediately
injectEmergencyStyles();

// Ensure emergency styles are loaded first
import('./styles/marker-fix.css').catch(err => console.error('Failed to load marker fix styles:', err));

// Mount the application with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found! Cannot mount React application.');
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('React application successfully mounted');
    
    // Remove loading state once React has mounted
    removeRootLoading();
  } catch (error) {
    console.error('Failed to mount React application:', error);
    
    // If React fails to mount, show an error message
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; color: white;">
        <h2>Unable to load application</h2>
        <p>Please try refreshing the page</p>
        <button onclick="window.location.reload()" style="background: #5B9BD5; border: none; color: white; padding: 10px 20px; border-radius: 4px; margin-top: 20px; cursor: pointer;">
          Refresh
        </button>
      </div>
    `;
  }
}
