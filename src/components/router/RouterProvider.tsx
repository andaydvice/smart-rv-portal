
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { initNavigationDebugging } from '@/utils/diagnostics/navigationDebug';
import { fixBlankScreen } from '@/utils/navigation/fixNavigation';

// Simple loading component without spinner
const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#080F1F] text-white">
      <div className="text-center">
        <p className="text-lg">Loading page...</p>
      </div>
    </div>
  );
};

// Import pages with error boundaries
const Index = lazy(() => import('@/pages/Index').catch(err => {
  console.error('Failed to load Index page:', err);
  return { default: () => <div className="text-white p-8">Failed to load homepage. Please try refreshing.</div> };
}));

const StorageFacilities = lazy(() => import('@/pages/StorageFacilities').catch(err => {
  console.error('Failed to load StorageFacilities page:', err);
  return { default: () => <div className="text-white p-8">Failed to load storage facilities page.</div> };
}));

const RVWeather = lazy(() => import('@/pages/RVWeather').catch(err => {
  console.error('Failed to load RVWeather page:', err);
  return { default: () => <div className="text-white p-8">Failed to load weather page.</div> };
}));

// Import rest of pages with error handling
const Calculators = lazy(() => import('@/pages/Calculators').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load calculators page.</div> };
}));
const Documentation = lazy(() => import('@/pages/Documentation').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load documentation page.</div> };
}));
const Troubleshooting = lazy(() => import('@/pages/Troubleshooting').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load troubleshooting page.</div> };
}));
const Contact = lazy(() => import('@/pages/Contact').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load contact page.</div> };
}));
const StoragePreparationChecklist = lazy(() => import('@/pages/StoragePreparationChecklist').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load checklist page.</div> };
}));
const ScheduleDemo = lazy(() => import('@/pages/ScheduleDemo').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load demo scheduling page.</div> };
}));
const WaterSystems = lazy(() => import('@/pages/features/WaterSystems').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load water systems page.</div> };
}));
const PreviewDebugDemo = lazy(() => import('@/components/debug/PreviewDebugDemo').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load debug demo.</div> };
}));

// Import model pages with error handling
const Models = lazy(() => import('@/pages/Models').catch(err => {
  console.error('Failed to load Models page:', err);
  return { default: () => <div className="text-white p-8">Failed to load models page.</div> };
}));
const CompactModel = lazy(() => import('@/pages/models/CompactModel').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load compact model page.</div> };
}));
const LuxuryModel = lazy(() => import('@/pages/models/LuxuryModel').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load luxury model page.</div> };
}));
const AdventureModel = lazy(() => import('@/pages/models/AdventureModel').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load adventure model page.</div> };
}));
const CompareModels = lazy(() => import('@/pages/models/CompareModels').catch(err => {
  console.error('Failed to load page:', err);
  return { default: () => <div className="text-white p-8">Failed to load model comparison page.</div> };
}));

// This component will track location changes
const LocationTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    
    // Apply fixes for blank screens after route changes
    fixBlankScreen();
    
    // Force background color on every route change
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    
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
          
          {/* Models routes - explicitly defined */}
          <Route path="/models" element={<Models />} />
          <Route path="/models/compact" element={<CompactModel />} />
          <Route path="/models/luxury" element={<LuxuryModel />} />
          <Route path="/models/adventure" element={<AdventureModel />} />
          <Route path="/models/compare" element={<CompareModels />} />
          <Route path="/compare-models" element={<CompareModels />} />
          
          {/* Redirect all 404s to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterProvider;
