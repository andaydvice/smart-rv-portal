import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Bookmark, TrendingUp, Zap, Timer } from 'lucide-react';
import { useABTesting } from '@/hooks/useABTesting';

interface MobileConversionOptimizerProps {
  products: Record<string, any>[];
  onProductClick: (product: Record<string, any>) => void;
  onWishlistAdd: (product: Record<string, any>) => void;
  onShare: (product: Record<string, any>) => void;
}

const MobileConversionOptimizer = ({
  products,
  onProductClick,
  onWishlistAdd,
  onShare
}: MobileConversionOptimizerProps) => {
  const { variant: navVariant, config: navConfig } = useABTesting('mobile_navigation');
  const [quickAccessVisible, setQuickAccessVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Show quick access after scrolling 20%
      setQuickAccessVisible(progress > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showQuickAccess = navConfig.showQuickAccess && quickAccessVisible;
  const quickAccessItems = navConfig.quickAccessItems || [];

  return (
    <>
      {/* Enhanced Mobile Navigation */}
      {navConfig.stickyHeader && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#091020]/95 backdrop-blur-sm border-b border-gray-700">
          <div className="h-1 bg-[#5B9BD5]" style={{ width: `${scrollProgress}%` }} />
          <div className="flex items-center justify-between p-4">
            <h1 className="text-white font-semibold">RV Deals</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                {products.length} Items
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Floating Menu */}
      {showQuickAccess && (
        <div className="fixed bottom-20 right-4 z-40 space-y-2">
          {quickAccessItems.includes('apps') && (
            <FloatingActionButton
              icon={<Zap className="h-5 w-5" />}
              label="Apps"
              onClick={() => window.location.href = '/rv-apps-hub'}
              color="bg-blue-600"
            />
          )}
          {quickAccessItems.includes('deals') && (
            <FloatingActionButton
              icon={<TrendingUp className="h-5 w-5" />}
              label="Deals"
              onClick={() => document.getElementById('featured-apps')?.scrollIntoView({ behavior: 'smooth' })}
              color="bg-green-600"
            />
          )}
          {quickAccessItems.includes('calculator') && (
            <FloatingActionButton
              icon={<Timer className="h-5 w-5" />}
              label="Tools"
              onClick={() => window.location.href = '/calculators'}
              color="bg-purple-600"
            />
          )}
        </div>
      )}

      {/* Swipe-Optimized Product Grid */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <SwipeableProductCard
            key={index}
            product={product}
            onProductClick={onProductClick}
            onWishlistAdd={onWishlistAdd}
            onShare={onShare}
          />
        ))}
      </div>

      {/* Conversion Booster Banner */}
      <ConversionBoosterBanner />
    </>
  );
};

const FloatingActionButton = ({ 
  icon, 
  label, 
  onClick, 
  color = "bg-[#5B9BD5]" 
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}) => (
  <Button
    onClick={onClick}
    className={`${color} hover:opacity-90 w-12 h-12 rounded-full shadow-lg transition-all duration-300 group relative`}
  >
    {icon}
    <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </Button>
);

const SwipeableProductCard = ({ 
  product, 
  onProductClick, 
  onWishlistAdd, 
  onShare 
}: {
  product: Record<string, any>;
  onProductClick: (product: Record<string, any>) => void;
  onWishlistAdd: (product: Record<string, any>) => void;
  onShare: (product: Record<string, any>) => void;
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    // Store initial touch position for swipe detection
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Handle swipe gestures
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onWishlistAdd(product);
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <Card 
      className="bg-[#091020] border-gray-700 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <CardContent className="p-0">
        <div className="relative">
          {/* Product Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            {/* Quick Actions Overlay */}
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleWishlistToggle}
                className={`w-8 h-8 rounded-full ${isWishlisted ? 'bg-red-600' : 'bg-black/50'} hover:bg-red-600`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-white' : 'text-white'}`} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onShare(product)}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#5B9BD5]"
              >
                <Share2 className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-[#5B9BD5] text-white font-bold">
                {product.price}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-white font-medium mb-2 line-clamp-2">
              {product.title}
            </h3>
            
            {/* Quick Features */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.features?.slice(0, 3).map((feature: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs border-gray-600 text-gray-300"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => onProductClick(product)}
              className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              View Deal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ConversionBoosterBanner = () => (
  <Card className="bg-gradient-to-r from-[#5B9BD5]/20 to-[#4B8FE3]/20 border-[#5B9BD5]/30 mt-8">
    <CardContent className="p-6 text-center">
      <Bookmark className="h-8 w-8 text-[#5B9BD5] mx-auto mb-3" />
      <h3 className="text-white font-semibold mb-2">Save Your Favorites</h3>
      <p className="text-gray-300 text-sm mb-4">
        Tap the heart icon to save products and get notified of price drops!
      </p>
      <Button 
        variant="outline" 
        size="sm"
        className="border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5]/10"
      >
        Learn More
      </Button>
    </CardContent>
  </Card>
);

export default MobileConversionOptimizer;