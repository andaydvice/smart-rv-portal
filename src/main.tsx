
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { fixBlankScreen } from './utils/navigation/fixNavigation'
import './index.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'
import './styles/emergency-marker-fix.css'
import './styles/map-optimizations.css'
import './styles/navigation-fix.css'
import './styles/pages/storage-checklist.css'

// Log the current deployed URL for debugging
console.log('Application starting, window.location:', window.location.href);
console.log('Application path:', window.location.pathname);

// Initialize navigation fixes
// Force immediate style injection for emergency fixes
const injectEmergencyStyles = () => {
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
  console.log('Injected emergency styles');
};

// Inject emergency styles immediately
injectEmergencyStyles();

// Apply blank screen fix immediately
fixBlankScreen();

// Ensure emergency styles are loaded first
import('./styles/marker-fix.css').catch(err => console.error('Failed to load marker fix styles:', err));

// Mount the application with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found! Cannot mount React application.');
  
  // Create root element if it doesn't exist
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  newRoot.style.backgroundColor = '#080F1F';
  newRoot.style.minHeight = '100vh';
  document.body.appendChild(newRoot);
  
  // Try mounting again with the new root element
  try {
    ReactDOM.createRoot(newRoot).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('React application successfully mounted on created root element');
  } catch (error) {
    console.error('Failed to mount React application on created root element:', error);
  }
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('React application successfully mounted');
    
    // Add navigation event listener for debugging
    window.addEventListener('popstate', () => {
      console.log('Navigation occurred, new path:', window.location.pathname);
      fixBlankScreen();
    });
  } catch (error) {
    console.error('Failed to mount React application:', error);
  }
}
