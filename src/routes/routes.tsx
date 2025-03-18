
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
const Index = lazy(() => import('@/pages/Index'));
const Auth = lazy(() => import('@/pages/Auth'));
const Features = lazy(() => import('@/pages/Features'));
const Contact = lazy(() => import('@/pages/Contact'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Models = lazy(() => import('@/pages/Models'));
const Technology = lazy(() => import('@/pages/Technology'));
const CompleteDocumentation = lazy(() => import('@/pages/documentation/CompleteDocumentation'));
const ScheduleDemo = lazy(() => import('@/pages/ScheduleDemo'));
const CompareModels = lazy(() => import('@/pages/models/CompareModels'));
const CompactModel = lazy(() => import('@/pages/models/CompactModel'));
const LuxuryModel = lazy(() => import('@/pages/models/LuxuryModel'));
const AdventureModel = lazy(() => import('@/pages/models/AdventureModel'));
const Troubleshooting = lazy(() => import('@/pages/Troubleshooting'));
const SmartTV = lazy(() => import('@/pages/features/SmartTV'));
const SmartKitchen = lazy(() => import('@/pages/features/SmartKitchen'));
const NavigationSystem = lazy(() => import('@/pages/features/NavigationSystem'));
const SecuritySystem = lazy(() => import('@/pages/features/SecuritySystem'));
const PowerManagement = lazy(() => import('@/pages/features/PowerManagement'));
const InternetConnectivity = lazy(() => import('@/pages/features/InternetConnectivity'));
const AudioSystem = lazy(() => import('@/pages/features/AudioSystem'));
const AutomatedDriving = lazy(() => import('@/pages/features/AutomatedDriving'));
const Calculators = lazy(() => import('@/pages/Calculators'));
const VoiceControl = lazy(() => import('@/pages/VoiceControl'));
const RVWeather = lazy(() => import('@/pages/RVWeather'));
const StorageFacilities = lazy(() => import('@/pages/StorageFacilities'));
const StoragePreparationChecklist = lazy(() => import('@/pages/StoragePreparationChecklist'));
const MapIconDemo = lazy(() => import('@/pages/MapIconDemo'));
const StarRatingDemo = lazy(() => import('@/pages/StarRatingDemo'));

// Loading component
const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin" />
  </div>
);

// 404 component for better error handling
const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#080F1F] text-white p-4">
    <h1 className="text-3xl font-bold text-[#F97316] mb-4">Page Not Found</h1>
    <p className="text-lg mb-6">We couldn't find the page you're looking for.</p>
    <a href="/" className="px-4 py-2 bg-[#5B9BD5] text-white rounded-md hover:bg-[#4B8FE3] transition-colors">
      Return to Home
    </a>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/models" element={<Models />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/documentation/complete" element={<CompleteDocumentation />} />
        <Route path="/schedule-demo" element={<ScheduleDemo />} />
        <Route path="/models/compare" element={<CompareModels />} />
        <Route path="/models/compact" element={<CompactModel />} />
        <Route path="/models/luxury" element={<LuxuryModel />} />
        <Route path="/models/adventure" element={<AdventureModel />} />
        <Route path="/troubleshooting" element={<Troubleshooting />} />
        <Route path="/features/smart-tv" element={<SmartTV />} />
        <Route path="/features/smart-kitchen" element={<SmartKitchen />} />
        <Route path="/features/navigation-system" element={<NavigationSystem />} />
        <Route path="/features/security-system" element={<SecuritySystem />} />
        <Route path="/features/power-management" element={<PowerManagement />} />
        <Route path="/features/internet-connectivity" element={<InternetConnectivity />} />
        <Route path="/features/audio-system" element={<AudioSystem />} />
        <Route path="/features/automated-driving" element={<AutomatedDriving />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/voice-control" element={<VoiceControl />} />
        <Route path="/weather" element={<RVWeather />} />
        <Route path="/storage-facilities" element={<StorageFacilities />} />
        <Route path="/storage-facilities/:id" element={<StorageFacilities />} />
        <Route path="/storage-preparation-checklist" element={<StoragePreparationChecklist />} />
        <Route path="/map-icon-demo" element={<MapIconDemo />} />
        <Route path="/star-rating-demo" element={<StarRatingDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
