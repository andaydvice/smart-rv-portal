
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization with enhanced error handling...');

// Ensure critical CSS is applied immediately for rendering
document.documentElement.style.visibility = 'visible';
document.documentElement.style.display = 'block';
document.documentElement.style.opacity = '1';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';
document.body.style.opacity = '1';

// Force style application before React initializes
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.minHeight = '100vh';
document.body.style.width = '100%';

// Function to ensure React root is visible
const ensureRootVisibility = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.visibility = 'visible';
    rootElement.style.display = 'block';
    rootElement.style.opacity = '1';
  }
};

// Call it immediately
ensureRootVisibility();

// Simple initialization without complex error handling that might be blocking
const startApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }
  
  // Ensure root is visible
  rootElement.style.visibility = 'visible';
  rootElement.style.display = 'block';
  rootElement.style.opacity = '1';

  console.log('Root element found, creating React root...');
  
  const root = ReactDOM.createRoot(rootElement);
  
  console.log('React root created, rendering App component...');
  
  // Render with simple error boundary
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log('App component rendered successfully');
  
  // Remove any lingering loading indicators
  const loadingIndicator = document.querySelector('.app-loading');
  if (loadingIndicator && loadingIndicator.parentNode) {
    loadingIndicator.parentNode.removeChild(loadingIndicator);
  }
};

// Start application immediately
startApp();

// Also set a short backup in case of delays
setTimeout(() => {
  if (document.body.innerHTML.includes('Loading application...')) {
    console.log('Application may be delayed, forcing start...');
    startApp();
  }
}, 500);
