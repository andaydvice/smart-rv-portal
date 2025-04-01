
import React from 'react';
import StorageFacilities from '@/pages/StorageFacilities';
import MapDemoPage from '@/pages/MapDemoPage';
import OpaqueMapExample from '@/pages/OpaqueMapExample';
import Features from '@/pages/Features';
import SmartAutomation from '@/pages/features/SmartAutomation';
import NotFound from '@/pages/NotFound';

export const routes = [
  {
    path: '/',
    element: <StorageFacilities />
  },
  {
    path: '/storage-facilities',
    element: <StorageFacilities />
  },
  {
    path: '/map-demo',
    element: <MapDemoPage />
  },
  {
    path: '/opaque-map-example',
    element: <OpaqueMapExample />
  },
  {
    path: '/features',
    element: <Features />
  },
  {
    path: '/features/smart-automation',
    element: <SmartAutomation />
  },
  {
    path: '*',
    element: <NotFound />
  }
];
