
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
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";
import { PageSummary } from "@/components/ui/PageSummary";


const CompareModels = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Ensure the page scrolls to top when mounted
    window.scrollTo(0, 0);
  }, [location]);

  

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
    <>
      <Helmet>
        <title>Compare RV models | Smart RV Portal</title>
        <meta name="description" content="Compare RV models side by side to find the perfect smart RV. See features, specs, and pricing in one place." />
        <link rel="canonical" href="/models/compare" />
      </Helmet>
      <Layout>
        <CompareHero
          title="Compare Models"
          description="Find the perfect smart RV that matches your lifestyle. Compare features and specifications across our range of models."
          imageSrc="/lovable-uploads/Luxury-Class-RVs-min.jpg"
        />

        {/* Comparison Overview */}
        <div className="w-full px-4 py-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <PageSummary
              question="How do you compare RV models?"
              answer="Side-by-side comparison of three RV model categories across specifications, features, technology, and pricing. Compare dimensions, sleeping capacity, power systems, smart features, and amenities to find the perfect RV for your lifestyle and budget."
              keyPoints={[
                "Specifications Table - Compare dimensions, weight, sleeping capacity, tank capacities, and towing requirements",
                "Features Comparison - Side-by-side analysis of smart systems, automation, connectivity, and premium amenities",
                "Technology Packages - Compare navigation systems, security features, power management, and internet options",
                "Price Comparison - Starting prices from $20K (Compact) to $50K (Adventure) to $1.3M (Luxury)",
                "Use Case Matching - Identify which model best fits weekend trips, off-grid adventures, or full-time living",
                "Test Before Buying - Try rental models to experience features, layouts, and driving dynamics firsthand"
              ]}
              readingTime="6 min read"
            />
          </div>
        </div>

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
                    name: 'RVshare',
                    url: 'https://rvshare.com',
                    title: 'Test Drive Different Models',
                    description: 'Rent different RV models to compare features, layouts, and driving experience before making your decision.',
                    features: ['Multiple Model Access', 'Real-World Testing', 'Compare Features', 'Owner Insights'],
                    buttonText: 'Test Drive Models'
                  },
                  {
                    name: 'Good Sam',
                    url: 'https://goodsam.com',
                    title: 'Expert RV Buying Advice',
                    description: 'Get professional guidance and advice on choosing the right RV model for your needs and budget.',
                    features: ['Expert Consultation', 'Model Recommendations', 'Buying Guidance', 'Value Assessment'],
                    buttonText: 'Get Expert Advice'
                  },
                  {
                    name: 'RV LIFE',
                    url: 'https://rvlife.com',
                    title: 'Model Research Tools',
                    description: 'Access comprehensive model reviews, comparisons, and user experiences to make informed decisions.',
                    features: ['Detailed Reviews', 'User Experiences', 'Model Comparisons', 'Research Tools'],
                    buttonText: 'Research Models'
                  }
                ]}
                gridCols="3"
              />
              
              <AffiliateDisclosure className="mt-8" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CompareModels;
