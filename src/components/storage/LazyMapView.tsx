import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load MapView component (includes 1.5MB mapbox-gl dependency)
const MapView = lazy(() => import('./MapView'));

interface LazyMapViewProps {
  mapToken: string;
  facilities: any[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

export const LazyMapView = (props: LazyMapViewProps) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-full min-h-[400px] bg-[#080F1F] rounded-lg">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-gray-400">Loading map...</p>
        </div>
      </div>
    }
  >
    <MapView {...props} />
  </Suspense>
);
