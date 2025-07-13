import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AffiliatePartnerCard } from './AffiliatePartnerSystem';
import AffiliateDisclosure from './AffiliateDisclosure';

interface OptimizedAffiliateGridProps {
  title: string;
  subtitle: string;
  partners: Array<{
    partner: 'rvshare' | 'outdoorsy' | 'rvlife' | 'goodsam' | 'technorv' | 'rvwaterfilter';
    title?: string;
    description?: string;
    features?: string[];
    path?: string;
    buttonText?: string;
  }>;
  className?: string;
  gridCols?: 'auto' | '2' | '3' | '4';
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
      case '2': return 'grid-cols-1 lg:grid-cols-2';
      case '3': return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
      case '4': return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-4';
      default: return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      
      <AffiliateDisclosure compact />
    </div>
  );
};