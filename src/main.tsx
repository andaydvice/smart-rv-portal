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

// Register service worker for PWA features
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      // Silent fail for service worker registration
    }
  });
}

// Force scroll to top on page load
window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});

// Mount the application
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);