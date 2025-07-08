import React from 'react';
import { Helmet } from 'react-helmet';
import { Mic, MessageCircleQuestion } from 'lucide-react';

interface VoiceSearchProps {
  conversationalQueries: string[];
  localQueries?: string[];
  actionQueries?: string[];
  pageContent: string;
}

const VoiceSearchOptimization: React.FC<VoiceSearchProps> = ({
  conversationalQueries,
  localQueries = [],
  actionQueries = [],
  pageContent
}) => {
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": [".voice-optimized-content", ".featured-snippet"],
    "xpath": [
      "/html/head/title",
      "//*[@class='voice-optimized-content']"
    ]
  };

  const generateNaturalLanguageContent = () => {
    const questions = [
      ...conversationalQueries,
      ...localQueries.map(q => `${q} near me`),
      ...actionQueries.map(q => `How to ${q}`)
    ];

    return questions.slice(0, 5); // Limit for performance
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(speakableSchema)}
        </script>
        <meta name="voice-search-optimized" content="true" />
        <meta name="conversational-queries" content={conversationalQueries.join(', ')} />
      </Helmet>

      <div className="voice-optimized-content space-y-6">
        {/* Conversational Q&A Section */}
        <div className="bg-[#151A22] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Mic className="h-5 w-5 text-[#5B9BD5] mr-2" />
            <h3 className="text-lg font-semibold text-white">Voice Search Friendly</h3>
          </div>
          
          <div className="space-y-4">
            {generateNaturalLanguageContent().map((query, index) => (
              <div key={index} className="border-l-4 border-[#5B9BD5] pl-4">
                <div className="flex items-start">
                  <MessageCircleQuestion className="h-4 w-4 text-[#5B9BD5] mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm mb-1">"{query}"</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {pageContent.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Voice Search Optimization */}
        {localQueries.length > 0 && (
          <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
            <h4 className="text-white font-medium mb-3">Local Voice Search</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {localQueries.map((query, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  "Where can I find {query} near me?"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action-Based Queries */}
        {actionQueries.length > 0 && (
          <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
            <h4 className="text-white font-medium mb-3">Action-Based Queries</h4>
            <div className="space-y-2">
              {actionQueries.map((action, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  "How do I {action}?"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Snippet Optimization */}
        <div className="featured-snippet bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 rounded-lg p-6 border border-[#5B9BD5]/30">
          <div className="max-w-none">
            <p className="text-white leading-relaxed">
              {pageContent.substring(0, 160)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceSearchOptimization;