
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
    
    // Ensure images are preloaded with higher priority
    const preloadImages = () => {
      console.log('Preloading checklist hero image');
      const img = new Image();
      img.src = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";
      img.onload = () => {
        console.log('Hero image loaded successfully');
        setIsLoaded(true);
      };
      
      // Set priority to make sure browser prioritizes this image
      img.fetchPriority = 'high';
    };
    
    preloadImages();
    
    // Fallback if image doesn't load within 2 seconds
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.log('Using fallback loading state after timeout');
        setIsLoaded(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <Layout>
      <div className="storage-preparation-checklist bg-[#080F1F] min-h-screen">
        <Navbar />
        <div className="pt-20">
          <ChecklistHeroImage />
          <StoragePreparationChecklist />
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
