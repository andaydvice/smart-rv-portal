import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Calculators from "@/pages/Calculators";
import Contact from "@/pages/Contact";
import Documentation from "@/pages/Documentation";
import CompleteDocumentation from "@/pages/CompleteDocumentation";
import Features from "@/pages/Features";
import AudioSystem from "@/pages/AudioSystem";
import AutomatedDriving from "@/pages/AutomatedDriving";
import InternetConnectivity from "@/pages/InternetConnectivity";
import NavigationSystem from "@/pages/NavigationSystem";
import PowerManagement from "@/pages/PowerManagement";
import SecuritySystem from "@/pages/SecuritySystem";
import SmartKitchen from "@/pages/SmartKitchen";
import SmartTV from "@/pages/SmartTV";
import Models from "@/pages/Models";
import AdventureModel from "@/pages/AdventureModel";
import CompactModel from "@/pages/CompactModel";
import CompareModels from "@/pages/CompareModels";
import LuxuryModel from "@/pages/LuxuryModel";
import RVWeather from "@/pages/RVWeather";
import ScheduleDemo from "@/pages/ScheduleDemo";
import StorageFacilities from "@/pages/StorageFacilities";
import StoragePreparationChecklist from "@/pages/StoragePreparationChecklist";
import Technology from "@/pages/Technology";
import Troubleshooting from "@/pages/Troubleshooting";
import VoiceControl from "@/pages/VoiceControl";

export const routes = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/blog",
    element: <Blog />
  },
  {
    path: "/blog/:id",
    element: <BlogPost />
  },
  {
    path: "/calculators",
    element: <Calculators />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/documentation",
    element: <Documentation />
  },
  {
    path: "/documentation/complete",
    element: <CompleteDocumentation />
  },
  {
    path: "/features",
    element: <Features />
  },
  {
    path: "/features/audio-system",
    element: <AudioSystem />
  },
  {
    path: "/features/automated-driving",
    element: <AutomatedDriving />
  },
  {
    path: "/features/internet-connectivity",
    element: <InternetConnectivity />
  },
  {
    path: "/features/navigation-system",
    element: <NavigationSystem />
  },
  {
    path: "/features/power-management",
    element: <PowerManagement />
  },
  {
    path: "/features/security-system",
    element: <SecuritySystem />
  },
  {
    path: "/features/smart-kitchen",
    element: <SmartKitchen />
  },
  {
    path: "/features/smart-tv",
    element: <SmartTV />
  },
  {
    path: "/models",
    element: <Models />
  },
  {
    path: "/models/adventure",
    element: <AdventureModel />
  },
  {
    path: "/models/compact",
    element: <CompactModel />
  },
  {
    path: "/models/compare",
    element: <CompareModels />
  },
  {
    path: "/models/luxury",
    element: <LuxuryModel />
  },
  {
    path: "/rv-weather",
    element: <RVWeather />
  },
  {
    path: "/schedule-demo",
    element: <ScheduleDemo />
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />
  },
  {
    path: "/storage-preparation-checklist",
    element: <StoragePreparationChecklist />
  },
  {
    path: "/technology",
    element: <Technology />
  },
  {
    path: "/troubleshooting",
    element: <Troubleshooting />
  },
  {
    path: "/voice-control",
    element: <VoiceControl />
  }
];
