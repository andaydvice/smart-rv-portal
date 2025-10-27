
import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { MinimalLoader } from "@/components/ui/MinimalLoader";
import { RouteTransition } from "@/components/ui/transitions/RouteTransition";

// High-traffic routes - synchronous imports for faster loading
import About from "../pages/About";
import Products from "../pages/Products";
import Pricing from "../pages/Pricing";
import ErrorPage from "../pages/ErrorPage";
import Blog from "../pages/Blog";

// Less common routes - lazy loaded
const Technology = lazy(() => import("../pages/Technology"));
const Features = lazy(() => import("../pages/Features"));
const Documentation = lazy(() => import("../pages/Documentation"));
const CompleteDocumentation = lazy(() => import("../pages/documentation/CompleteDocumentation"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const RVComfortGuide = lazy(() => import("../pages/RVComfortGuide"));
const RVMarketplace = lazy(() => import("../pages/RVMarketplace"));
const RVTechnologyGuide = lazy(() => import("../pages/RVTechnologyGuide"));
const RVTechnologyGuideControlSystems = lazy(() => import("../pages/RVTechnologyGuideControlSystems"));
const RVTechnologyGuideResearch = lazy(() => import("../pages/RVTechnologyGuideResearch"));
const Tools = lazy(() => import("../pages/Tools"));
const ReadinessAssessment = lazy(() => import("../pages/tools/ReadinessAssessment"));
const FeatureMatcher = lazy(() => import("../pages/tools/FeatureMatcher"));
const EducationalConsultant = lazy(() => import("../pages/tools/EducationalConsultant"));
const TechnologyChecklist = lazy(() => import("../pages/tools/TechnologyChecklist"));
const LifestylePlanner = lazy(() => import("../pages/tools/LifestylePlanner"));
const IntelligentRVFinder = lazy(() => import("../pages/tools/IntelligentRVFinder"));

// RV Life Pro Affiliate Pages
const RVTripPlanningGuide = lazy(() => import("../pages/affiliate/RVTripPlanningGuide"));
const BestRVGPSComparison = lazy(() => import("../pages/affiliate/BestRVGPSComparison"));
const RVNavigationAppGuide = lazy(() => import("../pages/affiliate/RVNavigationAppGuide"));
const RVCampgroundFinder = lazy(() => import("../pages/affiliate/RVCampgroundFinder"));
const FamilyRVTravelGuide = lazy(() => import("../pages/affiliate/FamilyRVTravelGuide"));
const FullTimeRVLivingGuide = lazy(() => import("../pages/affiliate/FullTimeRVLivingGuide"));
const RemoteWorkRVGuide = lazy(() => import("../pages/affiliate/RemoteWorkRVGuide"));

const contentRoutes: RouteObject[] = [
  {
    path: "/technology",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <Technology />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: (
      <RouteTransition>
        <Blog />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <BlogPost />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <Documentation />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/documentation/complete",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <CompleteDocumentation />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: (
      <RouteTransition>
        <About />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/products", 
    element: (
      <RouteTransition>
        <Products />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/pricing",
    element: (
      <RouteTransition>
        <Pricing />
      </RouteTransition>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-comfort-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVComfortGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-marketplace",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVMarketplace />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-technology-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVTechnologyGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-technology-guide/control-systems",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVTechnologyGuideControlSystems />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-technology-guide/research-decisions",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVTechnologyGuideResearch />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <Tools />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/readiness-assessment",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <ReadinessAssessment />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/feature-matcher",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <FeatureMatcher />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/educational-consultant",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <EducationalConsultant />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/technology-checklist",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <TechnologyChecklist />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/lifestyle-planner",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <LifestylePlanner />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/tools/intelligent-rv-finder",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <IntelligentRVFinder />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-trip-planning-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVTripPlanningGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/best-rv-gps-comparison",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <BestRVGPSComparison />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-navigation-app-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVNavigationAppGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-campground-finder",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVCampgroundFinder />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/family-rv-travel-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <FamilyRVTravelGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/full-time-rv-living-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <FullTimeRVLivingGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/remote-work-rv-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RemoteWorkRVGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
