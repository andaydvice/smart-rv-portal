
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import ChecklistHeroImage from '@/components/storage/checklist/ChecklistHeroImage';
import Layout from '@/components/layout/Layout';

const StoragePreparationChecklistPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(true); // Start with true for immediate visibility

  // Force scroll to top and ensure components load with direct visibility
  useEffect(() => {
    console.log('Storage checklist page loaded - forcing scroll to top');
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // No need for complex preloading - we'll render everything immediately
    // and let the browser handle loading in the background
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Set timeout to ensure all content has time to render
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div 
        className="storage-preparation-checklist bg-[#080F1F] min-h-screen"
        style={{ visibility: 'visible', display: 'block' }}
      >
        <Navbar />
        <div className="pt-20" style={{ visibility: 'visible', display: 'block' }}>
          {/* Always render these components regardless of loading state */}
          <ChecklistHeroImage />
          <StoragePreparationChecklist />
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
