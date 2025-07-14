
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CompareHero from "@/components/models/compare/CompareHero";
import ModelCard from "@/components/models/compare/ModelCard";
import SpecificationsTable from "@/components/models/compare/SpecificationsTable";
import FeaturesComparisonTable from "@/components/models/compare/FeaturesComparisonTable";
// MODIFIED: Removed CallToAction import
// import CallToAction from "@/components/models/compare/CallToAction";
import models from "@/components/models/compare/ModelComparisonData";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

// CRITICAL DEBUGGING LOGS
console.log('CompareModels component loaded');
console.log('Component file path: src/pages/models/CompareModels.tsx');

const CompareModels = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("[CompareModels] Component mounted");
    console.log("[CompareModels] Current location:", location.pathname);
    // Ensure the page scrolls to top when mounted
    window.scrollTo(0, 0);
    
    // Log that we reached the component successfully
    console.log("[CompareModels] Component successfully rendered");
    
    // Alert for debugging purposes on production
    if (window.location.hostname.includes('preview--smart-rv-portal') || 
        window.location.hostname.includes('lovable.app')) {
      console.warn('COMPARE MODELS PAGE LOADED ON PRODUCTION');
    }
  }, [location]);

  console.log("[CompareModels] Rendering component, current path:", location.pathname);

  // Footer links configuration
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Features", href: "/features" },
        { text: "Technology", href: "/technology" },
        { text: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Model Types",
      links: [
        { text: "Luxury Class", href: "/models/luxury" },
        { text: "Adventure Class", href: "/models/adventure" },
        { text: "Compact Smart", href: "/models/compact" },
        { text: "Compare Models", href: "/models/compare" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  return (
    <Layout>
      <CompareHero 
        title="Compare Models"
        description="Find the perfect smart RV that matches your lifestyle. Compare features and specifications across our range of models."
        imageSrc="/lovable-uploads/Luxury-Class-RVs-min.jpg"
      />

      <div className="w-full px-4 py-16">
        {/* Model cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {models.map((model) => (
            <ModelCard
              key={model.name}
              name={model.name}
              image={model.image}
              price={model.price}
              description={model.description}
            />
          ))}
        </div>

        {/* Specifications comparison table */}
        <div className="max-w-7xl mx-auto">
          <SpecificationsTable models={models} />

          {/* Features comparison table */}
          <FeaturesComparisonTable models={models} />

          {/* RV Model Comparison Services */}
          <div className="mt-16">
            <OptimizedAffiliateGrid
              title="Make the Right RV Choice"
              subtitle="Get expert advice, try different models, and find the perfect services to help you choose the right RV for your lifestyle."
              partners={[
                {
                  partner: 'rvshare',
                  title: 'Test Drive Different Models',
                  description: 'Rent different RV models to compare features, layouts, and driving experience before making your decision.',
                  features: ['Multiple Model Access', 'Real-World Testing', 'Compare Features', 'Owner Insights'],
                  buttonText: 'Test Drive Models'
                },
                {
                  partner: 'goodsam',
                  title: 'Expert RV Buying Advice',
                  description: 'Get professional guidance and advice on choosing the right RV model for your needs and budget.',
                  features: ['Expert Consultation', 'Model Recommendations', 'Buying Guidance', 'Value Assessment'],
                  buttonText: 'Get Expert Advice'
                },
                {
                  partner: 'rvlife',
                  title: 'Model Research Tools',
                  description: 'Access comprehensive model reviews, comparisons, and user experiences to make informed decisions.',
                  features: ['Detailed Reviews', 'User Experiences', 'Model Comparisons', 'Research Tools'],
                  buttonText: 'Research Models'
                }
              ]}
              gridCols="3"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompareModels;
