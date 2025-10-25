import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AITechnologyReadinessAssessment } from '@/components/rv-technology/interactive/AITechnologyReadinessAssessment';
import { availableTools } from '@/lib/toolsData';
import rvTechnologyPlanningImage from '@/assets/rv-technology-planning.webp';
import { useToolAccess } from '@/hooks/useToolAccess';
import { QueryCounter } from '@/components/tools/QueryCounter';
import { ToolAccessGate } from '@/components/tools/ToolAccessGate';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const ReadinessAssessment: React.FC = () => {
  const navigate = useNavigate();
  const toolAccess = useToolAccess();
  const [showOptInModal, setShowOptInModal] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOptIn = (email: string, firstName: string) => {
    toolAccess.grantAccess(email, firstName);
    setShowOptInModal(false);
  };

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
        </div>

        <div className="relative w-full my-12">
          <img 
            src={rvTechnologyPlanningImage} 
            alt="AI Technology Readiness Assessment"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                AI Technology Readiness Assessment
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                Get personalized technology recommendations based on your experience and goals
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <QueryCounter 
              queriesUsed={toolAccess.queriesUsed}
              queriesRemaining={toolAccess.queriesRemaining}
              hasAccess={toolAccess.hasAccess}
            />
          </div>
          
          <AITechnologyReadinessAssessment 
            toolAccess={toolAccess}
            onShowOptIn={() => setShowOptInModal(true)}
          />
          
          <div className="max-w-6xl mx-auto mt-8">
            <AffiliateDisclosure />
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="readiness-assessment" />
          </div>

          {/* Explore Smart Features */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Learn About Smart RV Features</h3>
              <p className="text-gray-300 mb-6">Discover what makes an RV truly smart</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/features" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Smart Features Hub</h4>
                  <p className="text-gray-400 text-sm">Explore all available smart systems</p>
                </Link>
                <Link to="/features/internet-connectivity" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Connectivity</h4>
                  <p className="text-gray-400 text-sm">Stay connected anywhere</p>
                </Link>
                <Link to="/features/security-system" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-red-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Security Systems</h4>
                  <p className="text-gray-400 text-sm">Protect your investment</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToolAccessGate
        isOpen={showOptInModal}
        onOptIn={handleOptIn}
      />
    </>
  );
};

export default ReadinessAssessment;
