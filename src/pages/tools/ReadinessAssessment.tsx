import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AITechnologyReadinessAssessment } from '@/components/rv-technology/interactive/AITechnologyReadinessAssessment';

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
          <Button
            variant="ghost"
            onClick={() => navigate('/tools')}
            className="mb-6 text-[#E2E8FF] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              AI Technology Readiness Assessment
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Get personalized technology recommendations based on your experience and goals
            </p>
          </div>

          <AITechnologyReadinessAssessment />
        </div>
      </div>
    </>
  );
};

export default ReadinessAssessment;
