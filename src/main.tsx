
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application...');

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

  // Force visibility check after render
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-section, section.h-screen');
    heroElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.display = 'flex';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
      }
    });
  }, 500);
}
