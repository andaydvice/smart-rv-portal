import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { availableTools } from '@/lib/toolsData';
import intelligentRvFinderHero from '@/assets/intelligent-rv-finder-hero.jpg';
import IntelligentRVFinderComponent from '@/components/rv-technology/interactive/IntelligentRVFinder';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const IntelligentRVFinder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedTools = availableTools
    .filter(tool => tool.id !== 'intelligent-rv-finder')
    .map(tool => ({
      id: tool.id,
      title: tool.title,
      description: tool.description,
      icon: tool.icon,
      path: tool.path,
      color: tool.color
    }));

  return (
    <>
      <Helmet>
        <title>Intelligent RV Finder | AI-Powered RV Recommendations</title>
        <meta 
          name="description" 
          content="Get personalized RV recommendations based on your lifestyle and needs. Our AI analyzes your requirements and provides tailored suggestions from real inventory." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Intelligent RV Finder' }
          ]} />
        </div>

        <div className="relative w-full my-12">
          <img 
            src={intelligentRvFinderHero} 
            alt="Intelligent RV Finder"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-5xl px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 image-overlay-headline">
                Intelligent RV Finder
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto image-overlay-headline">
                Get personalized RV recommendations based on your lifestyle and needs, with real search results.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <IntelligentRVFinderComponent />
          </div>

          <div className="max-w-6xl mx-auto mt-8">
            <AffiliateDisclosure />
          </div>

          <RelatedTools tools={relatedTools} currentToolId="intelligent-rv-finder" />
        </div>
      </div>
    </>
  );
};

export default IntelligentRVFinder;
