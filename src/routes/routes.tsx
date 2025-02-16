
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
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Define which routes should be protected
const protectedPaths: string[] = [];  // Removing authentication requirements for core features

const wrapWithLayout = (element: React.ReactNode, path: string) => {
  const isProtected = protectedPaths.includes(path);
  
  if (isProtected) {
    return (
      <ProtectedRoute>
        <Layout>{element}</Layout>
      </ProtectedRoute>
    );
  }
  
  return <Layout>{element}</Layout>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: wrapWithLayout(<Index />, "/"),
  },
  {
    path: "/auth",
    element: wrapWithLayout(<Auth />, "/auth"),
  },
  {
    path: "/features",
    element: wrapWithLayout(<Features />, "/features"),
  },
  {
    path: "/models",
    element: wrapWithLayout(<Models />, "/models"),
  },
  {
    path: "/documentation",
    element: wrapWithLayout(<Documentation />, "/documentation"),
  },
  {
    path: "/blog",
    element: wrapWithLayout(<Blog />, "/blog"),
  },
  {
    path: "/blog/:slug",
    element: wrapWithLayout(<BlogPost />, "/blog/:slug"),
  },
  {
    path: "/rv-weather",
    element: wrapWithLayout(<RVWeather />, "/rv-weather"),
  },
  {
    path: "/contact",
    element: wrapWithLayout(<Contact />, "/contact"),
  },
  {
    path: "/calculators",
    element: wrapWithLayout(<Calculators />, "/calculators"),
  },
  {
    path: "/technology",
    element: wrapWithLayout(<Technology />, "/technology"),
  },
  {
    path: "/voice-control",
    element: wrapWithLayout(<VoiceControl />, "/voice-control"),
  },
  {
    path: "/troubleshooting",
    element: wrapWithLayout(<Troubleshooting />, "/troubleshooting"),
  },
  {
    path: "/schedule-demo",
    element: wrapWithLayout(<ScheduleDemo />, "/schedule-demo"),
  },
  {
    path: "/storage-facilities",
    element: wrapWithLayout(<StorageFacilities />, "/storage-facilities"),
  },
]);
