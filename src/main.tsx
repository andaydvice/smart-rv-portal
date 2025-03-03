
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application...');

// Force document visibility
document.documentElement.style.visibility = 'visible';
document.documentElement.style.display = 'block';
document.documentElement.style.opacity = '1';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';
document.body.style.opacity = '1';

// Simplified startup without WebSocket connections
const rootElement = document.getElementById('root');

if (rootElement) {
  // Ensure root is visible
  rootElement.style.visibility = 'visible';
  rootElement.style.display = 'block';
  rootElement.style.opacity = '1';
  
  // Create React root and render app
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Remove loading indicator
  const loadingIndicator = document.querySelector('.app-loading');
  if (loadingIndicator && loadingIndicator.parentNode) {
    loadingIndicator.parentNode.removeChild(loadingIndicator);
  }
  
  console.log('Application rendered successfully');
}

// Extra safety - remove loading screen after timeout
setTimeout(() => {
  const loadingElement = document.querySelector('.app-loading');
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
    console.log('Forced removal of loading indicator');
  }
}, 2000);
