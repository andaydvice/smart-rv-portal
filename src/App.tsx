
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StorageFacilities from './pages/StorageFacilities';
import MapDemoPage from './pages/MapDemoPage';
import OpaqueMapExample from './pages/OpaqueMapExample';
import Features from './pages/Features';
import SmartAutomation from './pages/features/SmartAutomation';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StorageFacilities />} />
        <Route path="/storage-facilities" element={<StorageFacilities />} />
        <Route path="/map-demo" element={<MapDemoPage />} />
        <Route path="/opaque-map-example" element={<OpaqueMapExample />} />
        <Route path="/features" element={<Features />} />
        <Route path="/features/smart-automation" element={<SmartAutomation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
