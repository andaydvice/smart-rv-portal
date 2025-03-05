
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization...');

// Ensure the app is rendered as soon as possible
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  console.log('Root element found, creating React root...');
  
  const root = ReactDOM.createRoot(rootElement);
  
  console.log('React root created, rendering App component...');
  
  // Render without StrictMode in development to reduce double-rendering issues
  root.render(<App />);

  console.log('App component rendered successfully');
}

// Force visibility of content
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
});
