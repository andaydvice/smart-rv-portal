
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Features from "@/pages/Features";
import Models from "@/pages/Models";
import Documentation from "@/pages/Documentation";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import RVWeather from "@/pages/RVWeather";
import Contact from "@/pages/Contact";
import Calculators from "@/pages/Calculators";
import Technology from "@/pages/Technology";
import VoiceControl from "@/pages/VoiceControl";
import Troubleshooting from "@/pages/Troubleshooting";
import ScheduleDemo from "@/pages/ScheduleDemo";
import StorageFacilities from "@/pages/StorageFacilities";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
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
    path: "/documentation",
    element: <Documentation />,
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
    path: "/rv-weather",
    element: <RVWeather />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/calculators",
    element: <Calculators />,
  },
  {
    path: "/technology",
    element: <Technology />,
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
    path: "/schedule-demo",
    element: <ScheduleDemo />,
  },
  {
    path: "/storage-facilities",
    element: <StorageFacilities />,
  },
]);
