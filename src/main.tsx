
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization...');

// Function to check for CSS loading errors
const monitorCssLoading = () => {
  console.log('Monitoring CSS loading...');
  
  const styleSheets = document.styleSheets;
  console.log(`Found ${styleSheets.length} stylesheets`);
  
  try {
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        const sheet = styleSheets[i];
        console.log(`Sheet ${i}: ${sheet.href || 'inline'}`);
        try {
          const rules = sheet.cssRules || sheet.rules;
          console.log(`  Rules: ${rules.length}`);
        } catch (cssErr) {
          console.warn(`  Cannot access rules (likely CORS issue): ${cssErr}`);
        }
      } catch (sheetErr) {
        console.error(`Error accessing stylesheet ${i}:`, sheetErr);
      }
    }
  } catch (err) {
    console.error('Failed to monitor CSS:', err);
  }
};

// Apply critical styles directly for initial render
document.documentElement.style.visibility = 'visible';
document.documentElement.style.display = 'block';
document.documentElement.style.opacity = '1';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';
document.body.style.opacity = '1';

// Force style application before React initializes
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.minHeight = '100vh';
document.body.style.width = '100%';

const startApp = () => {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    // Ensure root is visible
    rootElement.style.visibility = 'visible';
    rootElement.style.display = 'block';
    rootElement.style.opacity = '1';

    console.log('Root element found, creating React root...');
    
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('React root created, rendering App component...');
    
    // Monitor CSS loading after a short delay
    setTimeout(monitorCssLoading, 500);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log('App component rendered successfully');

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
    
    // Fallback error display
    document.body.innerHTML = `
      <div style="color: white; background: #333; padding: 20px; font-family: sans-serif;">
        <h1>Application Error</h1>
        <p>${error.message}</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `;
    
    throw error;
  }
};

startApp();
