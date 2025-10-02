import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { EnhancedFeatureMatcher } from '@/components/rv-technology/interactive/EnhancedFeatureMatcher';
import { availableTools } from '@/lib/toolsData';

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

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Enhanced Feature Matcher
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Discover which technology features match your specific RV usage plans
            </p>
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
