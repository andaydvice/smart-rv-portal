import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';

interface AffiliateProductCardProps {
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
}

const AffiliateProductCard = ({
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
  className = ""
}: AffiliateProductCardProps) => {
  return (
    <Card className={`bg-[#091020] border-gray-700 text-white hover:border-[#5B9BD5]/50 transition-all duration-300 ${className}`}>
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {badges.length > 0 && (
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
        
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{title}</h3>
          
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
          
          <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
          
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#5B9BD5] rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#5B9BD5]">{price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
              )}
            </div>
            
            <Button 
              asChild
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2 rounded-lg transition-all duration-200 min-h-[44px] touch-manipulation active:scale-95 hover:shadow-lg"
            >
              <a 
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                onClick={() => {
                  // Add haptic feedback for mobile
                  if (navigator.vibrate) {
                    navigator.vibrate(50);
                  }
                }}
              >
                View Deal
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            *This post contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateProductCard;