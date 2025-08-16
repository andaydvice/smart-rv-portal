import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

// Mount the application with simplified error handling
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; color: red;">ERROR: Root element not found</div>'
} else {
  console.log('Mounting React app...')
  try {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    )
    console.log('React app mounted successfully!')
  } catch (error) {
    console.error('Failed to mount React application:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; background: #080F1F; color: white; min-height: 100vh;">
        <h2>App Failed to Load</h2>
        <p>Error: ${error?.message || 'Unknown error'}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 10px; background: #5B9BD5; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `
  }
}
