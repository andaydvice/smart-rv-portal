
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StorageFacilities from './pages/StorageFacilities';
import MapDemoPage from './pages/MapDemoPage';
import OpaqueMapExample from './pages/OpaqueMapExample';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StorageFacilities />} />
        <Route path="/storage-facilities" element={<StorageFacilities />} />
        <Route path="/map-demo" element={<MapDemoPage />} />
        <Route path="/opaque-map-example" element={<OpaqueMapExample />} />
      </Routes>
    </Router>
  );
}

export default App;
