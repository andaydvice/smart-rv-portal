import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AITechnologyReadinessAssessment } from '@/components/rv-technology/interactive/AITechnologyReadinessAssessment';
import { availableTools } from '@/lib/toolsData';

const ReadinessAssessment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>AI Technology Readiness Assessment | RV Connectivity Tools</title>
        <meta name="description" content="Get personalized RV technology recommendations based on your experience level and travel goals. Free AI-powered assessment tool." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Readiness Assessment' }
          ]} />

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              AI Technology Readiness Assessment
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Get personalized technology recommendations based on your experience and goals
            </p>
          </div>

          <AITechnologyReadinessAssessment />
          
          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="readiness-assessment" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadinessAssessment;
