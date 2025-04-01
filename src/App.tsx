
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StorageFacilities from './pages/StorageFacilities';
import MapDemoPage from './pages/MapDemoPage';
import OpaqueMapExample from './pages/OpaqueMapExample';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,  // 1 minute
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<StorageFacilities />} />
          <Route path="/storage-facilities" element={<StorageFacilities />} />
          <Route path="/map-demo" element={<MapDemoPage />} />
          <Route path="/opaque-map-example" element={<OpaqueMapExample />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
