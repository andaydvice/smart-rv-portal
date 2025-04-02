
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

// Initialize navigation fixes
setupNavigationFixes();

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
    
    /* Emergency styling for blank screens */
    div, main, section {
      visibility: visible !important;
      display: block !important;
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
    fixBlankScreen();
  });
};

// Inject emergency styles immediately
injectEmergencyStyles();

// Apply blank screen fix
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
