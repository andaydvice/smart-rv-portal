import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import VoiceCommerce from '@/components/mobile/VoiceCommerce';
import BehavioralAnalytics from '@/components/analytics/BehavioralAnalytics';
import SocialCommerce from '@/components/social/SocialCommerce';
import CoreWebVitalsOptimizer from '@/components/performance/CoreWebVitalsOptimizer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  TrendingUp, 
  Users, 
  Gauge, 
  ShoppingCart, 
  Heart,
  Star 
} from 'lucide-react';

// Mock product data for voice commerce
const mockProducts = [
  {
    id: '1',
    name: 'WeBoost Drive Reach RV Cell Signal Booster',
    price: '$499.99',
    rating: 4.8,
    image: '/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.png',
    description: 'Powerful cell signal booster specifically designed for RVs and motorhomes.',
    category: 'connectivity',
    affiliateLink: 'https://amazon.com/weboost-drive-reach',
    features: ['50dB gain', 'Works with all carriers', 'Easy installation', 'FCC approved']
  },
  {
    id: '2',
    name: 'Renogy 400W Solar Panel Kit',
    price: '$529.99',
    rating: 4.6,
    image: '/lovable-uploads/46dcd85e-d26f-4d08-afc1-5f5818266116.png',
    description: 'Complete solar power solution for off-grid RV adventures.',
    category: 'solar',
    affiliateLink: 'https://amazon.com/renogy-solar-kit',
    features: ['400W monocrystalline', 'MPPT controller', 'Complete kit', '25-year warranty']
  },
  {
    id: '3',
    name: 'Dometic CFX3 45 Portable Refrigerator',
    price: '$749.99',
    rating: 4.7,
    image: '/lovable-uploads/50e7b0c3-9d9a-4dae-bdb8-4c237aa4e3fe.png',
    description: 'Energy-efficient portable refrigerator perfect for RV travel.',
    category: 'appliances',
    affiliateLink: 'https://amazon.com/dometic-cfx3-45',
    features: ['12V/24V DC', 'WiFi connectivity', 'Ultra-low power', '3-year warranty']
  }
];

const VoiceCommercePage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product]);
    console.log('Added to cart:', product.name);
  };

  const handleWishlistAdd = (product: any) => {
    setWishlist(prev => [...prev, product]);
    console.log('Added to wishlist:', product.name);
  };

  return (
    <Layout>
      <Navbar />
      <main className="relative w-full flex-grow bg-gradient-to-b from-[#080F1F] to-[#151A22] min-h-screen">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Mic className="h-12 w-12 text-[#5B9BD5] mr-4" />
              <h1 className="text-5xl font-bold text-white">
                Voice Commerce & AI Intelligence
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of RV shopping with voice-activated commerce, 
              behavioral analytics, social proof, and performance optimization.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4 text-center">
                  <Mic className="h-8 w-8 text-[#5B9BD5] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">85%</p>
                  <p className="text-sm text-gray-400">Voice Accuracy</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">45%</p>
                  <p className="text-sm text-gray-400">Conversion Lift</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">15K+</p>
                  <p className="text-sm text-gray-400">Active Users</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#091020] border-gray-700">
                <CardContent className="p-4 text-center">
                  <Gauge className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">98</p>
                  <p className="text-sm text-gray-400">Performance Score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <Tabs defaultValue="voice-commerce" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-[#091020] border border-gray-700">
              <TabsTrigger 
                value="voice-commerce" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Mic className="h-4 w-4" />
                Voice Commerce
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                Social
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="flex items-center gap-2 data-[state=active]:bg-[#5B9BD5] data-[state=active]:text-white"
              >
                <Gauge className="h-4 w-4" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice-commerce" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Voice-Activated Shopping Experience
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Shop hands-free with voice commands. Find products, ask questions, 
                  and make purchases using natural language.
                </p>
              </div>
              
              {/* Cart and Wishlist Status */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <Badge variant="outline" className="border-[#5B9BD5] text-[#5B9BD5] px-4 py-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart: {cart.length} items
                </Badge>
                <Badge variant="outline" className="border-pink-500 text-pink-400 px-4 py-2">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist: {wishlist.length} items
                </Badge>
              </div>

              <VoiceCommerce
                products={mockProducts}
                onAddToCart={handleAddToCart}
                onWishlistAdd={handleWishlistAdd}
              />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Behavioral Analytics & Predictive Intelligence
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Real-time user behavior tracking with AI-powered conversion predictions 
                  and personalized recommendations.
                </p>
              </div>
              <BehavioralAnalytics />
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Social Commerce & Community
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Connect with fellow RV enthusiasts, share experiences, and discover 
                  products through authentic community recommendations.
                </p>
              </div>
              <SocialCommerce />
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Performance Optimization & Core Web Vitals
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Monitor and optimize website performance with real-time Core Web Vitals 
                  tracking and automated optimization suggestions.
                </p>
              </div>
              <CoreWebVitalsOptimizer />
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-[#5B9BD5]/20 to-[#4B8FE3]/20 border-[#5B9BD5]/30">
              <CardContent className="p-8">
                <Star className="h-12 w-12 text-[#5B9BD5] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Transform Your RV Experience?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join thousands of RV enthusiasts using our AI-powered platform 
                  for smarter shopping, better performance, and connected experiences.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-8 py-3"
                  >
                    Explore RV Apps Hub
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5] hover:text-white px-8 py-3"
                  >
                    View Analytics Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default VoiceCommercePage;