
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting application initialization with enhanced error handling...');

// Function to check for CSS loading errors with enhanced error handling
const monitorCssLoading = () => {
  console.log('Monitoring CSS loading with enhanced error recovery...');
  
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
          // Attempt to reload the stylesheet if it fails to load
          if (sheet.href) {
            console.log(`  Attempting to reload stylesheet: ${sheet.href}`);
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = sheet.href + '?reload=' + new Date().getTime();
            document.head.appendChild(link);
          }
        }
      } catch (sheetErr) {
        console.error(`Error accessing stylesheet ${i}:`, sheetErr);
      }
    }
  } catch (err) {
    console.error('Failed to monitor CSS:', err);
  }
};

// Ensure critical CSS is applied immediately for rendering
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

// Simplified WebSocket error handling that avoids TypeScript errors
const setupWebSocketErrorHandling = () => {
  console.log('Setting up WebSocket error recovery (simplified version)...');
  
  // Store original WebSocket constructor
  const OriginalWebSocket = window.WebSocket;
  
  // Create a wrapper function that adds error handling
  function EnhancedWebSocket(url: string | URL, protocols?: string | string[]) {
    // Create the actual WebSocket instance using the original constructor
    const ws = new OriginalWebSocket(url, protocols);
    
    // Add error handling to this instance
    ws.addEventListener('error', (event) => {
      console.error('WebSocket connection error:', event);
      console.log('Attempting to recover from WebSocket error...');
      
      // Schedule a reconnection attempt
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket to:', url);
        try {
          new OriginalWebSocket(url instanceof URL ? url.toString() : url, protocols);
        } catch (e) {
          console.error('WebSocket reconnection failed:', e);
        }
      }, 3000);
    });
    
    return ws;
  }
  
  // Make the enhanced constructor properly inherit from original
  EnhancedWebSocket.prototype = OriginalWebSocket.prototype;
  
  // Type assertion to satisfy TypeScript
  window.WebSocket = EnhancedWebSocket as unknown as typeof WebSocket;
};

// Setup WebSocket error handling
setupWebSocketErrorHandling();

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
    
    // Monitor CSS loading with multiple retry attempts
    let cssMonitorAttempts = 0;
    const maxCssMonitorAttempts = 3;
    
    const monitorCssWithRetry = () => {
      if (cssMonitorAttempts < maxCssMonitorAttempts) {
        setTimeout(() => {
          cssMonitorAttempts++;
          console.log(`CSS monitoring attempt ${cssMonitorAttempts}/${maxCssMonitorAttempts}`);
          monitorCssLoading();
          monitorCssWithRetry();
        }, 500 * cssMonitorAttempts);
      }
    };
    
    monitorCssWithRetry();
    
    // Render with error boundary
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log('App component rendered successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    // Fallback error display with retry button
    document.body.innerHTML = `
      <div style="color: white; background: #333; padding: 20px; font-family: sans-serif;">
        <h1>Application Error</h1>
        <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="location.reload()">Reload</button>
        <button onclick="localStorage.clear(); location.reload();">Clear Cache & Reload</button>
      </div>
    `;
  }
};

// Attempt to start the application immediately
console.log('Starting application immediately...');
startApp();

// Set a fallback timer in case the application doesn't start
setTimeout(() => {
  if (document.body.innerHTML.includes('Loading application...')) {
    console.log('Application may have failed to start, attempting recovery...');
    startApp();
  }
}, 2000);
