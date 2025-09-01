
import { motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { rvTypes } from "@/data/rvTypes";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";

// Lazy load components that are not immediately visible
const CompactModelHero = lazy(() => import("@/components/models/compact/CompactModelHero"));
const RVTypeCard = lazy(() => import("@/components/models/compact/RVTypeCard"));

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="animate-pulse flex flex-col space-y-4">
    <div className="h-64 bg-gray-800 rounded"></div>
    <div className="h-8 bg-gray-800 rounded w-3/4"></div>
    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
  </div>
);

const CompactModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload images for better user experience
    const preloadImages = () => {
      rvTypes.forEach(type => {
        if (type.image) {
          const img = new Image();
          img.src = type.image;
        }
      });
    };
    
    // Defer non-critical operations
    setTimeout(preloadImages, 1000);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Compact Smart RV Models</title>
        <meta name="description" content="Explore compact smart RV models ideal for city travel and weekend getaways with modern smart features." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/models/compact' : ''} />
      </Helmet>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 w-full">
        <Suspense fallback={<LoadingPlaceholder />}>
          <CompactModelHero />
          <div className="w-full px-4 py-12 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-12">
                {rvTypes.map((type, index) => (
                  <Suspense key={type.title} fallback={<LoadingPlaceholder />}>
                    <RVTypeCard key={index} {...type} index={index} />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
          
          {/* Compact RV Partners */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <OptimizedAffiliateGrid
              title="Perfect Partners for Compact RV Living"
              subtitle="Essential services and budget-friendly solutions designed specifically for compact RV adventures and weekend getaways."
              partners={[
                {
                  partner: 'rvshare',
                  title: 'Budget-Friendly RV Rentals',
                  description: 'Affordable compact RV rentals perfect for trying before you buy or weekend adventures.',
                  features: ['Compact RV Selection', 'Budget-Friendly Rates', 'Easy Booking', 'Insurance Included'],
                  buttonText: 'Find Compact Rentals'
                },
                {
                  partner: 'goodsam',
                  title: 'Essential RV Services',
                  description: 'Basic roadside assistance and insurance coverage perfect for new compact RV owners.',
                  features: ['Roadside Assistance', 'Basic Coverage', 'New Owner Support', 'Affordable Plans'],
                  buttonText: 'Get Basic Protection'
                },
                {
                  partner: 'rvlife',
                  title: 'Compact RV Trip Planning',
                  description: 'Find campgrounds and routes perfectly sized for compact RVs with detailed planning tools.',
                  features: ['Size-Appropriate Routes', 'Compact RV Campgrounds', 'Planning Tools', 'Community Tips'],
                  buttonText: 'Plan Compact Adventures'
                }
              ]}
              gridCols="3"
            />
            
            <AffiliateDisclosure className="mt-8" />
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export default CompactModel;
