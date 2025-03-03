
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application...');

// Force document visibility immediately
document.documentElement.style.visibility = 'visible';
document.documentElement.style.display = 'block';
document.documentElement.style.opacity = '1';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';
document.body.style.opacity = '1';

// Remove loading indicator immediately
const loadingIndicator = document.querySelector('.app-loading');
if (loadingIndicator && loadingIndicator.parentNode) {
  console.log('Removing loading indicator immediately');
  loadingIndicator.parentNode.removeChild(loadingIndicator);
}

// Render the app
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
  
  console.log('Application rendered successfully');
}

// Force visibility on all elements
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  document.querySelectorAll('section, h1, h2, p, button, a, img, div').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
    }
  });
});

// Extra safety - remove loading screen after timeout
setTimeout(() => {
  const loadingElement = document.querySelector('.app-loading');
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
    console.log('Forced removal of loading indicator');
  }
}, 100);
