
import React from "react";
import { RouteObject } from "react-router-dom";

// Import pages
import Index from "../pages/Index";
import Models from "../pages/Models";
import CompactModel from "../pages/models/CompactModel";
import LuxuryModel from "../pages/models/LuxuryModel";
import AdventureModel from "../pages/models/AdventureModel";
import CompareModels from "../pages/models/CompareModels";
import Features from "../pages/Features";
import AudioSystem from "../pages/features/AudioSystem";
import SmartTV from "../pages/features/SmartTV";
import SmartKitchen from "../pages/features/SmartKitchen";
import PowerManagement from "../pages/features/PowerManagement";
import InternetConnectivity from "../pages/features/InternetConnectivity";
import NavigationSystem from "../pages/features/NavigationSystem";
import SecuritySystem from "../pages/features/SecuritySystem";
import AutomatedDriving from "../pages/features/AutomatedDriving";
import Technology from "../pages/Technology";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Documentation from "../pages/Documentation";
import Auth from "../pages/Auth";
import CompleteDocumentation from "../pages/documentation/CompleteDocumentation";
import Calculators from "../pages/Calculators";
import VoiceControl from "../pages/VoiceControl";
import Troubleshooting from "../pages/Troubleshooting";
import RVWeather from "../pages/RVWeather";
import StoragePreparationChecklist from "../pages/StoragePreparationChecklist";
import StorageFacilities from "../pages/StorageFacilities";
import MapIconDemo from "../pages/MapIconDemo";
import ScheduleDemo from "../pages/ScheduleDemo";
import MapFacilityDemo from "../pages/MapFacilityDemo";
import WaterSystems from "../pages/features/WaterSystems";
import ErrorPage from "../pages/ErrorPage";

// Define routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models",
    element: <Models />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compact",
    element: <CompactModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features",
    element: <Features />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/audio-system",
    element: <AudioSystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/internet-connectivity",
    element: <InternetConnectivity />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/navigation-system",
    element: <NavigationSystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/automated-driving",
    element: <AutomatedDriving />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/features/water-systems",
    element: <WaterSystems />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/technology",
    element: <Technology />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation/complete",
    element: <CompleteDocumentation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calculators",
    element: <Calculators />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/storage-checklist",
    element: <StoragePreparationChecklist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/map-icon-demo",
    element: <MapIconDemo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/facility-map-demo",
    element: <MapFacilityDemo />,
    errorElement: <ErrorPage />,
  },
  // Add a catch-all route for 404 pages
  {
    path: "*",
    element: <ErrorPage />,
  }
];

// For backward compatibility
export default routes;
