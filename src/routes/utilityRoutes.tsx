
import React, { lazy, Suspense } from "react";
import { MinimalLoader } from "@/components/ui/MinimalLoader";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Layout from "@/components/layout/Layout";

// High-traffic routes - synchronous imports
import Calculators from "../pages/Calculators";
import Contact from "../pages/Contact";

// Popular utility pages - synchronous for instant loading
import Documentation from "../pages/Documentation";
import WeatherDashboard from "../pages/WeatherDashboard";
import Auth from "../pages/Auth";
import ResetPassword from "../pages/ResetPassword";
import StorageFacilities from "../pages/StorageFacilities";
import RVWeather from "../pages/RVWeather";

// Less common routes - lazy loaded
const StoragePreparationChecklist = lazy(() => import("../pages/StoragePreparationChecklist"));
const Troubleshooting = lazy(() => import("../pages/Troubleshooting"));

const VoiceControl = lazy(() => import("../pages/VoiceControl"));
const AccountPage = lazy(() => import("@/pages/Account"));
const RVEmergencyCenter = lazy(() => import("../pages/RVEmergencyCenter"));
const SolarPowerGuide = lazy(() => import("../pages/SolarPowerGuide"));
const RVAppsHub = lazy(() => import("../pages/RVAppsHub"));
const PerformanceDashboard = lazy(() => import("../pages/admin/PerformanceDashboard"));

// Protected user areas
const UserDashboard = lazy(() => import("../pages/user/Dashboard"));
const SavedCalculations = lazy(() => import("../pages/user/SavedCalculations"));
const UserFavorites = lazy(() => import("../pages/user/UserFavorites"));

const utilityRoutes = [
  {
    path: "/calculators",
    element: (
      <RouteTransition>
        <Calculators />
      </RouteTransition>
    ),
  },
  {
    path: "/documentation",
    element: (
      <RouteTransition>
        <Documentation />
      </RouteTransition>
    ),
  },
  {
    path: "/weather",
    element: (
      <RouteTransition>
        <WeatherDashboard />
      </RouteTransition>
    ),
  },
  {
    path: "/rv-weather",
    element: (
      <RouteTransition>
        <RVWeather />
      </RouteTransition>
    ),
  },
  {
    path: "/storage-facilities",
    element: (
      <RouteTransition>
        <StorageFacilities />
      </RouteTransition>
    ),
  },
  {
    path: "/storage-preparation-checklist",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <StoragePreparationChecklist />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/contact",
    element: (
      <RouteTransition>
        <Contact />
      </RouteTransition>
    ),
  },
  {
    path: "/auth",
    element: (
      <RouteTransition>
        <Auth />
      </RouteTransition>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <RouteTransition>
        <ResetPassword />
      </RouteTransition>
    ),
  },
  {
    path: "/troubleshooting",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <Troubleshooting />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/voice-control",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <VoiceControl />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        </RouteTransition>
      </Suspense>
    ),
  },
  // Protected user dashboard routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <RouteTransition>
            <Suspense fallback={<MinimalLoader />}>
              <UserDashboard />
            </Suspense>
          </RouteTransition>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/calculations",
    element: (
      <ProtectedRoute>
        <Layout>
          <RouteTransition>
            <Suspense fallback={<MinimalLoader />}>
              <SavedCalculations />
            </Suspense>
          </RouteTransition>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/favorites",
    element: (
      <ProtectedRoute>
        <Layout>
          <RouteTransition>
            <Suspense fallback={<MinimalLoader />}>
              <UserFavorites />
            </Suspense>
          </RouteTransition>
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/rv-emergency-center",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVEmergencyCenter />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/solar-power-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <SolarPowerGuide />
        </RouteTransition>
      </Suspense>
    ),
  },
  {
    path: "/rv-apps-hub",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVAppsHub />
        </RouteTransition>
      </Suspense>
    ),
  },
  // Protected admin routes
  {
    path: "/admin/perf",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <ProtectedRoute>
            <PerformanceDashboard />
          </ProtectedRoute>
        </RouteTransition>
      </Suspense>
    ),
  },
];

export default utilityRoutes;
