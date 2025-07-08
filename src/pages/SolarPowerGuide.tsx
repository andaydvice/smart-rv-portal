import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';
import AffiliateComparisonTable from '@/components/affiliate/AffiliateComparisonTable';
import AffiliateCTABanner from '@/components/affiliate/AffiliateCTABanner';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import CustomerReviewsSection from '@/components/affiliate/CustomerReviewsSection';
import { MobileProductCarousel, MobileScrollHint, MobileAnalytics } from '@/components/mobile';
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

  const comparisonData = {
    title: "Top RV Solar Panel Comparison",
    products: [
      {
        name: "Renogy 200W Monocrystalline",
        price: "$199.99",
        rating: 4.7,
        image: "/lovable-uploads/50e7b0c3-9d9a-4dae-bdb8-4c237aa4e3fe.png",
        features: {
          "Wattage": "200W",
          "Efficiency": "21%+",
          "Technology": "Monocrystalline",
          "Warranty": "25 years",
          "Dimensions": "64.5\" x 26.4\"",
          "Weight": "26.5 lbs",
          "Weather Rating": "IP67"
        },
        pros: ["High efficiency", "Proven reliability"],
        cons: ["Higher cost"],
        affiliateLink: "https://renogy.com/200w-monocrystalline",
        badge: "Best Overall"
      },
      {
        name: "AIMS Power 160W Flexible",
        price: "$179.99",
        rating: 4.5,
        image: "/lovable-uploads/23827d7d-a275-4073-9c09-3b69d2d10348.png",
        features: {
          "Wattage": "160W",
          "Efficiency": "19%",
          "Technology": "Flexible",
          "Warranty": "5 years",
          "Dimensions": "58\" x 26\"",
          "Weight": "8.8 lbs",
          "Weather Rating": "IP67"
        },
        pros: ["Flexible installation", "Lightweight"],
        cons: ["Lower efficiency"],
        affiliateLink: "https://aimscorp.net/160w-flexible-panel",
        badge: "Flexible"
      },
      {
        name: "WindyNation 100W Polycrystalline",
        price: "$89.99",
        rating: 4.3,
        image: "/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png",
        features: {
          "Wattage": "100W",
          "Efficiency": "17%",
          "Technology": "Polycrystalline",
          "Warranty": "25 years",
          "Dimensions": "40\" x 20\"",
          "Weight": "16.5 lbs",
          "Weather Rating": "IP65"
        },
        pros: ["Budget friendly", "Good warranty"],
        cons: ["Lower efficiency"],
        affiliateLink: "https://windynation.com/100w-solar-panel",
        badge: "Budget Choice"
      }
    ],
    featureCategories: [
      {
        title: "Power Specifications",
        features: ["Wattage", "Efficiency", "Technology"]
      },
      {
        title: "Physical Properties",
        features: ["Dimensions", "Weight", "Weather Rating"]
      },
      {
        title: "Warranty & Support",
        features: ["Warranty"]
      }
    ]
  };

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
        <title>RV Solar Power Guide - Complete Solar Shopping & Installation Guide</title>
        <meta name="description" content="Complete guide to RV solar power systems. Compare panels, batteries, and complete kits. Calculate your solar needs and find the best deals on solar equipment." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Sun className="h-12 w-12 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                RV Solar Power Guide
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Harness the power of the sun for unlimited RV adventures. Complete shopping guide, installation tips, and expert recommendations for RV solar systems.
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
              <Card className="bg-[#0a0a0a] border-gray-800" id="solar-kits">
                <CardHeader>
                  <CardTitle className="text-2xl text-yellow-400 text-center">🔋 Complete Solar Kits</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Desktop Grid */}
                  <div className="hidden lg:grid grid-cols-3 gap-6">
                    {solarKits.map((kit, index) => (
                      <AffiliateProductCard
                        key={index}
                        {...kit}
                        affiliatePartner="renogy"
                        productCategory="solar-equipment"
                        className="h-full"
                      />
                    ))}
                  </div>
                  
                  {/* Mobile Carousel */}
                  <div className="lg:hidden">
                    <MobileProductCarousel 
                      products={solarKits}
                      className="mb-4"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="panels">
              <AffiliateComparisonTable
                {...comparisonData}
              />
            </TabsContent>
            
            <TabsContent value="batteries">
              <Card className="bg-[#091020] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-yellow-400">🔋 Battery Storage Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AffiliateProductCard
                      title="Battle Born 100Ah LiFePO4 Battery"
                      description="Premium lithium battery with 10-year warranty, perfect for solar energy storage."
                      price="$949.99"
                      originalPrice="$1,199.99"
                      rating={4.9}
                      reviewCount={2234}
                      image="/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png"
                      features={[
                        "100Ah LiFePO4 technology",
                        "10-year warranty",
                        "Built-in BMS protection",
                        "3000+ cycle life"
                      ]}
                      affiliateLink="https://battleborn.com/100ah-lifepo4-battery"
                      badges={["Premium", "10 Year Warranty"]}
                    />
                    
                    <AffiliateProductCard
                      title="AIMS Power 200Ah Lithium Battery"
                      description="High-capacity lithium battery for extended off-grid power storage."
                      price="$1,299.99"
                      originalPrice="$1,599.99"
                      rating={4.7}
                      reviewCount={892}
                      image="/lovable-uploads/7b0c607c-52e6-47d2-b5fa-f5cbb912f20a.png"
                      features={[
                        "200Ah capacity",
                        "Built-in Bluetooth monitoring",
                        "8-year warranty",
                        "Fast charging capability"
                      ]}
                      affiliateLink="https://aimscorp.net/200ah-lithium-battery"
                      badges={["High Capacity"]}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Installation CTA */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-800 mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-300 mb-4">⚡ Professional Installation Available</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Need help installing your solar system? Get connected with certified RV solar installers in your area.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg min-h-[48px] touch-manipulation">
                    <a href="https://solar-power-with-will.com/rv-solar-installation/" target="_blank" rel="noopener noreferrer">
                      Find Installers
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-green-500 text-green-300 hover:bg-green-900/50 px-8 py-3 rounded-lg min-h-[48px] touch-manipulation">
                    <a href="https://renogy.com/diy-installation-guide/" target="_blank" rel="noopener noreferrer">
                      DIY Guide
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Reviews Section */}
          <CustomerReviewsSection
            productCategory="solar-equipment"
            affiliatePartner="renogy"
            className="mb-12"
          />

          {/* CTA Banner */}
          <AffiliateCTABanner
            title="Start Your Solar Journey Today"
            description="Join thousands of RVers who have achieved energy independence with solar power. Get the equipment and expertise you need for unlimited adventures."
            buttonText="Shop Solar Deals"
            affiliateLink="https://renogy.com/rv-solar-kits"
            backgroundColor="bg-gradient-to-r from-yellow-500 to-orange-500"
            className="mb-8"
          />

          {/* Mobile Scroll Hint */}
          <MobileScrollHint targetSection="solar-kits" text="Discover solar solutions" />
          
          {/* Mobile Analytics Tracking */}
          <MobileAnalytics 
            pageName="SolarPowerGuide" 
            affiliatePartners={["Renogy", "Goal Zero", "Battle Born", "AIMS Power", "WindyNation", "Solar Power with Will"]}
          />

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure />
        </Container>
      </div>
    </Layout>
  );
};

export default SolarPowerGuide;