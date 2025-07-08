
import React from "react";
import { RouteObject } from "react-router-dom";

// Import root page
import Index from "../pages/Index";
import ErrorPage from "../pages/ErrorPage";
import SearchResults from "../pages/SearchResults";

// Import admin pages
import SEODashboard from "../pages/admin/SEODashboard";
import ContentAnalytics from "../pages/admin/ContentAnalytics";
import MobileAnalyticsDashboard from "../pages/admin/MobileAnalyticsDashboard";
import VoiceCommercePage from "../pages/VoiceCommerce";
import EnterpriseIntelligence from "../pages/EnterpriseIntelligence";

// Import affiliate pages
import RVAppsHub from "../pages/RVAppsHub";
import RVEmergencyCenter from "../pages/RVEmergencyCenter";
import SolarPowerGuide from "../pages/SolarPowerGuide";

// Import route groups
import featureRoutes from "./featureRoutes";
import modelRoutes from "./modelRoutes";
import utilityRoutes from "./utilityRoutes";
import contentRoutes from "./contentRoutes";

// Define routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <SearchResults />,
    errorElement: <ErrorPage />,
  },
  // Affiliate revenue pages
  {
    path: "/rv-apps-hub",
    element: <RVAppsHub />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-emergency-center", 
    element: <RVEmergencyCenter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/solar-power-guide",
    element: <SolarPowerGuide />,
    errorElement: <ErrorPage />,
  },
  // Admin routes
  {
    path: "/admin/seo",
    element: <SEODashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/analytics",
    element: <ContentAnalytics />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/mobile-analytics",
    element: <MobileAnalyticsDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/voice-commerce",
    element: <VoiceCommercePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/enterprise-intelligence",
    element: <EnterpriseIntelligence />,
    errorElement: <ErrorPage />,
  },
  ...modelRoutes,
  ...featureRoutes,
  ...contentRoutes,
  ...utilityRoutes,
  // Add a catch-all route for 404 pages
  {
    path: "*",
    element: <ErrorPage />,
  }
];

// For backward compatibility
export default routes;
