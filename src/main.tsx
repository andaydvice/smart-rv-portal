
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Performance-optimized rendering
const renderApp = () => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    // Remove loading indicator if present
    const loadingElement = document.querySelector('.app-loading');
    if (loadingElement) {
      loadingElement.remove();
    }
    
    // Create and render root
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('Application rendered successfully with latest Lovable version');
  } else {
    console.error('Root element not found in the DOM');
  }
};

// Execute rendering as soon as DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
