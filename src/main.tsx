
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { setupNavigationFixes, fixBlankScreen } from './utils/navigation/fixNavigation'
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

// Set up an emergency loading indicator if content takes too long
let emergencyLoadingTimeout: number;
document.addEventListener('DOMContentLoaded', () => {
  // This will show an emergency loading message if nothing appears after 3 seconds
  emergencyLoadingTimeout = window.setTimeout(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement || rootElement.children.length === 0) {
      console.warn('Emergency loading indicator activated due to blank screen');
      
      // Create and add emergency loading UI
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'emergency-loading-indicator';
      loadingIndicator.innerHTML = `
        <div style="position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #080F1F; color: white; z-index: 9999;">
          <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">Loading Smart RV Systems</h2>
          <div style="width: 3rem; height: 3rem; border: 4px solid rgba(91, 155, 213, 0.3); border-radius: 50%; border-top-color: #5B9BD5; animation: spin 1s linear infinite;"></div>
          <button onClick="window.location.reload()" style="margin-top: 1.5rem; background: #5B9BD5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
            Reload Page
          </button>
          <style>
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
        </div>
      `;
      
      // Add to document if root is empty
      if (!rootElement) {
        document.body.appendChild(loadingIndicator);
      } else {
        rootElement.appendChild(loadingIndicator);
      }
    }
  }, 3000);
});

// Initialize navigation fixes
setupNavigationFixes();

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
    
    // Clear emergency timeout since we've successfully mounted
    clearTimeout(emergencyLoadingTimeout);
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
    
    // Clear emergency timeout since we've successfully mounted
    clearTimeout(emergencyLoadingTimeout);
    
    // Add navigation event listener for debugging
    window.addEventListener('popstate', () => {
      console.log('Navigation occurred, new path:', window.location.pathname);
      fixBlankScreen();
    });
  } catch (error) {
    console.error('Failed to mount React application:', error);
    
    // Try recovery rendering if the normal render fails
    try {
      const EmergencyContent = () => (
        <div style={{ 
          backgroundColor: '#080F1F', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white'
        }}>
          <h1 style={{ marginBottom: '1rem' }}>Smart RV Systems</h1>
          <p>Loading application in recovery mode...</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              backgroundColor: '#5B9BD5',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              marginTop: '1rem',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
      
      ReactDOM.createRoot(rootElement).render(<EmergencyContent />);
      console.log('Emergency content rendered due to mounting failure');
    } catch (emergencyError) {
      console.error('Failed to render emergency content:', emergencyError);
    }
  }
}
