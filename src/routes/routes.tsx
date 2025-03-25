
import React from 'react';
import { RouteObject } from 'react-router-dom';

// Pages
import Index from '../pages/Index';
import Features from '../pages/Features';
import Models from '../pages/Models';
import AudioSystem from '../pages/features/AudioSystem';
import SmartTV from '../pages/features/SmartTV';
import AutomatedDriving from '../pages/features/AutomatedDriving';
import InternetConnectivity from '../pages/features/InternetConnectivity';
import NavigationSystem from '../pages/features/NavigationSystem';
import PowerManagement from '../pages/features/PowerManagement';
import SecuritySystem from '../pages/features/SecuritySystem';
import SmartKitchen from '../pages/features/SmartKitchen';
import ScheduleDemo from '../pages/ScheduleDemo';
import Calculators from '../pages/Calculators';
import Contact from '../pages/Contact';
import Auth from '../pages/Auth';
import Documentation from '../pages/Documentation';
import CompleteDocumentation from '../pages/documentation/CompleteDocumentation';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Technology from '../pages/Technology';
import AdventureModel from '../pages/models/AdventureModel';
import CompactModel from '../pages/models/CompactModel';
import LuxuryModel from '../pages/models/LuxuryModel';
import CompareModels from '../pages/models/CompareModels';
import RVWeather from '../pages/RVWeather';
import VoiceControl from '../pages/VoiceControl';
import Troubleshooting from '../pages/Troubleshooting';
import StorageFacilities from '../pages/StorageFacilities';
import StoragePreparationChecklist from '../pages/StoragePreparationChecklist';
import MapIconDemo from '../pages/MapIconDemo'; // Add the new page import

// Define routes
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/features',
    element: <Features />,
  },
  {
    path: '/features/audio-system',
    element: <AudioSystem />,
  },
  {
    path: '/features/audio',
    element: <AudioSystem />,
  },
  {
    path: '/features/smart-tv',
    element: <SmartTV />,
  },
  {
    path: '/features/automated-driving',
    element: <AutomatedDriving />,
  },
  {
    path: '/features/internet-connectivity',
    element: <InternetConnectivity />,
  },
  {
    path: '/features/connectivity',
    element: <InternetConnectivity />,
  },
  {
    path: '/features/navigation-system',
    element: <NavigationSystem />,
  },
  {
    path: '/features/power-management',
    element: <PowerManagement />,
  },
  {
    path: '/features/security-system',
    element: <SecuritySystem />,
  },
  {
    path: '/features/smart-kitchen',
    element: <SmartKitchen />,
  },
  {
    path: '/models',
    element: <Models />,
  },
  {
    path: '/models/adventure',
    element: <AdventureModel />,
  },
  {
    path: '/models/compact',
    element: <CompactModel />,
  },
  {
    path: '/models/luxury',
    element: <LuxuryModel />,
  },
  {
    path: '/models/compare',
    element: <CompareModels />,
  },
  {
    path: '/schedule-demo',
    element: <ScheduleDemo />,
  },
  {
    path: '/calculators',
    element: <Calculators />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/documentation',
    element: <Documentation />,
  },
  {
    path: '/documentation/complete',
    element: <CompleteDocumentation />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPost />,
  },
  {
    path: '/technology',
    element: <Technology />,
  },
  {
    path: '/weather',
    element: <RVWeather />,
  },
  {
    path: '/voice-control',
    element: <VoiceControl />,
  },
  {
    path: '/troubleshooting',
    element: <Troubleshooting />,
  },
  {
    path: '/storage-facilities',
    element: <StorageFacilities />,
  },
  {
    path: '/storage-preparation-checklist',
    element: <StoragePreparationChecklist />,
  },
  {
    path: '/map-icon-demo',
    element: <MapIconDemo />,
  },
];
