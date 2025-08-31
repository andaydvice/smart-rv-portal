
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import GoogleMapView from './map/GoogleMapView';
import GoogleMapViewDirect from './map/GoogleMapViewDirect';
import OpenStreetMapView from './map/OpenStreetMapView';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, MapPin } from 'lucide-react';

interface GoogleMapFacilitiesViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  className?: string;
  selectedState?: string | null;
}

const GoogleMapFacilitiesView: React.FC<GoogleMapFacilitiesViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey,
  className = '',
  selectedState
}) => {
  const [currentZoom, setCurrentZoom] = useState<number>(4);
  // Start with Google Maps since we have a valid unrestricted API key
  const [mapProvider, setMapProvider] = useState<'google' | 'google-direct' | 'osm'>('google');
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [mapError, setMapError] = useState(false);
  
  // Auto-fallback strategy: Google -> Direct Google -> OpenStreetMap
  useEffect(() => {
    if (mapProvider === 'google' && loadAttempts === 0) {
      const timer = setTimeout(() => {
        console.log('Google Maps taking too long, trying direct loader...');
        setMapProvider('google-direct');
        setLoadAttempts(1);
      }, 2000); // Reduced to 2 seconds for faster fallback
      
      return () => clearTimeout(timer);
    } else if (mapProvider === 'google-direct' && loadAttempts === 1) {
      const timer = setTimeout(() => {
        console.log('Direct loader failed, switching to OpenStreetMap...');
        setMapProvider('osm');
        setLoadAttempts(2);
      }, 2000); // Reduced to 2 seconds for faster fallback
      
      return () => clearTimeout(timer);
    }
  }, [mapProvider, loadAttempts]);
  
  // Validate facilities before rendering
  const validFacilities = facilities.filter(
    facility => facility.latitude && facility.longitude
  );

  // Check if we have missing coordinates
  const missingCoordinates = facilities.length - validFacilities.length;
  
  // Handle zoom change
  const handleZoomChange = (zoom: number) => {
    setCurrentZoom(zoom);
  };

  return (
    <Card className={`h-[400px] md:h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700 ${className}`}>
      {/* Map provider toggle button */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setMapProvider('osm')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            mapProvider === 'osm' 
              ? 'bg-blue-600 text-white' 
              : 'bg-black/70 text-white hover:bg-black/80'
          }`}
        >
          <MapPin className="inline-block w-4 h-4 mr-1" />
          OpenStreetMap
        </button>
        <button
          onClick={() => {
            setMapProvider('google');
            setLoadAttempts(0);
          }}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            mapProvider !== 'osm' 
              ? 'bg-blue-600 text-white' 
              : 'bg-black/70 text-white hover:bg-black/80'
          }`}
        >
          Google Maps
        </button>
      </div>
      {!apiKey ? (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Google Maps API key is not configured. Please check the configuration.
          </AlertDescription>
        </Alert>
      ) : validFacilities.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No facilities with valid coordinates to display</p>
        </div>
      ) : (
        <>
          {mapProvider === 'osm' ? (
            <OpenStreetMapView
              facilities={validFacilities}
              onMarkerClick={onMarkerClick}
              selectedState={selectedState}
            />
          ) : mapProvider === 'google-direct' ? (
            <GoogleMapViewDirect
              facilities={validFacilities}
              apiKey={apiKey}
              onMarkerClick={onMarkerClick}
            />
          ) : (
            <GoogleMapView
              facilities={validFacilities}
              recentlyViewedFacilityIds={recentlyViewedFacilityIds}
              onMarkerClick={onMarkerClick}
              apiKey={apiKey}
              zoom={currentZoom}
              onZoomChange={handleZoomChange}
              selectedState={selectedState}
            />
          )}
          
          {missingCoordinates > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {missingCoordinates} facilities missing coordinates
            </div>
          )}
          
          {currentZoom > 10 && (
            <div className="absolute top-4 left-4 bg-green-500/80 text-white text-xs px-3 py-1 rounded-full z-10 flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-1.5"></div>
              <span>Zoomed in - Showing nearby facilities</span>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default GoogleMapFacilitiesView;
