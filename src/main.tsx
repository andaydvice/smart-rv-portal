import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization...');

const startApp = () => {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
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

    // Add HMR handling
    if (import.meta.hot) {
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
    throw error;
  }
};

startApp();