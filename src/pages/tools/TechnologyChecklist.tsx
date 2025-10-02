import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AITechnologyChecklist } from '@/components/rv-technology/interactive/AITechnologyChecklist';
import { availableTools } from '@/lib/toolsData';
import aiTechnologyResearchChecklistHero from '@/assets/ai-technology-research-checklist-hero.jpg';

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

          <div className="relative mb-8 rounded-2xl overflow-hidden">
            <img 
              src={aiTechnologyResearchChecklistHero} 
              alt="AI Technology Checklist"
              className="w-full h-80 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] via-[#080F1F]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                AI Technology Checklist
              </h1>
              <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
                Create a personalized research checklist for your RV technology setup
              </p>
            </div>
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
