import React from 'react';
import { ExternalLinkButton } from '@/components/ui/external-link-button';

interface OptimizedAffiliateGridProps {
  title: string;
  subtitle: string;
  partners: any[];
  gridCols?: string;
  className?: string;
}

export const OptimizedAffiliateGrid: React.FC<OptimizedAffiliateGridProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl text-connectivity-accent font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-300 mb-6">{subtitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#131a2a] border border-gray-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-3">RV Life Pro</h3>
            <p className="text-gray-300 mb-4">Professional RV trip planning and navigation</p>
            <ExternalLinkButton href="https://rvlife.com" className="w-full">
              Learn More
            </ExternalLinkButton>
          </div>
          
          <div className="bg-[#131a2a] border border-gray-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-3">Solar Solutions</h3>
            <p className="text-gray-300 mb-4">Complete solar power systems for RVs</p>
            <ExternalLinkButton href="https://a1solarstore.com" className="w-full">
              Shop Solar
            </ExternalLinkButton>
          </div>
          
          <div className="bg-[#131a2a] border border-gray-600 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-3">RV Services</h3>
            <p className="text-gray-300 mb-4">Roadside assistance and support</p>
            <ExternalLinkButton href="https://goodsam.com" className="w-full">
              Get Support
            </ExternalLinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};