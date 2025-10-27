
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

// RV Life Pro Affiliate Pages - lazy loaded
const RVLifeProHero = lazy(() => import("../pages/affiliate/rv-life-pro/RVLifeProHero"));
const RVLifeProStory = lazy(() => import("../pages/affiliate/rv-life-pro/RVLifeProStory"));
const RVLifeProComparison = lazy(() => import("../pages/affiliate/rv-life-pro/RVLifeProComparison"));
const RVLifeProFAQ = lazy(() => import("../pages/affiliate/rv-life-pro/RVLifeProFAQ"));
const RVLifeProCampgrounds = lazy(() => import("../pages/affiliate/rv-life-pro/RVLifeProCampgrounds"));
const WeekendWarriors = lazy(() => import("../pages/affiliate/rv-life-pro/scenarios/WeekendWarriors"));
const GreyNomads = lazy(() => import("../pages/affiliate/rv-life-pro/scenarios/GreyNomads"));
const DigitalNomads = lazy(() => import("../pages/affiliate/rv-life-pro/scenarios/DigitalNomads"));

// Brentwood Home Affiliate Pages - lazy loaded
const UltimateRVMattressBuyingGuide = lazy(() => import("../pages/affiliate/brentwood-home/UltimateRVMattressBuyingGuide"));
const RVMattressSizeGuide = lazy(() => import("../pages/affiliate/brentwood-home/RVMattressSizeGuide"));
const RVSleepCrisis = lazy(() => import("../pages/affiliate/brentwood-home/RVSleepCrisis"));
const BrentwoodHomeShowcase = lazy(() => import("../pages/affiliate/brentwood-home/BrentwoodHomeShowcase"));
const HealthWellnessBenefits = lazy(() => import("../pages/affiliate/brentwood-home/HealthWellnessBenefits"));
const MattressROICalculator = lazy(() => import("../pages/affiliate/brentwood-home/MattressROICalculator"));
const InstallationCareGuide = lazy(() => import("../pages/affiliate/brentwood-home/InstallationCareGuide"));

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
  // RV Life Pro Landing Pages - SEO Optimized URLs
  {
    path: "/rv-gps-navigation",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVLifeProHero />
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
          <RVLifeProStory />
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
          <RVLifeProComparison />
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
          <RVLifeProFAQ />
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
          <RVLifeProCampgrounds />
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
          <WeekendWarriors />
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
          <GreyNomads />
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
          <DigitalNomads />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  // Brentwood Home Mattress Landing Pages - SEO Optimized URLs
  {
    path: "/rv-mattress-guide",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <UltimateRVMattressBuyingGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-mattress-sizes",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVMattressSizeGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-sleep-crisis",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <RVSleepCrisis />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/brentwood-home-rv-mattresses",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <BrentwoodHomeShowcase />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-mattress-health-benefits",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <HealthWellnessBenefits />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-mattress-roi-calculator",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <MattressROICalculator />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/rv-mattress-installation",
    element: (
      <Suspense fallback={<MinimalLoader />}>
        <RouteTransition>
          <InstallationCareGuide />
        </RouteTransition>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
];

export default contentRoutes;
