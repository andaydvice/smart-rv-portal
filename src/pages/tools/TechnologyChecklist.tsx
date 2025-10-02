import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AITechnologyChecklist } from '@/components/rv-technology/interactive/AITechnologyChecklist';
import { availableTools } from '@/lib/toolsData';

const TechnologyChecklist: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Technology Checklist | RV Connectivity Tools</title>
        <meta name="description" content="Generate a personalized research checklist for your RV technology needs. Free AI-powered checklist generator." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Technology Checklist' }
          ]} />

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              AI Technology Checklist
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Create a personalized research checklist for your RV technology setup
            </p>
          </div>

          <AITechnologyChecklist />
          
          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="technology-checklist" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnologyChecklist;
