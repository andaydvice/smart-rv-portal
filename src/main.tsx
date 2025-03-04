
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Render the app
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('Application rendered successfully');
}
