import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { 
  Sun, Battery, Zap, Calculator, 
  TrendingUp, Leaf, DollarSign 
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

          {/* Solar Equipment Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-yellow-400">Solar Systems & Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Complete solar panels, battery banks, power stations, and off-grid electrical systems for RV installations.
                </p>
                <ExternalLinkButton 
                  href="https://a1solarstore.com"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Shop A1 Solar Systems
                </ExternalLinkButton>
              </CardContent>
            </Card>

            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-yellow-400">Solar Power Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Solar panels, lithium batteries, charge controllers, and complete power system components with industry warranties.
                </p>
                <ExternalLinkButton 
                  href="https://solardirect.com"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Get Solar Direct
                </ExternalLinkButton>
              </CardContent>
            </Card>
          </div>

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
                  <ExternalLinkButton 
                    href="https://rvlife.com"
                    variant="outline" 
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/50 px-8 py-3 rounded-lg min-h-[48px] touch-manipulation"
                  >
                    DIY Installation Guide
                  </ExternalLinkButton>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure />
        </Container>
      </div>
    </Layout>
  );
};

export default SolarPowerGuide;