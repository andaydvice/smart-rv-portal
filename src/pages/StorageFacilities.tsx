
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTransition from '@/components/transitions/PageTransition';
import StorageFacilitiesMap from '@/components/storage/StorageFacilitiesMap';
import FilterPanel from '@/components/storage/FilterPanel';
import RecentlyViewedFacilities from '@/components/storage/RecentlyViewedFacilities';
import { useStorageFacilities } from '@/components/storage/useStorageFacilities';
import { FilterState, StorageFacility } from '@/components/storage/types';

const StorageFacilities = () => {
  // Initialize filter state
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
  
  // Track recently viewed facilities
  const [recentlyViewed, setRecentlyViewed] = useState<StorageFacility[]>([]);
  
  // Get facilities based on filters
  const { facilities = [], isLoading, error } = useStorageFacilities(filters);
  
  useEffect(() => {
    // Document title
    document.title = 'RV Storage Facilities | Smart RV Systems';
    
    // Force background color for this page
    document.body.style.backgroundColor = '#080F1F';
    
    // Add visibility debug message
    console.log('StorageFacilities component mounted, visible:', document.body.style.backgroundColor);
    console.log(`Facilities loaded: ${facilities?.length || 0}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [facilities?.length]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  // Handle facility click
  const handleFacilityClick = (facilityId: string) => {
    // Find the facility in the current list
    const facility = facilities?.find(f => f.id === facilityId);
    
    if (facility) {
      // Add to recently viewed if not already there
      setRecentlyViewed(prev => {
        // Remove if already exists
        const filtered = prev.filter(f => f.id !== facilityId);
        // Add to beginning (most recent)
        return [facility, ...filtered].slice(0, 5); // Keep only 5 most recent
      });
    }
  };
  
  return (
    <PageTransition>
      <Layout>
        <div className="min-h-screen bg-[#080F1F] text-white">
          {/* Map header section */}
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">
            <h1 className="text-3xl font-bold text-white mb-2">RV Storage Facilities</h1>
            <p className="text-[#E2E8FF] mb-6">Find secure storage facilities for your RV across the country</p>
            
            {/* Search and filter row */}
            <div className="mb-6">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
            
            {/* Map area */}
            <div className="rounded-lg overflow-hidden bg-[#151A22] border border-[#1E2A3E] shadow-lg h-[500px] md:h-[600px] lg:h-[700px]">
              <StorageFacilitiesMap 
                facilities={facilities || []} 
                isLoading={isLoading} 
                error={error?.message || null} 
              />
            </div>
            
            {/* Recently viewed */}
            <div className="mt-8">
              <RecentlyViewedFacilities 
                facilities={recentlyViewed} 
                onFacilityClick={handleFacilityClick} 
              />
            </div>
          </div>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default StorageFacilities;
