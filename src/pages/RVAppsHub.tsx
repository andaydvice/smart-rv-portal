import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';

import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Wifi, MapPin, Battery, Settings, Shield } from 'lucide-react';

const RVAppsHub = () => {
  const appCategories = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Navigation & Travel",
      description: "GPS apps designed specifically for RV travel with height/weight restrictions",
      color: "text-blue-400"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Connectivity",
      description: "Stay connected on the road with internet and communication tools",
      color: "text-green-400"
    },
    {
      icon: <Battery className="h-6 w-6" />,
      title: "Power Management",
      description: "Monitor and optimize your RV's electrical systems",
      color: "text-yellow-400"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Maintenance",
      description: "Track maintenance schedules and system diagnostics",
      color: "text-purple-400"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety & Security",
      description: "Emergency services and security monitoring apps",
      color: "text-red-400"
    }
  ];

  const featuredApps = [
    {
      title: "RV LIFE Pro GPS Navigation",
      description: "The ultimate RV-safe GPS with custom routing for your specific RV dimensions.",
      price: "$49.99/year",
      originalPrice: "$69.99/year",
      rating: 4.8,
      reviewCount: 15420,
      image: "/lovable-uploads/245a19e1-8ec4-41fc-bedd-d6a440d9a381.png",
      features: [
        "RV-specific routing",
        "Campground database",
        "Offline maps",
        "Real-time traffic"
      ],
      affiliateLink: "https://rvlife.com/pro-gps",
      badges: ["Editor's Choice", "Most Popular"]
    },
    {
      title: "Campendium Camping App",
      description: "Discover amazing campsites with detailed reviews from fellow RVers.",
      price: "$19.99/year",
      originalPrice: "$29.99/year",
      rating: 4.7,
      reviewCount: 8932,
      image: "/lovable-uploads/3af8fc31-188d-477e-8ab5-b94bd8c4ec77.png",
      features: [
        "50,000+ campsite reviews",
        "Photo galleries",
        "Offline access",
        "Cell signal strength"
      ],
      affiliateLink: "https://campendium.com/premium",
      badges: ["Best Value", "Community Choice"]
    },
    {
      title: "Victron Connect",
      description: "Monitor and control your Victron energy products remotely.",
      price: "Free",
      rating: 4.6,
      reviewCount: 3421,
      image: "/lovable-uploads/83016e8b-ff85-42b1-910f-4f4781ac341b.png",
      features: [
        "Battery monitoring",
        "Solar system control",
        "Historical data",
        "Remote diagnostics"
      ],
      affiliateLink: "https://victronenergy.com/connect",
      badges: ["Free", "Professional Grade"]
    }
  ];


  return (
    <Layout>
      <Helmet>
        <title>Essential Smart RV Apps & Tools Hub</title>
        <meta name="description" content="Discover the best mobile apps and digital tools for Smart RV travel. GPS navigation, campsite finders, power monitoring, and connectivity solutions." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Smartphone className="h-12 w-12 text-[#5B9BD5]" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#5B9BD5] to-[#4B8FE3] bg-clip-text text-transparent">
                Essential Smart RV Apps & Tools
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your smartphone into the ultimate Smart RV command center with our curated collection of apps and digital tools designed specifically for the modern Smart RVer.
            </p>
          </div>

          {/* App Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {appCategories.map((category, index) => (
              <Card key={index} className="bg-[#091020] border-gray-700 hover:border-[#5B9BD5]/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`flex justify-center mb-4 ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Essential RV Apps */}
          <OptimizedAffiliateGrid
            title="⭐ Must-Have RV Apps"
            subtitle="Professional mobile apps and digital tools designed specifically for the modern RVer lifestyle."
            partners={[
              {
                partner: 'rvlife',
                title: 'RV Life Pro GPS & Trip Planning',
                description: 'Complete app suite with RV-safe GPS navigation, trip planning, and campground database.',
                features: ['RV-Safe Navigation', 'Trip Planning', 'Campground Reviews', 'Offline Maps'],
                buttonText: 'Get RV Life Pro'
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Travel & Savings Apps',
                description: 'Essential travel apps with fuel savings, campground discounts, and emergency support.',
                features: ['Fuel Savings', 'Campground Discounts', 'Emergency Support', 'Member Benefits'],
                buttonText: 'Download Travel Apps'
              },
              {
                partner: 'technorv',
                title: 'TechnoRV Smart Monitoring Apps',
                description: 'Monitor your RV systems remotely with smart technology and real-time alerts.',
                features: ['System Monitoring', 'Real-Time Alerts', 'Remote Control', 'Smart Diagnostics'],
                buttonText: 'Get Monitoring Apps'
              }
            ]}
            gridCols="3"
            className="mb-12"
          />

          {/* GPS Apps Comparison */}
          <OptimizedAffiliateGrid
            title="🗺️ Top RV GPS Apps Comparison"
            subtitle="Compare the most popular RV-specific GPS navigation apps to find the perfect one for your travel needs."
            partners={[
              {
                partner: 'rvlife',
                title: 'RV LIFE Pro GPS - Best Overall',
                description: 'Most comprehensive RV GPS with custom routing for your specific RV dimensions.',
                features: ['RV-Specific Routing', 'Offline Maps', '50,000+ Campgrounds', 'Real-Time Traffic', 'Weather Integration'],
                buttonText: 'Get RV LIFE Pro'
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Travel Guide - Best Value',
                description: 'Great value GPS app with strong community reviews and campground database.',
                features: ['30,000+ Campgrounds', 'Trip Planning', 'Community Reviews', 'Member Discounts'],
                buttonText: 'Get Travel Guide'
              },
              {
                partner: 'technorv',
                title: 'Smart RV Navigation Systems',
                description: 'Advanced navigation systems with smart RV integration and monitoring.',
                features: ['Smart Integration', 'System Monitoring', 'Advanced Navigation', 'Professional Support'],
                buttonText: 'Shop Navigation'
              }
            ]}
            gridCols="3"
            className="mb-12"
          />

          <OptimizedAffiliateGrid
            title="RV Apps, Hardware & Connectivity Solutions"
            subtitle="Complete mobile solutions for RV living, from essential apps to connectivity hardware and professional services."
            partners={[
              {
                partner: 'rvlife',
                title: 'RV Life Pro Apps Suite',
                description: 'Complete professional app suite with trip planning, navigation, and RV-specific tools for every journey.',
                features: ['RV-Safe Navigation', 'Trip Planning Tools', 'Campground Reviews', 'Offline Maps'],
                buttonText: 'Get RV Life Pro'
              },
              {
                partner: 'goodsam',
                title: 'Good Sam Travel & Emergency Apps',
                description: 'Essential travel apps with fuel savings, campground discounts, emergency support, and roadside assistance.',
                features: ['Fuel Savings App', 'Emergency Support', 'Roadside Assistance', 'Travel Planning'],
                buttonText: 'Download Travel Apps'
              },
              {
                partner: 'technorv',
                title: 'TechnoRV Connectivity Solutions',
                description: 'Hardware and software solutions for better connectivity, including signal boosters and monitoring apps.',
                features: ['Signal Boosters', 'Monitoring Apps', 'Connectivity Hardware', 'Smart Integration'],
                buttonText: 'Shop Connectivity'
              }
            ]}
            gridCols="3"
          />

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure compact />
        </Container>
      </div>
    </Layout>
  );
};

export default RVAppsHub;