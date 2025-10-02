import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AIEducationalConsultant } from '@/components/rv-technology/interactive/AIEducationalConsultant';
import { availableTools } from '@/lib/toolsData';

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

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              AI Educational Consultant
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Get expert answers to your RV technology questions
            </p>
          </div>

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
