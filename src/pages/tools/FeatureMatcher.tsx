import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { EnhancedFeatureMatcher } from '@/components/rv-technology/interactive/EnhancedFeatureMatcher';
import { availableTools } from '@/lib/toolsData';
import aiEnhancedFeatureMatcherHero from '@/assets/ai-enhanced-feature-matcher-hero.jpg';

const FeatureMatcher: React.FC = () => {
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

          <div className="relative mb-8 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <img 
              src={aiEnhancedFeatureMatcherHero} 
              alt="Enhanced Feature Matcher"
              className="w-full h-80 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] via-[#080F1F]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Enhanced Feature Matcher
              </h1>
              <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
                Discover which technology features match your specific RV usage plans
              </p>
            </div>
          </div>

          <EnhancedFeatureMatcher />
          
          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="feature-matcher" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureMatcher;
