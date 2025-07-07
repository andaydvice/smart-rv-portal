import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';

interface Product {
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
}

interface MobileProductCarouselProps {
  products: Product[];
  title?: string;
  className?: string;
}

const MobileProductCarousel = ({ products, title, className = "" }: MobileProductCarouselProps) => {
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-white mb-4 px-4">{title}</h3>
      )}
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <AffiliateProductCard
                  {...product}
                  className="h-full touch-manipulation"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Desktop navigation buttons */}
        <div className="hidden md:block">
          <CarouselPrevious className="bg-[#091020] border-gray-700 text-white hover:bg-[#5B9BD5] hover:border-[#5B9BD5]" />
          <CarouselNext className="bg-[#091020] border-gray-700 text-white hover:bg-[#5B9BD5] hover:border-[#5B9BD5]" />
        </div>
      </Carousel>
      
      {/* Mobile swipe hint */}
      <div className="md:hidden text-center mt-3">
        <p className="text-xs text-gray-400">
          ← Swipe to see more products →
        </p>
      </div>
    </div>
  );
};

export default MobileProductCarousel;