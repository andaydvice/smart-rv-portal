
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/base.css'
import './styles/emergency-marker-fix.css'  // Add emergency marker styles globally
import './styles/map-optimizations.css'     // Add map optimization styles globally

// Ensure emergency styles are loaded first
import('./styles/marker-fix.css')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
