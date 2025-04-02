
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { initNavigationDebugging } from '@/utils/diagnostics/navigationDebug';
import { fixBlankScreen } from '@/utils/navigation/fixNavigation';

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

// Loading component with visibility enforcement and timeout
const PageLoading = () => {
  const [isLongLoad, setIsLongLoad] = useState(false);

  // Force document background color in loading state
  useEffect(() => {
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    
    // Check if loading is taking too long
    const timeoutId = setTimeout(() => {
      setIsLongLoad(true);
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#080F1F] text-white"
         style={{ visibility: 'visible', opacity: 1, backgroundColor: '#080F1F' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-2"></div>
        <p>Loading page...</p>
        
        {isLongLoad && (
          <div className="mt-4">
            <p className="text-sm text-gray-400">Taking longer than expected...</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 bg-[#5B9BD5] text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
            >
              Refresh page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// This component will track and fix location changes
const LocationTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    
    // Apply fixes for blank screens after route changes
    setTimeout(() => {
      fixBlankScreen();
    }, 100);
    
  }, [location]);
  
  return null;
};

const RouterProvider: React.FC = () => {
  const [isNavigating, setIsNavigating] = useState(false);

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
    
    // Listen for navigation events
    const handleNavigation = () => {
      console.log('Navigation detected');
      setIsNavigating(true);
      
      // Reset navigation state after animation completes
      setTimeout(() => {
        setIsNavigating(false);
        
        // Fix blank screen after navigation
        fixBlankScreen();
      }, 500);
    };
    
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('lovable-navigation', handleNavigation);
    document.addEventListener('recovery-attempted', () => {
      // If recovery was attempted, we should restart the router
      console.log('Recovery attempted, forcing router refresh');
      setIsNavigating(prev => !prev); // Toggle to force re-render
    });
    
    // Apply emergency styles immediately
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = '#080F1F';
      rootElement.style.visibility = 'visible';
      rootElement.style.opacity = '1';
    }
    
    // Attempt to fix blank screen on initial load
    setTimeout(() => {
      fixBlankScreen();
    }, 1000);
    
    return () => {
      document.body.classList.remove('navigation-enabled');
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('lovable-navigation', handleNavigation);
      document.removeEventListener('recovery-attempted', handleNavigation);
    };
  }, []);

  return (
    <Router>
      {/* Navigation overlay that appears during page transitions */}
      {isNavigating && (
        <div className="fixed inset-0 bg-[#080F1F] z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      
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
