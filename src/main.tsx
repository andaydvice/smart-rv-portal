
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization...');

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  console.log('Root element found, creating React root...');
  
  const root = ReactDOM.createRoot(rootElement);
  
  console.log('React root created, rendering App component...');
  
  // Render without StrictMode in development to reduce double-rendering issues
  root.render(<App />);

  console.log('App component rendered successfully');
});

// Backup initialization in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, initializing app directly');
  setTimeout(() => {
    const rootElement = document.getElementById('root');
    if (rootElement && !rootElement.hasChildNodes()) {
      console.log('Root element found empty, creating React root...');
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    }
  }, 1);
}
