import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { AILifestylePlanner } from '@/components/rv-technology/interactive/AILifestylePlanner';
import { availableTools } from '@/lib/toolsData';
import aiLifestyleTechnologyPlannerHero from '@/assets/ai-lifestyle-technology-planner-hero.png';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const LifestylePlanner: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        <div className="relative w-full my-12">
          <img 
            src={aiLifestyleTechnologyPlannerHero} 
            alt="AI Lifestyle Planner"
            className="w-full h-auto"
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
          
          <div className="max-w-6xl mx-auto mt-8">
            <AffiliateDisclosure />
          </div>

          {/* Plan Your Setup */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12">
              <h3 className="text-xl font-semibold text-white mb-4">Ready to Plan Your Perfect RV?</h3>
              <p className="text-gray-300 mb-6">Use these tools to continue planning your ideal RV lifestyle</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/calculators" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-yellow-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">RV Calculators</h4>
                  <p className="text-gray-400 text-sm">Calculate costs, fuel, and power needs</p>
                </Link>
                <Link to="/rv-comfort-guide" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-pink-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">Comfort Guide</h4>
                  <p className="text-gray-400 text-sm">Plan for maximum comfort on the road</p>
                </Link>
                <Link to="/models" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all">
                  <h4 className="text-white font-semibold mb-2">View Models</h4>
                  <p className="text-gray-400 text-sm">Find the perfect RV for your lifestyle</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <RelatedTools tools={availableTools} currentToolId="lifestyle-planner" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LifestylePlanner;
