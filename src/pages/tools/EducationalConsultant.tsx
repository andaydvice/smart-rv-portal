import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AIEducationalConsultant } from '@/components/rv-technology/interactive/AIEducationalConsultant';
import { availableTools } from '@/lib/toolsData';
import aiEducationalConsultantHero from '@/assets/ai-educational-consultant-hero.png';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const EducationalConsultant: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          
          <div className="max-w-6xl mx-auto mt-8">
            <AffiliateDisclosure />
          </div>

          {/* Related Resources */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12">
              <h3 className="text-xl font-semibold text-white mb-4">Continue Your Research</h3>
              <p className="text-gray-300 mb-6">Explore additional resources to help make your decision</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/rv-technology-guide" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Technology Guide</h4>
                  <p className="text-gray-400 text-sm">Learn about RV technology systems</p>
                </Link>
                <Link to="/models" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">View Models</h4>
                  <p className="text-gray-400 text-sm">Compare RV models and features</p>
                </Link>
                <Link to="/features" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Smart Features</h4>
                  <p className="text-gray-400 text-sm">Explore available smart systems</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="educational-consultant" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationalConsultant;
