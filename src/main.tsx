
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
import './styles/map/index.css' // Updated path to use the index file that imports all map styles
import { setupLazyLoading, deferOperation, preloadCriticalImages } from './utils/performance.ts'
import EmergencyDebug from './components/debug/EmergencyDebug.tsx'

// Critical images to preload at application start
const CRITICAL_APPLICATION_IMAGES = [
  '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png', // Documentation header
  '/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png', // Completion image
  '/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png'  // Troubleshooting header
];

// Create a basic emergency fallback component outside of React
function createEmergencyFallback() {
  if (document.getElementById('emergency-fallback')) return;
  
  console.log('Creating emergency fallback element');
  const emergencyDiv = document.createElement('div');
  emergencyDiv.id = 'emergency-fallback';
  emergencyDiv.style.position = 'fixed';
  emergencyDiv.style.top = '0';
  emergencyDiv.style.left = '0';
  emergencyDiv.style.width = '100%';
  emergencyDiv.style.height = '100vh';
  emergencyDiv.style.backgroundColor = '#080F1F';
  emergencyDiv.style.color = 'white';
  emergencyDiv.style.padding = '20px';
  emergencyDiv.style.zIndex = '999999';
  emergencyDiv.style.display = 'flex';
  emergencyDiv.style.flexDirection = 'column';
  emergencyDiv.style.alignItems = 'center';
  emergencyDiv.style.justifyContent = 'center';
  emergencyDiv.style.fontFamily = 'Arial, sans-serif';
  
  emergencyDiv.innerHTML = `
    <h1 style="margin-bottom: 20px;">Emergency Recovery Mode</h1>
    <p style="margin-bottom: 10px;">Current URL: ${window.location.href}</p>
    <p style="margin-bottom: 20px;">Path: ${window.location.pathname}</p>
    <button id="go-home-btn" style="background: #5B9BD5; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-bottom: 20px;">Go Home</button>
    <button id="show-dom-btn" style="background: #5B9BD5; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Show DOM</button>
  `;
  
  document.body.appendChild(emergencyDiv);
  
  // Add event listeners after appending to DOM
  document.getElementById('go-home-btn')?.addEventListener('click', () => {
    window.location.href = '/';
  });
  
  document.getElementById('show-dom-btn')?.addEventListener('click', () => {
    console.log('DOM Content:', document.body.innerHTML);
    alert('DOM content logged to console');
  });
}

// Preload critical images as early as possible
preloadCriticalImages(CRITICAL_APPLICATION_IMAGES);

// Create emergency fallback immediately
createEmergencyFallback();

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
  createEmergencyFallback();
} else {
  try {
    console.log('Starting React application mount');
    
    // First render just the EmergencyDebug component to ensure something shows up
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <EmergencyDebug />
        <App />
      </React.StrictMode>
    );
    
    console.log('React application successfully mounted');
    
    // After app is rendered, setup lazy loading for images
    deferOperation(() => {
      setupLazyLoading();
    }, 300);
    
  } catch (error) {
    console.error('Failed to mount React application:', error);
    createEmergencyFallback();
    
    // Emergency recovery attempt
    setTimeout(() => {
      try {
        ReactDOM.createRoot(rootElement).render(
          <EmergencyDebug />
        );
        console.log('Emergency mounting attempted with only EmergencyDebug');
      } catch (fallbackError) {
        console.error('Emergency mounting also failed:', fallbackError);
        createEmergencyFallback();
      }
    }, 1000);
  }
}
