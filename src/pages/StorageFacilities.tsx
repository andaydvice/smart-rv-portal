
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PageTransition from '@/components/transitions/PageTransition';
import StorageFacilitiesMap from '@/components/storage/StorageFacilitiesMap';
import FilterPanel from '@/components/storage/FilterPanel';
import RecentlyViewedFacilities from '@/components/storage/RecentlyViewedFacilities';
import { useStorageFacilities } from '@/components/storage/useStorageFacilities';

const StorageFacilities = () => {
  const { facilities, isLoading, error } = useStorageFacilities();
  
  useEffect(() => {
    // Document title
    document.title = 'RV Storage Facilities | Smart RV Systems';
    
    // Force background color for this page
    document.body.style.backgroundColor = '#080F1F';
    
    // Add visibility debug message
    console.log('StorageFacilities component mounted, visible:', document.body.style.backgroundColor);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);
  
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
              <FilterPanel />
            </div>
            
            {/* Map area */}
            <div className="rounded-lg overflow-hidden bg-[#151A22] border border-[#1E2A3E] shadow-lg h-[500px] md:h-[600px] lg:h-[700px]">
              <StorageFacilitiesMap facilities={facilities} isLoading={isLoading} error={error?.message || null} />
            </div>
            
            {/* Recently viewed */}
            <div className="mt-8">
              <RecentlyViewedFacilities />
            </div>
          </div>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default StorageFacilities;
