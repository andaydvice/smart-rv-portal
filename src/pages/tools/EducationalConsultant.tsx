import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AIEducationalConsultant } from '@/components/rv-technology/interactive/AIEducationalConsultant';

const EducationalConsultant: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>AI Educational Consultant | RV Connectivity Tools</title>
        <meta name="description" content="Ask questions and get detailed information about RV technology from our AI assistant. Free educational consultation tool." />
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
              AI Educational Consultant
            </h1>
            <p className="text-lg text-[#E2E8FF] max-w-2xl mx-auto">
              Get expert answers to your RV technology questions
            </p>
          </div>

          <AIEducationalConsultant />
        </div>
      </div>
    </>
  );
};

export default EducationalConsultant;
