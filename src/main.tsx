
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application...');

// Ensure critical CSS is applied immediately
const injectCriticalStyles = () => {
  document.body.style.display = 'block';
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  const root = document.getElementById('root');
  if (root) {
    root.style.display = 'block';
    root.style.visibility = 'visible';
    root.style.opacity = '1';
  }
};

// Apply immediately
injectCriticalStyles();

// Render the app
const rootElement = document.getElementById('root');

if (rootElement) {
  // Ensure visibility of root element
  rootElement.style.display = 'block';
  rootElement.style.visibility = 'visible';
  rootElement.style.opacity = '1';
  
  // Remove loading indicator if present
  const loadingElement = document.querySelector('.app-loading');
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }

  const root = ReactDOM.createRoot(rootElement);
  
  // Handle unhandled promise rejections to prevent runtime errors
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    // Prevent the default handling of the event
    event.preventDefault();
  });
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('Application rendered successfully');

  // Continue to force visibility multiple times after render
  const forceVisibility = () => {
    document.body.style.display = 'block';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    if (rootElement) {
      rootElement.style.display = 'block';
      rootElement.style.visibility = 'visible';
      rootElement.style.opacity = '1';
    }
    
    const heroElements = document.querySelectorAll('.hero-section, section.h-screen');
    heroElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.display = 'flex';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
      }
    });
  };
  
  // Apply multiple times to catch any late-rendering elements
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 500);
  setTimeout(forceVisibility, 1000);
  setTimeout(forceVisibility, 2000);
}
