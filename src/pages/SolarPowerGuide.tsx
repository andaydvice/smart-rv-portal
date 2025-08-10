import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';

import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sun, Battery, Zap, Calculator, 
  TrendingUp, Leaf, DollarSign, CheckCircle 
} from 'lucide-react';

const SolarPowerGuide = () => {
  const [dailyUsage, setDailyUsage] = useState(3000);
  const [sunHours, setSunHours] = useState(5);

  const calculateSolarNeeds = () => {
    const requiredWatts = Math.ceil(dailyUsage / sunHours);
    const recommendedPanels = Math.ceil(requiredWatts / 200); // Assuming 200W panels
    const batteryCapacity = Math.ceil(dailyUsage / 12); // 12V system
    
    return {
      requiredWatts,
      recommendedPanels,
      batteryCapacity,
      estimatedCost: (recommendedPanels * 250) + (batteryCapacity * 2) // Rough estimate
    };
  };

  const solarNeeds = calculateSolarNeeds();

  const solarKits = [
    {
      title: "Renogy 400W RV Solar Kit",
      description: "Complete solar power system perfect for weekend RVers and light power usage.",
      price: "$699.99",
      originalPrice: "$899.99",
      rating: 4.7,
      reviewCount: 3421,
      image: "/lovable-uploads/50e7b0c3-9d9a-4dae-bdb8-4c237aa4e3fe.png",
      features: [
        "4x 100W monocrystalline panels",
        "40A MPPT charge controller",
        "Complete wiring kit",
        "Mounting hardware included",
        "25-year panel warranty"
      ],
      affiliateLink: "https://renogy.com/400w-rv-solar-kit",
      badges: ["Best Seller", "Complete Kit"]
    },
    {
      title: "Goal Zero Yeti 1500X Solar Generator",
      description: "Portable solar power station with 1516Wh capacity, perfect for off-grid adventures.",
      price: "$1,999.99",
      originalPrice: "$2,499.99",
      rating: 4.8,
      reviewCount: 1876,
      image: "/lovable-uploads/69d5ac06-d442-462c-8114-0761265710bd.png",
      features: [
        "1516Wh lithium battery",
        "WiFi app monitoring",
        "Multiple charging options",
        "Silent operation",
        "Expandable capacity"
      ],
      affiliateLink: "https://goalzero.com/yeti-1500x",
      badges: ["Portable", "Premium"]
    },
    {
      title: "Battle Born 100Ah LiFePO4 Battery",
      description: "Premium lithium battery with 10-year warranty, perfect for solar energy storage.",
      price: "$949.99",
      originalPrice: "$1,199.99",
      rating: 4.9,
      reviewCount: 2234,
      image: "/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png",
      features: [
        "100Ah LiFePO4 technology",
        "10-year warranty",
        "Built-in BMS protection",
        "3000+ cycle life",
        "Drop-in replacement"
      ],
      affiliateLink: "https://battleborn.com/100ah-lifepo4-battery",
      badges: ["Premium", "10 Year Warranty"]
    }
  ];


  const benefitCards = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Save Money",
      description: "Reduce or eliminate campground fees by boondocking with solar power",
      color: "text-green-400"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Eco-Friendly",
      description: "Clean, renewable energy reduces your carbon footprint",
      color: "text-green-400"
    },
    {
      icon: <Battery className="h-8 w-8" />,
      title: "Energy Independence",
      description: "Power your RV anywhere the sun shines, no hookups needed",
      color: "text-blue-400"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Increase RV Value",
      description: "Solar installations add value and appeal to your RV",
      color: "text-purple-400"
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Solar Power Guide</title>
        <meta name="description" content="Complete guide to Smart RV solar power systems. Compare panels, batteries, and kits. Calculate your solar needs and find the best deals on equipment." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/solar-power-guide' : ''} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'TechnoRV Solar Systems', url: 'https://technorv.com?ref=smarttech' },
              { '@type': 'ListItem', position: 2, name: 'Good Sam Solar Services', url: 'https://goodsam.com?ref=smartrv' },
              { '@type': 'ListItem', position: 3, name: 'RV Life Solar Planning', url: 'https://rvlife.com?ref=smartportal' }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Sun className="h-12 w-12 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Smart RV Solar Power Guide
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Harness the power of the sun for unlimited Smart RV adventures. Complete shopping guide, installation tips, and expert recommendations for Smart RV solar systems.
            </p>
          </div>

          {/* Solar Calculator */}
          <Card className="bg-[#091020] border-yellow-600 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400 flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                Solar Needs Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Daily Power Usage (Watt-hours)
                    </label>
                    <Input
                      type="number"
                      value={dailyUsage}
                      onChange={(e) => setDailyUsage(Number(e.target.value))}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Average RV uses 2000-4000 Wh per day
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Average Daily Sun Hours
                    </label>
                    <Input
                      type="number"
                      value={sunHours}
                      onChange={(e) => setSunHours(Number(e.target.value))}
                      className="bg-[#131a2a] border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Varies by location: 4-7 hours typical
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#131a2a] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">Your Solar Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Solar Panels Needed:</span>
                      <span className="text-white font-medium">{solarNeeds.requiredWatts}W ({solarNeeds.recommendedPanels} panels)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Battery Capacity:</span>
                      <span className="text-white font-medium">{solarNeeds.batteryCapacity}Ah</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Estimated Cost:</span>
                      <span className="text-yellow-400 font-bold">${solarNeeds.estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefitCards.map((benefit, index) => (
              <Card key={index} className="bg-[#091020] border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className={`flex justify-center mb-4 ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Product Tabs */}
          <Tabs defaultValue="kits" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 bg-[#1a202c] mb-8">
              <TabsTrigger value="kits" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">Complete Kits</TabsTrigger>
              <TabsTrigger value="panels" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">Solar Panels</TabsTrigger>
              <TabsTrigger value="batteries" className="text-[#60A5FA] data-[state=active]:bg-[#2D3748]">Batteries</TabsTrigger>
            </TabsList>

            <TabsContent value="kits">
              <OptimizedAffiliateGrid
                title="☀️ Complete Solar Kits & Systems"
                subtitle="Professional solar kits and systems designed specifically for RV installations with everything you need."
                partners={[
                  {
                    partner: 'technorv',
                    title: 'TechnoRV Solar Systems',
                    description: 'Complete solar power systems with smart monitoring and professional installation support.',
                    features: ['Complete Solar Kits', 'Smart Monitoring', 'Professional Installation', 'System Optimization'],
                    buttonText: 'Shop Solar Systems'
                  },
                  {
                    partner: 'goodsam',
                    title: 'Good Sam Solar Solutions',
                    description: 'Trusted solar installations with expert support and comprehensive warranties for RV solar systems.',
                    features: ['Expert Installation', 'Comprehensive Warranties', 'Professional Support', 'System Maintenance'],
                    buttonText: 'Get Solar Installation'
                  },
                  {
                    partner: 'rvlife',
                    title: 'RV Life Solar Planning',
                    description: 'Solar system planning tools and expert guidance to design the perfect solar setup for your RV.',
                    features: ['Solar Planning Tools', 'System Design', 'Expert Guidance', 'Installation Support'],
                    buttonText: 'Plan Solar System'
                  }
                ]}
                gridCols="3"
              />
            </TabsContent>

            <TabsContent value="panels">
              <OptimizedAffiliateGrid
                title="☀️ Top RV Solar Panel Comparison"
                subtitle="Compare the most popular solar panels designed specifically for RV installations."
                partners={[
                  {
                    partner: 'technorv',
                    title: 'Renogy 200W Monocrystalline - Best Overall',
                    description: '21% efficiency monocrystalline panels with 25-year warranty and proven reliability.',
                    features: ['200W Output', '21%+ Efficiency', 'Monocrystalline Tech', '25 Year Warranty', 'IP67 Rating'],
                    buttonText: 'Shop Premium Panels'
                  },
                  {
                    partner: 'goodsam',
                    title: 'AIMS 160W Flexible - Most Versatile',
                    description: 'Lightweight flexible panels perfect for curved RV roofs and unique installations.',
                    features: ['160W Output', 'Flexible Design', 'Lightweight (8.8 lbs)', '5 Year Warranty', 'Easy Installation'],
                    buttonText: 'Get Flexible Panels'
                  },
                  {
                    partner: 'rvlife',
                    title: 'WindyNation 100W - Budget Choice',
                    description: 'Budget-friendly polycrystalline panels with good warranty and reliable performance.',
                    features: ['100W Output', '17% Efficiency', 'Budget Friendly', '25 Year Warranty', 'Reliable Performance'],
                    buttonText: 'Shop Budget Panels'
                  }
                ]}
                gridCols="3"
              />
            </TabsContent>

            <TabsContent value="batteries">
              <OptimizedAffiliateGrid
                title="🔋 Battery Storage & Power Solutions"
                subtitle="High-quality battery systems and power management solutions for reliable RV solar energy storage."
                partners={[
                  {
                    partner: 'technorv',
                    title: 'TechnoRV Battery Systems',
                    description: 'Advanced battery storage solutions with smart monitoring and energy management systems.',
                    features: ['Smart Battery Systems', 'Energy Management', 'Monitoring Technology', 'Professional Installation'],
                    buttonText: 'Shop Battery Systems'
                  },
                  {
                    partner: 'goodsam',
                    title: 'Good Sam Power Solutions',
                    description: 'Complete power system support with installation, maintenance, and warranty coverage.',
                    features: ['Professional Installation', 'System Maintenance', 'Warranty Coverage', 'Technical Support'],
                    buttonText: 'Get Power Support'
                  }
                ]}
                gridCols="2"
              />
            </TabsContent>
          </Tabs>

          {/* Installation Services CTA */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800 mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">⚡ Professional Installation Available</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Not ready to DIY? Get professional solar installation from certified RV solar specialists. 
                  Nationwide service with warranties on parts and labor.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg min-h-[48px] touch-manipulation">
                    <a href="https://amsolar.com/installation" target="_blank" rel="noopener noreferrer">
                      Get Installation Quote
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-blue-500 text-blue-300 hover:bg-blue-900/50 px-8 py-3 rounded-lg min-h-[48px] touch-manipulation">
                    <a href="https://renogy.com/installation-guide" target="_blank" rel="noopener noreferrer">
                      DIY Installation Guide
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <OptimizedAffiliateGrid
            title="Professional Solar Installation & Support"
            subtitle="Get expert solar installation and monitoring systems for your RV power needs"
            partners={[
              {
                partner: 'technorv',
                title: 'TechnoRV Solar Installation',
                description: 'Professional solar system installation with smart monitoring and energy management',
                features: ['Professional Installation', 'Smart Monitoring', 'Energy Management', 'System Optimization'],
                path: '/solar-installation',
                buttonText: 'Schedule Solar Installation'
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Solar Maintenance',
                description: 'Expert maintenance and support services for RV solar power systems',
                features: ['System Maintenance', 'Performance Optimization', 'Technical Support', 'Warranty Service'],
                path: '/solar-maintenance',
                buttonText: 'Get Solar Support'
              }
            ]}
            gridCols="2"
          />

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure compact />
        </Container>
      </div>
    </Layout>
  );
};

export default SolarPowerGuide;