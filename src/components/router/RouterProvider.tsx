
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { initNavigationDebugging } from '@/utils/diagnostics/navigationDebug';
import { fixBlankScreen } from '@/utils/navigation/fixNavigation';
import CustomLoader from '@/components/ui/CustomLoader';

// Import pages
const Index = lazy(() => import('@/pages/Index'));
const StorageFacilities = lazy(() => import('@/pages/StorageFacilities'));
const RVWeather = lazy(() => import('@/pages/RVWeather'));
const Calculators = lazy(() => import('@/pages/Calculators'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const Troubleshooting = lazy(() => import('@/pages/Troubleshooting'));
const Contact = lazy(() => import('@/pages/Contact'));
const StoragePreparationChecklist = lazy(() => import('@/pages/StoragePreparationChecklist'));
const ScheduleDemo = lazy(() => import('@/pages/ScheduleDemo'));
const WaterSystems = lazy(() => import('@/pages/features/WaterSystems'));
const PreviewDebugDemo = lazy(() => import('@/components/debug/PreviewDebugDemo'));

// Simple loading component
const PageLoading = () => {
  return (
    <CustomLoader 
      message="Loading page..." 
      isFullScreen={true}
    />
  );
};

// This component will track location changes
const LocationTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    
    // Apply fixes for blank screens after route changes
    fixBlankScreen();
    
  }, [location]);
  
  return null;
};

const RouterProvider: React.FC = () => {
  useEffect(() => {
    // Initialize navigation debugging
    initNavigationDebugging();
    
    console.log('RouterProvider mounted');
    console.log('Current path:', window.location.pathname);
    
    // Force background color
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    
    // Add class to body for styling during navigation
    document.body.classList.add('navigation-enabled');
    
    // Apply emergency styles immediately
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = '#080F1F';
      rootElement.style.visibility = 'visible';
      rootElement.style.opacity = '1';
    }
    
    // Attempt to fix blank screen on initial load
    fixBlankScreen();
    
    return () => {
      document.body.classList.remove('navigation-enabled');
    };
  }, []);

  return (
    <Router>
      <LocationTracker />
      
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/storage-facilities" element={<StorageFacilities />} />
          <Route path="/rv-weather" element={<RVWeather />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/storage-preparation-checklist" element={<StoragePreparationChecklist />} />
          <Route path="/schedule-demo" element={<ScheduleDemo />} />
          <Route path="/features/water-systems" element={<WaterSystems />} />
          <Route path="/debug" element={<PreviewDebugDemo />} />
          
          {/* Redirect all 404s to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterProvider;
