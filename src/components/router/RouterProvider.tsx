
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { initNavigationDebugging } from '@/utils/diagnostics/navigationDebug';

// Import pages
const Index = lazy(() => import('@/pages/Index'));
const StorageFacilities = lazy(() => import('@/pages/StorageFacilities'));
const RVWeather = lazy(() => import('@/pages/RVWeather'));
const Calculators = lazy(() => import('@/pages/Calculators'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const Troubleshooting = lazy(() => import('@/pages/Troubleshooting'));
const Contact = lazy(() => import('@/pages/ContactPage'));
const StoragePrepChecklist = lazy(() => import('@/pages/StoragePrepChecklist'));
const ScheduleDemo = lazy(() => import('@/pages/ScheduleDemo'));

// Loading component
const PageLoading = () => (
  <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
    <div className="text-center">
      <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-2"></div>
      <p>Loading page...</p>
    </div>
  </div>
);

const RouterProvider: React.FC = () => {
  useEffect(() => {
    // Initialize navigation debugging
    initNavigationDebugging();
    
    console.log('RouterProvider mounted');
    console.log('Current path:', window.location.pathname);
    
    // Add class to body for styling during navigation
    document.body.classList.add('navigation-enabled');
    
    return () => {
      document.body.classList.remove('navigation-enabled');
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/storage-facilities" element={<StorageFacilities />} />
          <Route path="/rv-weather" element={<RVWeather />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/storage-preparation-checklist" element={<StoragePrepChecklist />} />
          <Route path="/schedule-demo" element={<ScheduleDemo />} />
          
          {/* Redirect all 404s to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterProvider;
