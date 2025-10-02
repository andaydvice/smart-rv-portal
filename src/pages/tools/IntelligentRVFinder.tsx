import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RelatedTools } from '@/components/rv-technology/RelatedTools';
import { availableTools } from '@/lib/toolsData';
import intelligentRvFinderHero from '@/assets/intelligent-rv-finder-hero.jpg';
import IntelligentRVFinderComponent from '@/components/rv-technology/interactive/IntelligentRVFinder';

const IntelligentRVFinder = () => {
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

          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <img 
              src={intelligentRvFinderHero} 
              alt="Intelligent RV Finder"
              className="w-full h-80 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] via-[#080F1F]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Intelligent RV Finder
              </h1>
              <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
                Get personalized RV recommendations based on your lifestyle and needs, with real search results.
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <IntelligentRVFinderComponent />
          </div>

          <RelatedTools tools={relatedTools} currentToolId="intelligent-rv-finder" />
        </div>
      </div>
    </>
  );
};

export default IntelligentRVFinder;
