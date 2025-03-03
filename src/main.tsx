
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application...');

// Render the app
const rootElement = document.getElementById('root');

if (rootElement) {
  // Remove loading indicator if present
  const loadingElement = document.querySelector('.app-loading');
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }

  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('Application rendered successfully');
}
