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
import { AffiliatePartnerButton } from '@/components/affiliate/AffiliatePartnerSystem';
import { ExternalLinkButton } from '@/components/ui/external-link-button';

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

  // Removed hardcoded solar kits data - now using proper affiliate system


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
              { '@type': 'ListItem', position: 1, name: 'RV Life Solar Systems', url: 'https://rvlife.com?ref=smarttech' },
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
                    partner: 'a1solarstore',
                    title: 'Complete Solar Systems & Equipment',
                    description: 'Premium solar panels, battery banks, power stations, and complete off-grid electrical systems with 180-day cookie.',
                    features: ['Complete Solar Kits', 'Off-Grid Systems', 'Power Stations', '180-Day Cookie', '90% Confirmation Rate'],
                    buttonText: 'Shop A1 Solar Systems'
                  },
                  {
                    partner: 'solardirect',
                    title: 'Solar Direct Complete Solutions',
                    description: 'Complete solar panel systems, lithium batteries, charge controllers, and inverters with industry-leading 365-day cookie.',
                    features: ['Complete Systems', 'Lithium Batteries', 'Charge Controllers', '365-Day Cookie', 'Industry Leading Warranties'],
                    buttonText: 'Get Solar Direct'
                  },
                  {
                    partner: 'a1solarstore',
                    title: 'Wind Turbines & Alternative Power',
                    description: 'Solar generators, wind turbines, and hybrid power solutions for complete off-grid RV electrical systems.',
                    features: ['Wind Turbines', 'Solar Generators', 'Hybrid Systems', 'Off-Grid Solutions', 'Professional Support'],
                    buttonText: 'Explore Alternative Power'
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
                    partner: 'a1solarstore',
                    title: '200W Monocrystalline - Premium Performance',
                    description: 'High-efficiency monocrystalline panels with premium warranties from A1 SolarStore\'s curated selection.',
                    features: ['200W+ Output', '21%+ Efficiency', 'Monocrystalline Tech', 'Premium Warranties', 'Curated Selection'],
                    buttonText: 'Shop A1 Premium Panels'
                  },
                  {
                    partner: 'solardirect',
                    title: 'Flexible Solar Panels - Versatile Installation',
                    description: 'Professional-grade flexible solar panels perfect for curved RV roofs with Solar Direct\'s quality guarantee.',
                    features: ['Flexible Design', 'Professional Grade', 'Curved Roof Compatible', 'Quality Guarantee', '365-Day Support'],
                    buttonText: 'Get Solar Direct Panels'
                  },
                  {
                    partner: 'a1solarstore',
                    title: '100W Budget Solutions - Reliable Value',
                    description: 'Cost-effective solar panels with proven reliability and comprehensive support from A1 SolarStore.',
                    features: ['100W Output', 'Budget Friendly', 'Proven Reliability', 'Comprehensive Support', '180-Day Cookie'],
                    buttonText: 'Shop Budget Solar'
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
                    partner: 'a1solarstore',
                    title: 'Premium Battery Banks & Power Stations',
                    description: 'High-capacity lithium battery banks and portable power stations designed for serious off-grid RV living.',
                    features: ['Lithium Battery Banks', 'Portable Power Stations', 'High Capacity Storage', 'Off-Grid Ready', '180-Day Cookie'],
                    buttonText: 'Shop A1 Battery Systems'
                  },
                  {
                    partner: 'solardirect',
                    title: 'Complete Battery & Inverter Solutions',
                    description: 'Professional lithium batteries, charge controllers, and inverters with Solar Direct\'s industry-leading support.',
                    features: ['Lithium Batteries', 'Charge Controllers', 'Quality Inverters', 'Professional Support', '365-Day Cookie'],
                    buttonText: 'Get Complete Power Systems'
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
                  <ExternalLinkButton 
                    href="https://amsolar.com/installation"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg min-h-[48px] touch-manipulation"
                  >
                    Get Installation Quote
                  </ExternalLinkButton>
                  <AffiliatePartnerButton 
                    partner="rvlife" 
                    path="/installation-guide"
                    variant="outline" 
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/50 px-8 py-3 rounded-lg min-h-[48px] touch-manipulation"
                  >
                    DIY Installation Guide
                  </AffiliatePartnerButton>
                </div>
              </div>
            </CardContent>
          </Card>

          <OptimizedAffiliateGrid
            title="Professional Solar Installation & Support"
            subtitle="Get expert solar installation and monitoring systems for your RV power needs"
            partners={[
              {
                partner: 'a1solarstore',
                title: 'A1 Solar Installation & Support',
                description: 'Complete off-grid electrical systems with professional installation guidance and technical support from A1 SolarStore.',
                features: ['Complete Systems Design', 'Installation Guidance', 'Technical Support', '90% Confirmation Rate', '180-Day Cookie'],
                path: '/solar-installation',
                buttonText: 'Get A1 Solar Support'
              },
              {
                partner: 'solardirect',
                title: 'Solar Direct Professional Services',
                description: 'Expert solar system design and installation support with Solar Direct\'s comprehensive warranty coverage.',
                features: ['Professional Design', 'Installation Support', 'Comprehensive Warranties', 'Year-Round Support', '365-Day Cookie'],
                path: '/solar-maintenance',
                buttonText: 'Get Solar Direct Services'
              }
            ]}
            gridCols="2"
          />

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure />
        </Container>
      </div>
    </Layout>
  );
};

export default SolarPowerGuide;