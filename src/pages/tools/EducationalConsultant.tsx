import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AIEducationalConsultant } from '@/components/rv-technology/interactive/AIEducationalConsultant';
import { availableTools } from '@/lib/toolsData';
import aiEducationalConsultantHero from '@/assets/ai-educational-consultant-hero.png';

const EducationalConsultant: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Educational Consultant | RV Connectivity Tools</title>
        <meta name="description" content="Ask questions and get detailed information about RV technology from our AI assistant. Free educational consultation tool." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Educational Consultant' }
          ]} />
        </div>

        <div className="relative w-full my-12">
          <img 
            src={aiEducationalConsultantHero} 
            alt="AI Educational Consultant"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                AI Educational Consultant
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                Get expert answers to your RV technology questions
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <AIEducationalConsultant />
          
          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="educational-consultant" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationalConsultant;
