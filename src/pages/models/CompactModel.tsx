
import { motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { rvTypes } from "@/data/rvTypes";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";
import { ModelNavigationLinks } from "@/components/navigation/ModelNavigationLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

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
              <Breadcrumbs items={[{ label: 'Models', href: '/models' }, { label: 'Compact Model' }]} />
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
                  name: 'RVshare',
                  url: 'https://rvshare.com',
                  title: 'Budget-Friendly RV Rentals',
                  description: 'Affordable compact RV rentals perfect for trying before you buy or weekend adventures.',
                  features: ['Compact RV Selection', 'Budget-Friendly Rates', 'Easy Booking', 'Insurance Included'],
                  buttonText: 'Find Compact Rentals'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Essential RV Services',
                  description: 'Basic roadside assistance and insurance coverage perfect for new compact RV owners.',
                  features: ['Roadside Assistance', 'Basic Coverage', 'New Owner Support', 'Affordable Plans'],
                  buttonText: 'Get Basic Protection'
                },
                {
                  name: 'RV LIFE',
                  url: 'https://rvlife.com',
                  title: 'Compact RV Trip Planning',
                  description: 'Find campgrounds and routes perfectly sized for compact RVs with detailed planning tools.',
                  features: ['Size-Appropriate Routes', 'Compact RV Campgrounds', 'Planning Tools', 'Community Tips'],
                  buttonText: 'Plan Compact Adventures'
                }
              ]}
              gridCols="3"
            />

            <AffiliateDisclosure className="mt-8" />

            {/* Featured Smart Systems */}
            <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Compact Smart Features</h2>
              <p className="text-gray-300 mb-6">Efficient smart systems designed for weekend adventures</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/features/power-management" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-yellow-500 rounded-lg p-4 transition-all">
                  <h3 className="text-white font-semibold mb-2">Efficient Power</h3>
                  <p className="text-gray-400 text-sm">Optimized power systems for weekend trips</p>
                </Link>
                <Link to="/features/smart-kitchen" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                  <h3 className="text-white font-semibold mb-2">Smart Kitchen</h3>
                  <p className="text-gray-400 text-sm">Connected appliances in a compact space</p>
                </Link>
                <Link to="/features/internet-connectivity" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500 rounded-lg p-4 transition-all">
                  <h3 className="text-white font-semibold mb-2">4G/5G Connectivity</h3>
                  <p className="text-gray-400 text-sm">Fast internet for streaming and work</p>
                </Link>
              </div>
            </div>

            {/* Model Navigation Links */}
            <ModelNavigationLinks className="mt-12 mb-8" />
          </div>
        </Suspense>
      </div>
    </Layout>
  );
};

export default CompactModel;
