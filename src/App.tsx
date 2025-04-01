
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StorageFacilities from './pages/StorageFacilities';
import MapDemoPage from './pages/MapDemoPage';
import OpaqueMapExample from './pages/OpaqueMapExample';
import Features from './pages/Features';
import SmartAutomation from './pages/features/SmartAutomation';
import NotFound from './pages/NotFound';
import { routes } from './routes/routes';

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
