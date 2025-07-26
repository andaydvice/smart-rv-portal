import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AffiliatePartnerCard } from './AffiliatePartnerSystem';
import AffiliateDisclosure from './AffiliateDisclosure';

interface OptimizedAffiliateGridProps {
  title: string;
  subtitle: string;
  partners: Array<{
    partner: 'rvshare' | 'outdoorsy' | 'rvlife' | 'goodsam' | 'technorv' | 'rvwaterfilter' | 
             'rvtcom' | 'solardirect' | 'a1solarstore' | 'renogy' | 'dakotalithium' | 'blueox' | 
             'torklift' | 'guta' | 'victron' | 'winegard' | 'nomadinternet' | 'heatso' | 
             'hotshotssecret' | 'mobilehomeparts';
    title?: string;
    description?: string;
    features?: string[];
    path?: string;
    buttonText?: string;
  }>;
  className?: string;
  gridCols?: 'auto' | '2' | '3' | '4';
  videoId?: string;
  videoTitle?: string;
  priority?: 'high' | 'medium' | 'low';
}

export const OptimizedAffiliateGrid: React.FC<OptimizedAffiliateGridProps> = ({
  title,
  subtitle,
  partners,
  className = '',
  gridCols = 'auto',
  videoId,
  videoTitle,
  priority = 'low'
}) => {
  const getGridClass = () => {
    switch (gridCols) {
      case '2': return 'grid-cols-1 lg:grid-cols-2';
      case '3': return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
      case '4': return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-4';
      default: return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6">
        {videoId && (
          <div className="mb-6">
            <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={`https://iframe.adilo.bigcommand.com/video/${videoId}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title={videoTitle || title}
              />
            </div>
            {priority === 'high' && (
              <div className="mt-2 text-xs text-connectivity-accent font-medium">
                🎯 High-Priority Recommendation
              </div>
            )}
          </div>
        )}
        
        <h2 className="text-xl text-connectivity-accent font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-300 mb-6">{subtitle}</p>
        
        <div className={`grid ${getGridClass()} gap-6`}>
          {partners.map((partnerConfig, index) => (
            <AffiliatePartnerCard
              key={index}
              partner={partnerConfig.partner}
              title={partnerConfig.title}
              customDescription={partnerConfig.description}
              features={partnerConfig.features}
              path={partnerConfig.path}
              buttonText={partnerConfig.buttonText}
            />
          ))}
        </div>
      </div>
      
      <AffiliateDisclosure compact />
    </div>
  );
};