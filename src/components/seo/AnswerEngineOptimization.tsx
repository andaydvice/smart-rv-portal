import React from 'react';
import { Helmet } from 'react-helmet';

interface AEOProps {
  question: string;
  answer: string;
  context?: string;
  relatedQuestions?: string[];
  pageTitle?: string;
}

const AnswerEngineOptimization: React.FC<AEOProps> = ({
  question,
  answer,
  context,
  relatedQuestions = [],
  pageTitle
}) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      },
      ...relatedQuestions.map(q => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit our comprehensive guide for detailed information."
        }
      }))
    ]
  };

  const howToSchema = context ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": pageTitle || question,
    "description": answer,
    "step": context.split('\n').filter(step => step.trim()).map((step, index) => ({
      "@type": "HowToStep",
      "name": `Step ${index + 1}`,
      "text": step.trim()
    }))
  } : null;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        {howToSchema && (
          <script type="application/ld+json">
            {JSON.stringify(howToSchema)}
          </script>
        )}
      </Helmet>
      
      <div className="bg-[#151A22] rounded-lg p-6 border border-gray-700 mb-6">
        <div className="prose prose-invert max-w-none">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-start">
            <span className="w-6 h-6 bg-[#5B9BD5] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5">
              Q
            </span>
            {question}
          </h3>
          
          <div className="ml-9">
            <div className="text-gray-300 leading-relaxed mb-4">
              {answer}
            </div>
            
            {context && (
              <div className="bg-[#091020] rounded-lg p-4 border border-gray-600">
                <h4 className="text-white font-medium mb-2">Step-by-step guide:</h4>
                <div className="space-y-2">
                  {context.split('\n').filter(step => step.trim()).map((step, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-[#5B9BD5]/20 rounded-full flex items-center justify-center text-[#5B9BD5] text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-400 text-sm">{step.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {relatedQuestions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-white font-medium mb-2">Related Questions:</h4>
                <ul className="space-y-1">
                  {relatedQuestions.map((q, index) => (
                    <li key={index} className="text-[#5B9BD5] text-sm hover:text-[#4B8FE3] cursor-pointer">
                      • {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerEngineOptimization;