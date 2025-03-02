
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
    window.scrollTo(0, 0);
    
    // Ensure images are preloaded
    const preloadImages = () => {
      const img = new Image();
      img.src = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";
      img.onload = () => setIsLoaded(true);
    };
    
    preloadImages();
    
    // Fallback if image doesn't load
    const timer = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true);
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
