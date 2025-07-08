import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';
import { useABTesting } from '@/hooks/useABTesting';
import AffiliateTracker from '@/components/analytics/AffiliateTracker';

interface ABTestingProductCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  image: string;
  features: string[];
  affiliateLink: string;
  badges?: string[];
  className?: string;
  affiliatePartner?: string;
  productCategory?: string;
}

const ABTestingProductCard = ({
  title,
  description,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  features,
  affiliateLink,
  badges = [],
  className = "",
  affiliatePartner = "general",
  productCategory = "general"
}: ABTestingProductCardProps) => {
  const { variant, trackConversion, config } = useABTesting('affiliate_cta_buttons');
  const { variant: layoutVariant, config: layoutConfig } = useABTesting('product_card_layout');

  const handleCTAClick = () => {
    trackConversion('affiliate_click', 1);
    
    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Default values if A/B test not loaded
  const buttonColor = config.buttonColor || 'bg-[#5B9BD5]';
  const buttonText = config.buttonText || 'View Deal';
  const buttonStyle = config.buttonStyle || 'rounded-lg';
  
  const showBadges = layoutConfig.showBadges !== false;
  const showFeatures = layoutConfig.showFeatures !== false;
  const emphasizePrice = layoutConfig.emphasizePrice || false;
  const isMinimalLayout = layoutConfig.layout === 'minimal';

  return (
    <Card className={`bg-[#091020] border-gray-700 text-white hover:border-[#5B9BD5]/50 transition-all duration-300 ${className}`}>
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {showBadges && badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className="bg-[#5B9BD5] text-white px-2 py-1 text-xs rounded-full font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className={`p-4 space-y-3 ${isMinimalLayout ? 'space-y-2' : ''}`}>
          <h3 className={`font-semibold text-white line-clamp-2 ${isMinimalLayout ? 'text-base' : 'text-lg'}`}>
            {title}
          </h3>
          
          {!isMinimalLayout && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">({reviewCount})</span>
            </div>
          )}
          
          {!isMinimalLayout && (
            <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
          )}
          
          {showFeatures && (
            <ul className={`space-y-1 ${isMinimalLayout ? 'hidden' : ''}`}>
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#5B9BD5] rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-[#5B9BD5] ${emphasizePrice ? 'text-2xl' : 'text-xl'}`}>
                {price}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
              )}
            </div>
            
            <AffiliateTracker 
              contentId={title.toLowerCase().replace(/\s+/g, '-')}
              affiliatePartner={affiliatePartner}
            >
              <Button 
                asChild
                onClick={handleCTAClick}
                className={`${buttonColor} hover:opacity-90 text-white px-4 py-2 transition-all duration-200 min-h-[44px] touch-manipulation active:scale-95 hover:shadow-lg ${buttonStyle}`}
              >
                <a 
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {buttonText}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </AffiliateTracker>
          </div>
          
          {!isMinimalLayout && (
            <p className="text-xs text-gray-500 text-center">
              *This post contains affiliate links. We may earn a commission at no extra cost to you.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ABTestingProductCard;