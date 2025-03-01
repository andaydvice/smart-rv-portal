
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import Models from "@/pages/Models";
import Technology from "@/pages/Technology";
import Troubleshooting from "@/pages/Troubleshooting";
import Auth from "@/pages/Auth";
import LuxuryModel from "@/pages/models/LuxuryModel";
import CompactModel from "@/pages/models/CompactModel";
import AdventureModel from "@/pages/models/AdventureModel";
import CompareModels from "@/pages/models/CompareModels";
import PowerManagement from "@/pages/features/PowerManagement";
import SmartKitchen from "@/pages/features/SmartKitchen";
import NavigationSystem from "@/pages/features/NavigationSystem";
import SecuritySystem from "@/pages/features/SecuritySystem";
import AutomatedDriving from "@/pages/features/AutomatedDriving";
import SmartTV from "@/pages/features/SmartTV";
import AudioSystem from "@/pages/features/AudioSystem";
import InternetConnectivity from "@/pages/features/InternetConnectivity";
import VoiceControl from "@/pages/VoiceControl";
import Documentation from "@/pages/Documentation";
import CompleteDocumentation from "@/pages/documentation/CompleteDocumentation";
import StorageFacilities from "@/pages/StorageFacilities";
import Calculators from "@/pages/Calculators";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import RVWeather from "@/pages/RVWeather";
import Contact from "@/pages/Contact";
import ScheduleDemo from "@/pages/ScheduleDemo";
import StoragePreparationChecklist from "@/pages/StoragePreparationChecklist";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/features",
    element: <Features />,
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
    path: "/troubleshooting",
    element: <Troubleshooting />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />,
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
    path: "/models/compare",
    element: <CompareModels />,
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />,
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />,
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
    path: "/features/automated-driving",
    element: <AutomatedDriving />,
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />,
  },
  {
    path: "/features/audio",
    element: <AudioSystem />,
  },
  {
    path: "/features/connectivity",
    element: <InternetConnectivity />,
  },
  {
    path: "/voice-control",
    element: <VoiceControl />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/documentation/full",
    element: <CompleteDocumentation />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklist />,
  },
  {
    path: "/calculators",
    element: <Calculators />,
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
    path: "/weather",
    element: <RVWeather />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
];
