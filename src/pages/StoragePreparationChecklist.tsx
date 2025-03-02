
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import ChecklistHeroImage from '@/components/storage/checklist/ChecklistHeroImage';
import Layout from '@/components/layout/Layout';

const StoragePreparationChecklistPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Force scroll to top and ensure components load in correct order
  useEffect(() => {
    console.log('Storage checklist page loaded - forcing scroll to top');
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Ensure images are preloaded with highest priority
    const preloadImages = () => {
      console.log('Preloading checklist hero image');
      // Create an image element and set properties for immediate loading
      const img = new Image();
      img.src = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";
      img.fetchPriority = 'high';
      
      // Make sure we use the complete event to handle both cached and network-loaded images
      if (img.complete) {
        console.log('Hero image already cached and loaded');
        setIsLoaded(true);
      } else {
        img.onload = () => {
          console.log('Hero image loaded successfully');
          setIsLoaded(true);
        };
      }
    };
    
    // Start preloading immediately
    preloadImages();
    
    // Very short fallback to ensure UI is shown regardless
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.log('Using fallback loading state after timeout');
        setIsLoaded(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <Layout>
      <div className="storage-preparation-checklist bg-[#080F1F] min-h-screen">
        <Navbar />
        <div className="pt-20">
          {/* Force render ChecklistHeroImage regardless of loading state */}
          <ChecklistHeroImage />
          <StoragePreparationChecklist />
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
