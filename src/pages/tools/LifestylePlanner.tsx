import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AILifestylePlanner } from '@/components/rv-technology/interactive/AILifestylePlanner';
import { availableTools } from '@/lib/toolsData';
import aiLifestyleTechnologyPlannerHero from '@/assets/ai-lifestyle-technology-planner-hero.png';

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
        </div>

        <div className="relative w-full min-h-[400px] overflow-hidden my-12 flex items-center justify-center bg-[#080F1F]">
          <img 
            src={aiLifestyleTechnologyPlannerHero} 
            alt="AI Lifestyle Planner"
            className="w-full h-auto object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                AI Lifestyle Planner
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                Find the ideal RV technology setup for your unique lifestyle
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
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
