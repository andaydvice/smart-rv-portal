
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

// Define routes
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/models",
    element: <Models />,
  },
  {
    path: "/models/compact",
    element: <CompactModel />,
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />,
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/features/audio-system",
    element: <AudioSystem />,
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />,
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />,
  },
  {
    path: "/features/internet-connectivity",
    element: <InternetConnectivity />,
  },
  {
    path: "/features/navigation-system",
    element: <NavigationSystem />,
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />,
  },
  {
    path: "/features/automated-driving",
    element: <AutomatedDriving />,
  },
  {
    path: "/technology",
    element: <Technology />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/documentation/complete",
    element: <CompleteDocumentation />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/calculators",
    element: <Calculators />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
  },
  {
    path: "/storage-checklist",
    element: <StoragePreparationChecklist />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
  },
  {
    path: "/map-icon-demo",
    element: <MapIconDemo />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
  {
    path: "/facility-map-demo",
    element: <MapFacilityDemo />,
  },
];

export default routes;
