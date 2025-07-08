import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, ShoppingCart, Volume2, Star, Heart } from 'lucide-react';
import VoiceSearch from './VoiceSearch';
import { useABTesting } from '@/hooks/useABTesting';

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  category: string;
  affiliateLink: string;
  features: string[];
}

interface VoiceCommerceProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onWishlistAdd?: (product: Product) => void;
}

const VoiceCommerce = ({ products, onAddToCart, onWishlistAdd }: VoiceCommerceProps) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [voiceFilters, setVoiceFilters] = useState<{
    category?: string;
    priceRange?: string;
    rating?: number;
  }>({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { variant, trackConversion } = useABTesting('voice_commerce_engagement');

  // Voice commerce commands
  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Product filtering by voice
    if (lowerCommand.includes('show') || lowerCommand.includes('find')) {
      if (lowerCommand.includes('solar')) {
        setVoiceFilters(prev => ({ ...prev, category: 'solar' }));
      }
      if (lowerCommand.includes('under') || lowerCommand.includes('below')) {
        const priceMatch = lowerCommand.match(/\$?(\d+)/);
        if (priceMatch) {
          setVoiceFilters(prev => ({ ...prev, priceRange: `under-${priceMatch[1]}` }));
        }
      }
      if (lowerCommand.includes('rated') || lowerCommand.includes('star')) {
        const ratingMatch = lowerCommand.match(/(\d+)\s*star/);
        if (ratingMatch) {
          setVoiceFilters(prev => ({ ...prev, rating: parseInt(ratingMatch[1]) }));
        }
      }
    }

    // Product actions
    if (lowerCommand.includes('add to cart') || lowerCommand.includes('buy')) {
      if (currentProduct) {
        onAddToCart?.(currentProduct);
        speakText(`Added ${currentProduct.name} to your cart`);
        trackConversion('voice_add_to_cart', 1);
      }
    }

    if (lowerCommand.includes('wishlist') || lowerCommand.includes('save')) {
      if (currentProduct) {
        onWishlistAdd?.(currentProduct);
        speakText(`Added ${currentProduct.name} to your wishlist`);
        trackConversion('voice_wishlist_add', 1);
      }
    }

    // Product details
    if (lowerCommand.includes('tell me about') || lowerCommand.includes('describe')) {
      if (currentProduct) {
        speakText(`${currentProduct.name}. ${currentProduct.description}. Rated ${currentProduct.rating} stars. Price ${currentProduct.price}`);
      }
    }

    if (lowerCommand.includes('features') || lowerCommand.includes('specs')) {
      if (currentProduct) {
        const featuresText = currentProduct.features.join(', ');
        speakText(`Key features include: ${featuresText}`);
      }
    }

    // Clear filters
    if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      setVoiceFilters({});
      speakText('Filters cleared, showing all products');
    }
  }, [currentProduct, onAddToCart, onWishlistAdd, trackConversion]);

  // Text-to-speech for product information
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  // Apply voice filters
  useEffect(() => {
    let filtered = products;

    if (voiceFilters.category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(voiceFilters.category!)
      );
    }

    if (voiceFilters.priceRange?.startsWith('under-')) {
      const maxPrice = parseInt(voiceFilters.priceRange.split('-')[1]);
      filtered = filtered.filter(p => {
        const price = parseInt(p.price.replace(/[^\d]/g, ''));
        return price < maxPrice;
      });
    }

    if (voiceFilters.rating) {
      filtered = filtered.filter(p => p.rating >= voiceFilters.rating!);
    }

    setFilteredProducts(filtered);

    // Announce results
    if (Object.keys(voiceFilters).length > 0) {
      speakText(`Found ${filtered.length} products matching your criteria`);
    }
  }, [voiceFilters, products, speakText]);

  return (
    <div className="space-y-6">
      {/* Voice Commerce Header */}
      <Card className="bg-[#091020] border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Mic className="h-6 w-6 text-[#5B9BD5]" />
            Voice Commerce
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-300">Use voice commands to shop hands-free</p>
            <Button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              variant={isVoiceActive ? "destructive" : "default"}
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3]"
            >
              {isVoiceActive ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {isVoiceActive ? 'Stop Voice' : 'Start Voice'}
            </Button>
          </div>

          {/* Voice Commands Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#131a2a] rounded-lg p-4">
              <h4 className="text-[#5B9BD5] font-medium mb-2">Search Commands</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• "Show me solar panels under $500"</li>
                <li>• "Find 5-star rated products"</li>
                <li>• "Clear all filters"</li>
              </ul>
            </div>
            <div className="bg-[#131a2a] rounded-lg p-4">
              <h4 className="text-[#5B9BD5] font-medium mb-2">Action Commands</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• "Add to cart"</li>
                <li>• "Save to wishlist"</li>
                <li>• "Tell me about this product"</li>
              </ul>
            </div>
          </div>

          {/* Active Filters */}
          {Object.keys(voiceFilters).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              {voiceFilters.category && (
                <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                  Category: {voiceFilters.category}
                </Badge>
              )}
              {voiceFilters.priceRange && (
                <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                  Price: {voiceFilters.priceRange}
                </Badge>
              )}
              {voiceFilters.rating && (
                <Badge variant="secondary" className="bg-[#5B9BD5]/20 text-[#5B9BD5]">
                  Rating: {voiceFilters.rating}+ stars
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Search Integration */}
      {isVoiceActive && (
        <VoiceSearch 
          onSearch={processVoiceCommand}
          onClose={() => setIsVoiceActive(false)}
        />
      )}

      {/* Voice-Optimized Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <VoiceProductCard
            key={product.id}
            product={product}
            isSelected={currentProduct?.id === product.id}
            onSelect={setCurrentProduct}
            onAddToCart={onAddToCart}
            onWishlistAdd={onWishlistAdd}
            onSpeak={speakText}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="bg-[#091020] border-gray-700">
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">No products match your voice search criteria.</p>
            <Button
              onClick={() => {
                setVoiceFilters({});
                speakText('Showing all products');
              }}
              className="mt-4 bg-[#5B9BD5] hover:bg-[#4B8FE3]"
            >
              Show All Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const VoiceProductCard = ({ 
  product, 
  isSelected, 
  onSelect, 
  onAddToCart, 
  onWishlistAdd,
  onSpeak 
}: {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onWishlistAdd?: (product: Product) => void;
  onSpeak: (text: string) => void;
}) => {
  return (
    <Card 
      className={`bg-[#091020] border-gray-700 cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-[#5B9BD5] ring-2 ring-[#5B9BD5]/50' : 'hover:border-[#5B9BD5]/50'
      }`}
      onClick={() => onSelect(product)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-[#5B9BD5] text-white">
              {product.price}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-medium mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({product.rating})</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              size="sm"
              className="flex-1 bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onWishlistAdd?.(product);
              }}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Heart className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSpeak(`${product.name}. ${product.description}. Price ${product.price}`);
              }}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCommerce;