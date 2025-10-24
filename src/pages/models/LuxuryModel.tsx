
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { LuxuryHero } from "@/components/luxury-models/LuxuryHero";
import { KeyFeatures } from "@/components/luxury-models/KeyFeatures";
import { ModelCategory } from "@/components/luxury-models/ModelCategory";
import { luxuryModels } from "@/data/luxury-models";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";
import { PageSummary } from "@/components/ui/PageSummary";

const LuxuryModel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      navigate("/models");
    } catch (error) {
      console.error("[LuxuryModel] Navigation failed:", error);
    }
  };

  const renderModelCategories = () => {
    const categories = Object.values(luxuryModels);
    return categories.map((category, index) => {
      // Render first image after Class A Diesel Pushers and before Premium Class A Diesel
      if (index === 0) {
        return (
          <div key={index}>
            <ModelCategory {...category} /> 
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
              <img 
                src="/lovable-uploads/Luxury-Class-RVs-min.jpg"
                alt="Luxury RV with outdoor lounge setup at sunset Test"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
      }    
      // Render second image after Premium Class A Diesel and before Luxury Fifth Wheels
      if (index === 1) {
        return (
          <div key={index}>
            <ModelCategory {...category} />
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
              <img 
                src="/lovable-uploads/5f18c537-149c-494e-9adf-6a1c096e3e3a.png"
                alt="Luxury RV with outdoor setup by the lake at sunset"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
      }
      // Render second image after Luxury Fifth Wheels
      if (index === 2) {
        return (
          <div key={index}>
            <ModelCategory {...category} />
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
              <img 
                src="/lovable-uploads/Luxury_RV_Living-min.jpg"
                alt="Luxury RV with outdoor setup by the lake at sunset"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
      }
       // Render second image after Luxury Fifth Wheels
      if (index === 3) {
        return (
          <div key={index}>
            <ModelCategory {...category} />
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 my-8">
              <img 
                src="/lovable-uploads/Premium-Travel-Trailers-min.jpg"
                alt="Luxury RV with outdoor setup by the lake at sunset"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        );
      }
      return <ModelCategory key={index} {...category} />;
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Luxury Smart RV Models</title>
        <meta name="description" content="Discover luxury smart RV models with premium features, automation, and high-end finishes." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/models/luxury' : ''} />
      </Helmet>
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800 w-full"
      >
        <LuxuryHero handleNavigation={handleNavigation} />

        {/* Model Overview */}
        <div className="w-full px-4 py-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <PageSummary
              question="What luxury RV models are available?"
              answer="Premium RV models starting at $1.3M featuring advanced automation, high-end finishes, and full-time living amenities. Explore Class A diesel pushers, premium motorhomes, luxury fifth wheels, and high-end travel trailers with extended range power and premium security suites."
              keyPoints={[
                "Class A Diesel Pushers - Flagship models $300K-$1M+ with rear diesel engines, air ride suspension, residential amenities",
                "Premium Class A Diesel - Ultimate luxury $500K-$2M+ with custom interiors, washer/dryer, king beds, outdoor entertainment",
                "Luxury Fifth Wheels - Towable luxury $80K-$200K+ with residential appliances, multiple slide-outs, spacious layouts",
                "Premium Travel Trailers - High-end towables $50K-$150K with luxury finishes, smart technology, full kitchens",
                "Advanced Technology - All models include navigation systems, security suites, high-speed internet, power management",
                "Full-Time Living - Residential refrigerators, king beds, washer/dryer, ample storage for extended travel"
              ]}
              readingTime="10 min read"
            />
          </div>
        </div>

        <div className="w-full px-4 pt-12 pb-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            <KeyFeatures />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-xl p-6 mt-4"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Complete Guide to Luxury RVs: Authentic Owner Insights 2024</h2>
              <p className="text-gray-300 mb-8 italic">
                Note: Prices are approximate ranges based on 2024 models and can vary significantly based on options, customizations, and dealer location. 
                Many of these manufacturers also offer custom builds that can exceed these ranges.
              </p>

              <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-900 mb-8">
                <img 
                  src="/lovable-uploads/795a8cdd-cf65-487f-b550-4e4458d0aa9e.png"
                  alt="Luxury RV with slide-out overlooking coastal sunset"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="text-gray-300 mb-6 text-lg">
                Click on the <span className="text-blue-400 font-semibold">blue model titles</span> below to expand and see detailed descriptions.
              </p>

              <div className="space-y-8">
                {renderModelCategories()}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <OptimizedAffiliateGrid
                title="Luxury RV Experience Partners"
                subtitle="Experience luxury RV travel with premium rentals, high-end accessories, and exclusive membership benefits designed for discerning travelers."
                partners={[
                  {
                    name: 'Outdoorsy',
                    url: 'https://outdoorsy.com',
                    title: 'Premium Luxury RV Rentals',
                    description: 'Access the finest luxury RVs with white-glove service and premium amenities for an unforgettable travel experience.',
                    features: ['Verified luxury fleet', 'Concierge service', 'Premium insurance'],
                    buttonText: 'Browse Luxury Rentals'
                  },
                  {
                    name: 'Good Sam',
                    url: 'https://goodsam.com',
                    title: 'Luxury RV Club Benefits',
                    description: 'Exclusive membership perks including luxury campground access, premium roadside assistance, and VIP services.',
                    features: ['Resort-style campgrounds', '24/7 premium support', 'Exclusive member rates'],
                    buttonText: 'Join Premium Club'
                  },
                  {
                    name: 'Inverters R Us',
                    url: 'https://invertersrus.com',
                    title: 'High-End Power Technology',
                    description: 'Premium power monitoring and management systems for luxury RV living.',
                    features: ['Professional power systems', 'Smart monitoring', 'Remote control', 'Advanced automation'],
                    buttonText: 'Explore Power Solutions'
                  }
                ]}
                gridCols="3"
              />
              <div className="px-4">
                <AffiliateDisclosure className="max-w-7xl mx-auto my-8" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <Link to="/models/compare">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-blue-500/50 hover:text-white"
                >
                  Compare All Models <ArrowLeft className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </Layout>
  );
};

export default LuxuryModel;
