
import React from "react";
import { RouteObject } from "react-router-dom";
import ErrorDisplay from "../components/error/ErrorDisplay";

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
import SmartAutomation from "../pages/features/SmartAutomation";
import Entertainment from "../pages/features/Entertainment";
import WaterSystems from "../pages/features/WaterSystems";
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
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorDisplay error={{message: "Page not found", statusCode: 404}} />
  },
  {
    path: "/models",
    element: <Models />,
    errorElement: <ErrorDisplay error={{message: "Models page not found", statusCode: 404}} />
  },
  {
    path: "/models/compact",
    element: <CompactModel />,
    errorElement: <ErrorDisplay error={{message: "Compact Model page not found", statusCode: 404}} />
  },
  // Add proper route for compact-model URL pattern
  {
    path: "/models/compact-model",
    element: <CompactModel />,
    errorElement: <ErrorDisplay error={{message: "Compact Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
    errorElement: <ErrorDisplay error={{message: "Luxury Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />,
    errorElement: <ErrorDisplay error={{message: "Adventure Model page not found", statusCode: 404}} />
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
    errorElement: <ErrorDisplay error={{message: "Compare Models page not found", statusCode: 404}} />
  },
  // Add the correct path for compare-models as well to handle both URL patterns
  {
    path: "/models/compare-models",
    element: <CompareModels />,
    errorElement: <ErrorDisplay error={{message: "Compare Models page not found", statusCode: 404}} />
  },
  {
    path: "/compare-models",
    element: <CompareModels />,
    errorElement: <ErrorDisplay error={{message: "Compare Models page not found", statusCode: 404}} />
  },
  {
    path: "/features",
    element: <Features />,
    errorElement: <ErrorDisplay error={{message: "Features page not found", statusCode: 404}} />
  },
  {
    path: "/features/audio-system",
    element: <AudioSystem />,
    errorElement: <ErrorDisplay error={{message: "Audio System page not found", statusCode: 404}} />
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />,
    errorElement: <ErrorDisplay error={{message: "Smart TV page not found", statusCode: 404}} />
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
    errorElement: <ErrorDisplay error={{message: "Smart Kitchen page not found", statusCode: 404}} />
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />,
    errorElement: <ErrorDisplay error={{message: "Power Management page not found", statusCode: 404}} />
  },
  {
    path: "/features/internet-connectivity",
    element: <InternetConnectivity />,
    errorElement: <ErrorDisplay error={{message: "Internet Connectivity page not found", statusCode: 404}} />
  },
  {
    path: "/features/navigation-system",
    element: <NavigationSystem />,
    errorElement: <ErrorDisplay error={{message: "Navigation System page not found", statusCode: 404}} />
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />,
    errorElement: <ErrorDisplay error={{message: "Security System page not found", statusCode: 404}} />
  },
  {
    path: "/features/automated-driving",
    element: <AutomatedDriving />,
    errorElement: <ErrorDisplay error={{message: "Automated Driving page not found", statusCode: 404}} />
  },
  {
    path: "/features/smart-automation",
    element: <SmartAutomation />,
    errorElement: <ErrorDisplay error={{message: "Smart Automation page not found", statusCode: 404}} />
  },
  {
    path: "/features/entertainment",
    element: <Entertainment />,
    errorElement: <ErrorDisplay error={{message: "Entertainment page not found", statusCode: 404}} />
  },
  {
    path: "/features/water-systems",
    element: <WaterSystems />,
    errorElement: <ErrorDisplay error={{message: "Water Systems page not found", statusCode: 404}} />
  },
  {
    path: "/technology",
    element: <Technology />,
    errorElement: <ErrorDisplay error={{message: "Technology page not found", statusCode: 404}} />
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorDisplay error={{message: "Contact page not found", statusCode: 404}} />
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorDisplay error={{message: "Blog page not found", statusCode: 404}} />
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    errorElement: <ErrorDisplay error={{message: "Blog post not found", statusCode: 404}} />
  },
  {
    path: "/documentation",
    element: <Documentation />,
    errorElement: <ErrorDisplay error={{message: "Documentation page not found", statusCode: 404}} />
  },
  {
    path: "/documentation/complete",
    element: <CompleteDocumentation />,
    errorElement: <ErrorDisplay error={{message: "Complete Documentation page not found", statusCode: 404}} />
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorDisplay error={{message: "Authentication page not found", statusCode: 404}} />
  },
  {
    path: "/calculators",
    element: <Calculators />,
    errorElement: <ErrorDisplay error={{message: "Calculators page not found", statusCode: 404}} />
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
    errorElement: <ErrorDisplay error={{message: "Voice Control page not found", statusCode: 404}} />
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
    errorElement: <ErrorDisplay error={{message: "Troubleshooting page not found", statusCode: 404}} />
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
    errorElement: <ErrorDisplay error={{message: "RV Weather page not found", statusCode: 404}} />
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklist />,
    errorElement: <ErrorDisplay error={{message: "Storage Preparation Checklist page not found", statusCode: 404}} />
  },
  {
    path: "/storage-checklist",
    element: <StoragePreparationChecklist />,
    errorElement: <ErrorDisplay error={{message: "Storage Checklist page not found", statusCode: 404}} />
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
    errorElement: <ErrorDisplay error={{message: "Storage Facilities page not found", statusCode: 404}} />
  },
  {
    path: "/map-icon-demo",
    element: <MapIconDemo />,
    errorElement: <ErrorDisplay error={{message: "Map Icon Demo page not found", statusCode: 404}} />
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
    errorElement: <ErrorDisplay error={{message: "Schedule Demo page not found", statusCode: 404}} />
  },
  {
    path: "/facility-map-demo",
    element: <MapFacilityDemo />,
    errorElement: <ErrorDisplay error={{message: "Facility Map Demo page not found", statusCode: 404}} />
  },
  // Catch-all route for 404s
  {
    path: "*",
    element: <ErrorDisplay error={{message: "Page not found", statusCode: 404}} />
  }
];

// For backward compatibility
export default routes;
