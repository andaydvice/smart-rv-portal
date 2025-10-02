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
        </div>

        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden my-12">
          <img 
            src={aiTechnologyResearchChecklistHero} 
            alt="AI Technology Checklist"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                AI Technology Checklist
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                Create a personalized research checklist for your RV technology setup
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
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
