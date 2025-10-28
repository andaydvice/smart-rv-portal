import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';


interface OptimizedAffiliateGridProps {
  title: string;
  subtitle: string;
  partners: Array<{
    name: string;
    url: string;
    title?: string;
    description?: string;
    features?: string[];
    buttonText?: string;
  }>;
  className?: string;
  gridCols?: 'auto' | '1' | '2' | '3' | '4';
}

export const OptimizedAffiliateGrid: React.FC<OptimizedAffiliateGridProps> = ({
  title,
  subtitle,
  partners,
  className = '',
  gridCols = 'auto'
}) => {
  const getGridClass = () => {
    switch (gridCols) {
      case '1': return 'grid-cols-1 max-w-3xl mx-auto';
      case '2': return 'grid-cols-1 lg:grid-cols-2';
      case '3': return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
      case '4': return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-4';
      default: return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6">
        
        <h2 className="text-xl text-connectivity-accent font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-300 mb-6">{subtitle}</p>
        
        <div className={`grid ${getGridClass()} gap-6`}>
          {partners.map((partnerConfig, index) => (
            <div key={index} className="bg-[#131a2a] border border-gray-600 rounded-lg p-6 pb-8 h-full flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-3">
                {partnerConfig.title || partnerConfig.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 flex-grow">
                {partnerConfig.description}
              </p>
              
              {partnerConfig.features && partnerConfig.features.length > 0 && (
                <ul className="text-sm text-gray-300 space-y-1 mb-4">
                  {partnerConfig.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              )}
              
              <div className="mt-auto pt-2">
                <Button asChild className="w-full bg-[#60A5FA] hover:bg-[#4B8FE3] text-white">
                  <a
                    href={partnerConfig.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    {partnerConfig.buttonText || `Visit ${partnerConfig.name}`}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      
    </div>
  );
};