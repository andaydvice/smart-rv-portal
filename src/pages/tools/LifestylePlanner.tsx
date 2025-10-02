import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AILifestylePlanner } from '@/components/rv-technology/interactive/AILifestylePlanner';
import { availableTools } from '@/lib/toolsData';

const LifestylePlanner: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Lifestyle Planner | RV Connectivity Tools</title>
        <meta name="description" content="Discover the perfect RV technology setup for your specific lifestyle and travel plans. Free AI-powered planning tool." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Lifestyle Planner' }
          ]} />

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              AI Lifestyle Planner
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Find the ideal RV technology setup for your unique lifestyle
            </p>
          </div>

          <AILifestylePlanner />
          
          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="lifestyle-planner" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LifestylePlanner;
