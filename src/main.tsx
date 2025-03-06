
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization...');

const startApp = () => {
  try {
    console.log('Finding root element...');
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Root element not found in DOM');
      throw new Error('Root element not found');
    }

    console.log('Root element found, creating React root...');
    
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('React root created, rendering App component...');
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log('App component rendered successfully');

    if (import.meta.hot) {
      console.log('HMR is available');
      import.meta.hot.accept('./App', () => {
        console.log('HMR update detected, re-rendering App component...');
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      });
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to load application. Please check console for details.</div>';
    throw error;
  }
};

// Add a small delay to ensure DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, starting app in 100ms...');
  setTimeout(startApp, 100);
});

// Fallback if DOMContentLoaded doesn't trigger
setTimeout(() => {
  console.log('Fallback initialization after 1000ms');
  if (!document.getElementById('root')?.hasChildNodes()) {
    startApp();
  }
}, 1000);
