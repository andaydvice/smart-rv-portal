
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import './index.css'
import './styles/base.css'
import './styles/animations.css'
import './styles/forms.css'
import './styles/layout.css'
import './styles/components/calendar.css'
import './styles/pages/storage-checklist.css'
import './styles/map-optimizations.css' // Add map performance optimizations

// Create a client with better performance settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // Keep data fresh for 1 minute
      gcTime: 300000, // Cache for 5 minutes (replaces cacheTime)
      refetchOnWindowFocus: false, // Don't refetch on focus
      retry: 1, // Reduce retry attempts
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
      <SonnerToaster position="top-right" richColors />
    </QueryClientProvider>
  </React.StrictMode>,
)
