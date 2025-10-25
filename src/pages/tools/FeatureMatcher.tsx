import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { EnhancedFeatureMatcher } from '@/components/rv-technology/interactive/EnhancedFeatureMatcher';
import { availableTools } from '@/lib/toolsData';
import aiEnhancedFeatureMatcherHero from '@/assets/ai-enhanced-feature-matcher-hero.webp';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const FeatureMatcher: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Enhanced Feature Matcher | RV Connectivity Tools</title>
        <meta name="description" content="Describe your RV usage plans and discover which technology features match your needs. Free AI-powered feature matching tool." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Feature Matcher' }
          ]} />
        </div>

        <div className="relative w-full my-12">
          <img 
            src={aiEnhancedFeatureMatcherHero} 
            alt="Enhanced Feature Matcher"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                Enhanced Feature Matcher
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                Discover which technology features match your specific RV usage plans
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <EnhancedFeatureMatcher />
          
          <div className="max-w-6xl mx-auto mt-8">
            <AffiliateDisclosure />
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="feature-matcher" />
          </div>

          {/* Explore Smart Features */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Explore Individual Features</h3>
              <p className="text-gray-300 mb-6">Learn more about each smart feature in detail</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/features" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">All Smart Features</h4>
                  <p className="text-gray-400 text-sm">Browse our complete feature catalog</p>
                </Link>
                <Link to="/features/smart-automation" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Smart Automation</h4>
                  <p className="text-gray-400 text-sm">Discover automation possibilities</p>
                </Link>
                <Link to="/features/power-management" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-yellow-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Power Management</h4>
                  <p className="text-gray-400 text-sm">Learn about power systems</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureMatcher;
