
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Global error handler to recover from fatal errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  const rootElement = document.getElementById('root');
  
  // If we have a fatal error that might freeze the UI, we attempt to recover
  if (rootElement && !rootElement.hasChildNodes()) {
    try {
      // Force a fresh render of the app
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (e) {
      console.error('Recovery attempt failed:', e);
    }
  }
});

const startApp = () => {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Root element not found in DOM');
      throw new Error('Root element not found');
    }
    
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    if (import.meta.hot) {
      import.meta.hot.accept('./App', () => {
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

// Start app when DOM is ready
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', startApp);
} else {
  // DOM already loaded, start immediately
  startApp();
}
