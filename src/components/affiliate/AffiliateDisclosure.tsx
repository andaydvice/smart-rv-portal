import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface AffiliateDisclosureProps {
  className?: string;
  compact?: boolean;
}

const AffiliateDisclosure = ({ className = "", compact = false }: AffiliateDisclosureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (compact) {
    return (
      <div className={`text-xs text-white font-bold text-left p-2 bg-gray-900/50 rounded ${className}`}>
        <InfoIcon className="h-3 w-3 inline-block mr-1" />
        Disclosure: This page may contain affiliate links. If you purchase through them, we may earn a commission at no additional cost to you.
      </div>
    );
  }

  return (
    <Card className={`bg-blue-900/20 border-blue-800 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <InfoIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-300 mb-2">Affiliate Disclosure</h3>
            <p className="text-sm text-gray-300 mb-3">
              This page may contain affiliate links. When you purchase through these links, we may earn a 
              commission at no additional cost to you. This helps support our content creation and allows 
              us to continue providing valuable RV information.
            </p>
            
            {isExpanded && (
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  <strong className="text-blue-300">Our Promise:</strong> We only recommend products and 
                  services we genuinely believe in and have thoroughly researched. Our affiliate partnerships 
                  never influence our honest reviews and recommendations.
                </p>
                
                <p>
                  <strong className="text-blue-300">How It Works:</strong> When you click an affiliate link 
                  and make a purchase, the retailer pays us a small commission. This doesn't change the price 
                  you pay - it's already built into the retailer's pricing structure.
                </p>
                
                <p>
                  <strong className="text-blue-300">Why We Use Affiliates:</strong> These partnerships help 
                  us maintain our website, create new content, and provide free resources to the smart RV community. 
                  Your support through these links directly contributes to our ability to help fellow RVers.
                </p>
                
                <p className="text-xs text-gray-400 pt-2 border-t border-blue-800">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal mt-2 touch-manipulation min-h-[44px] md:min-h-auto"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Learn More <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateDisclosure;