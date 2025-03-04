
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Models from "@/pages/Models";
import Technology from "@/pages/Technology";
import Contact from "@/pages/Contact";
import ScheduleDemo from "@/pages/ScheduleDemo";
import Calculators from "@/pages/Calculators";
import StorageFacilities from "@/pages/StorageFacilities";
import RVWeather from "@/pages/RVWeather";
import Troubleshooting from "@/pages/Troubleshooting";
import StoragePreparationChecklistPage from "@/pages/StoragePreparationChecklistPage";
import CompactModel from "@/pages/models/CompactModel";
import AdventureModel from "@/pages/models/AdventureModel";
import LuxuryModel from "@/pages/models/LuxuryModel";
import CompareModels from "@/pages/models/CompareModels";
import Documentation from "@/pages/Documentation";
import CompleteDocumentation from "@/pages/documentation/CompleteDocumentation";
import Features from "@/pages/Features";
import NavigationSystem from "@/pages/features/NavigationSystem";
import SecuritySystem from "@/pages/features/SecuritySystem";
import PowerManagement from "@/pages/features/PowerManagement";
import InternetConnectivity from "@/pages/features/InternetConnectivity";
import SmartTV from "@/pages/features/SmartTV";
import SmartKitchen from "@/pages/features/SmartKitchen";
import AutomatedDriving from "@/pages/features/AutomatedDriving";
import AudioSystem from "@/pages/features/AudioSystem";
import VoiceControl from "@/pages/VoiceControl";
import RvIntelligence from "@/pages/RvIntelligence";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
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
    path: "/models",
    element: <Models />,
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
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
  {
    path: "/calculators",
    element: <Calculators />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
  },
  {
    path: "/rv-weather",
    element: <RVWeather />,
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />,
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklistPage />,
  },
  {
    path: "/models/compact",
    element: <CompactModel />,
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />,
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
  },
  {
    path: "/models/compare",
    element: <CompareModels />,
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
    path: "/features",
    element: <Features />,
  },
  {
    path: "/features/navigation",
    element: <NavigationSystem />,
  },
  {
    path: "/features/security",
    element: <SecuritySystem />,
  },
  {
    path: "/features/power",
    element: <PowerManagement />,
  },
  {
    path: "/features/connectivity",
    element: <InternetConnectivity />,
  },
  {
    path: "/features/entertainment",
    element: <SmartTV />,
  },
  {
    path: "/features/kitchen",
    element: <SmartKitchen />,
  },
  {
    path: "/features/driving",
    element: <AutomatedDriving />,
  },
  {
    path: "/features/audio",
    element: <AudioSystem />,
  },
  {
    path: "/features/voice",
    element: <VoiceControl />,
  },
  {
    path: "/rv-intelligence",
    element: <RvIntelligence />,
  },
];
