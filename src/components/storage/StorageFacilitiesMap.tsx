
"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import FilterPanel from './FilterPanel';
import { FilterState } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';
import FacilityCard from './FacilityCard';
import MapView from './MapView';
import { useStorageFacilities } from './useStorageFacilities';
import { AlertCircle, Loader2, Search, Plus, List } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AddFacilityForm from './AddFacilityForm';
import { Button } from '../ui/button';

const MAPBOX_TOKEN_KEY = 'mapbox_token';
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoicnZzdG9yYWdlZ3VydSIsImEiOiJjTTc3ZTA5OXMwemtrMm5vaG00bXN5anNvIn0.q9bFmwxj8kqjDuid4jb3Tw';

const StorageFacilitiesMap = () => {
  const [mapToken, setMapToken] = useState<string>(DEFAULT_MAPBOX_TOKEN);
  const [mapTokenError, setMapTokenError] = useState<string>('');
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000],
    selectedState: null,
    minRating: null
  });

  const { facilities: filteredFacilities, isLoading, error } = useStorageFacilities(filters);

  // Remove any invalid stored token on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(MAPBOX_TOKEN_KEY);
      if (storedToken && storedToken !== DEFAULT_MAPBOX_TOKEN) {
        console.log('Removing invalid stored token');
        localStorage.removeItem(MAPBOX_TOKEN_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (mapToken && !mapToken.startsWith('pk.')) {
      setMapTokenError('Invalid Mapbox token. Token should start with "pk."');
    } else {
      setMapTokenError('');
    }
  }, [mapToken]);

  const handleFacilityClick = (facilityId: string) => {
    setHighlightedFacility(facilityId);
  };

  const toggleView = () => {
    setShowAddForm(!showAddForm);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[600px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-400">Loading storage facilities...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading storage facilities. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (showAddForm) {
      return <AddFacilityForm />;
    }

    if (filteredFacilities?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[600px] text-center p-4">
          <Search className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No Storage Facilities Found</h3>
          <p className="text-gray-400 max-w-md">
            Try adjusting your filters or price range to see more results.
          </p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[600px]">
        <div className="p-4 space-y-4">
          {filteredFacilities?.map(facility => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              isHighlighted={facility.id === highlightedFacility}
              onClick={() => handleFacilityClick(facility.id)}
            />
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[800px]">
      <div className="lg:col-span-3">
        <div className="space-y-4">
          <Button
            onClick={toggleView}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {showAddForm ? (
              <>
                <List className="mr-2 h-4 w-4" />
                View Facilities
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Facility
              </>
            )}
          </Button>
          <FilterPanel onFilterChange={setFilters} />
          <Card className="bg-[#080F1F] border-gray-700">
            {renderContent()}
          </Card>
        </div>
      </div>
      <Card className="lg:col-span-9 h-[800px] bg-[#080F1F] relative overflow-hidden">
        <MapView
          mapToken={mapTokenError ? '' : mapToken}
          facilities={filteredFacilities || []}
          highlightedFacility={highlightedFacility}
          onMarkerClick={handleFacilityClick}
          selectedState={filters.selectedState}
        />
      </Card>
    </div>
  );
};

export default StorageFacilitiesMap;
