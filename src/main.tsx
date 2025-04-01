
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
import './styles/navigation-fix.css'
import './styles/pages/storage-checklist.css'

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
    
    /* Ensure content is visible during navigation */
    #root {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      background-color: #080F1F;
      min-height: 100vh;
    }
    
    /* Prevent flash of white screen during navigation */
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
  `;
  document.head.appendChild(style);
  console.log('Injected emergency styles');

  // Force dark background on all children of root
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      document.querySelectorAll('#root > div').forEach(div => {
        if (div instanceof HTMLElement) {
          div.style.backgroundColor = '#080F1F';
          div.style.visibility = 'visible';
          div.style.opacity = '1';
        }
      });
    });
  });

  observer.observe(document.getElementById('root') || document, {
    childList: true,
    subtree: true
  });

  // Create navigation listening system
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred, ensuring visibility');
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
  });
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
    
    // Add navigation event listener for debugging
    window.addEventListener('popstate', () => {
      console.log('Navigation occurred, new path:', window.location.pathname);
    });
  } catch (error) {
    console.error('Failed to mount React application:', error);
  }
}
