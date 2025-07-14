import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AffiliateProductCard from '@/components/affiliate/AffiliateProductCard';
import AffiliateCTABanner from '@/components/affiliate/AffiliateCTABanner';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, AlertTriangle, Phone, MapPin, Zap, 
  Wrench, Heart, Wind, Flame, Droplets 
} from 'lucide-react';

const RVEmergencyCenter = () => {
  const emergencyCategories = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Emergency Services",
      description: "24/7 roadside assistance and emergency response",
      color: "text-red-400",
      urgency: "Critical"
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Breakdown Recovery",
      description: "Professional RV towing and mobile repair services",
      color: "text-orange-400",
      urgency: "High"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Medical Emergency",
      description: "Healthcare access and emergency medical services",
      color: "text-pink-400",
      urgency: "Critical"
    },
    {
      icon: <Wind className="h-6 w-6" />,
      title: "Weather Emergency",
      description: "Severe weather alerts and shelter information",
      color: "text-blue-400",
      urgency: "High"
    }
  ];

  const emergencyServices = [
    {
      title: "Good Sam Emergency Road Service",
      description: "Comprehensive 24/7 roadside assistance specifically designed for RVs with unlimited distance towing.",
      price: "$89/year",
      originalPrice: "$129/year",
      rating: 4.7,
      reviewCount: 12450,
      image: "/lovable-uploads/cf3a586f-ae68-4a54-953f-b83505056d0e.png",
      features: [
        "Unlimited distance towing",
        "24/7 emergency assistance",
        "Lockout service",
        "Emergency fuel delivery",
        "Tire changes",
        "Jump starts"
      ],
      affiliateLink: "https://goodsam.com/roadside-assistance",
      badges: ["Most Popular", "RV Specific"]
    },
    {
      title: "FMCA Emergency Road Service",
      description: "Premium roadside assistance with specialized RV coverage and member benefits.",
      price: "$149/year",
      originalPrice: "$199/year",
      rating: 4.8,
      reviewCount: 8930,
      image: "/lovable-uploads/b6a46bec-1ca8-4f7b-89fa-37bb5415d9fa.png",
      features: [
        "RV specialist technicians",
        "Concierge services",
        "Trip interruption coverage",
        "Pet-friendly towing",
        "Rental reimbursement"
      ],
      affiliateLink: "https://fmca.com/emergency-road-service",
      badges: ["Premium Service"]
    },
    {
      title: "Coach-Net RV Roadside Assistance",
      description: "Specialized RV emergency services with comprehensive coverage for all RV types.",
      price: "$119/year",
      originalPrice: "$159/year",
      rating: 4.6,
      reviewCount: 6721,
      image: "/lovable-uploads/28815e7c-77df-4758-b609-d84355448eea.png",
      features: [
        "RV-trained technicians",
        "Emergency locksmith",
        "Fluid delivery",
        "Mobile RV repair",
        "Alternate transportation"
      ],
      affiliateLink: "https://coach-net.com/roadside",
      badges: ["RV Specialists"]
    }
  ];

  const emergencyEquipment = [
    {
      title: "First Aid Only RV First Aid Kit",
      description: "Comprehensive 298-piece first aid kit designed specifically for RV travelers.",
      price: "$49.99",
      originalPrice: "$69.99",
      rating: 4.8,
      reviewCount: 3421,
      image: "/lovable-uploads/9e2c5b7f-c03c-4d99-9997-0d3de18f61e1.png",
      features: [
        "298 medical supplies",
        "Compact RV storage",
        "Emergency instructions",
        "OSHA compliant"
      ],
      affiliateLink: "https://amazon.com/rv-first-aid-kit",
      badges: ["Essential", "OSHA Approved"]
    },
    {
      title: "Kidde RV Fire Extinguisher",
      description: "Multi-purpose dry chemical fire extinguisher rated for RV use with mounting bracket.",
      price: "$39.99",
      originalPrice: "$54.99",
      rating: 4.9,
      reviewCount: 2156,
      image: "/lovable-uploads/795a8cdd-cf65-487f-b550-4e4458d0aa9e.png",
      features: [
        "UL listed",
        "Easy mount bracket",
        "Pressure gauge",
        "6-year warranty"
      ],
      affiliateLink: "https://amazon.com/kidde-rv-fire-extinguisher",
      badges: ["Life Saver", "UL Listed"]
    }
  ];

  const emergencyApps = [
    {
      title: "Red Cross Emergency App",
      description: "Essential emergency information, alerts, and first aid guidance at your fingertips.",
      price: "Free",
      rating: 4.5,
      reviewCount: 89234,
      image: "/lovable-uploads/7d42772e-e96c-45cd-9a40-5e59be1c0a60.png",
      features: [
        "Real-time alerts",
        "First aid instructions",
        "Emergency checklist",
        "Offline access"
      ],
      affiliateLink: "https://redcross.org/mobile-apps/emergency-app",
      badges: ["Free", "Red Cross Official"]
    }
  ];

  const quickActionCards = [
    {
      title: "🚨 Emergency Contacts",
      items: [
        "911 - Life-threatening emergencies",
        "Good Sam: 1-877-475-4968",
        "Coach-Net: 1-800-264-2387",
        "FMCA: 1-800-543-3622"
      ],
      color: "border-red-500 bg-red-900/20"
    },
    {
      title: "🔧 Quick Fixes",
      items: [
        "Check circuit breakers first",
        "Verify propane tank levels",
        "Check water pump switch",
        "Reset GFI outlets"
      ],
      color: "border-yellow-500 bg-yellow-900/20"
    },
    {
      title: "📱 Emergency Apps",
      items: [
        "Download Red Cross Emergency",
        "Install weather radar app",
        "Have offline maps ready",
        "Keep phone charged"
      ],
      color: "border-blue-500 bg-blue-900/20"
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>RV Emergency Preparedness Center - Safety & Emergency Services</title>
        <meta name="description" content="Complete RV emergency preparedness guide. Roadside assistance, emergency equipment, safety services, and emergency response resources for RV travelers." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-red-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                RV Emergency Center
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay safe on the road with comprehensive emergency preparedness resources, professional services, and essential safety equipment for every RV adventure.
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickActionCards.map((card, index) => (
              <Card key={index} className={`${card.color} border-2`}>
                <CardHeader>
                  <CardTitle className="text-lg text-white">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {card.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {emergencyCategories.map((category, index) => (
              <Card key={index} className="bg-[#091020] border-gray-700 hover:border-red-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`flex justify-center mb-4 ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    category.urgency === 'Critical' ? 'bg-red-900 text-red-300' : 'bg-orange-900 text-orange-300'
                  }`}>
                    {category.urgency} Priority
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Services */}
          <Card className="bg-[#0a0a0a] border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-red-400 text-center">🚗 Professional Emergency Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {emergencyServices.map((service, index) => (
                  <AffiliateProductCard
                    key={index}
                    {...service}
                    className="h-full"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Equipment */}
          <Card className="bg-[#091020] border-gray-700 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-400">🛡️ Essential Emergency Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {emergencyEquipment.map((equipment, index) => (
                  <AffiliateProductCard
                    key={index}
                    {...equipment}
                    className="h-full"
                  />
                ))}
              </div>
              
              {/* Emergency Apps */}
              <div className="border-t border-gray-700 pt-8">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">📱 Essential Emergency Apps</h3>
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    {emergencyApps.map((app, index) => (
                      <AffiliateProductCard
                        key={index}
                        {...app}
                        className="h-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Insurance CTA */}
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800 mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">🛡️ Protect Your RV Investment</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Don't let an emergency derail your RV dreams. Comprehensive RV insurance and emergency coverage 
                  provides peace of mind for every adventure.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg min-h-[48px] touch-manipulation">
                    <a href="https://progressive.com/rv-insurance/" target="_blank" rel="noopener noreferrer">
                      Get RV Insurance Quote
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/50 px-8 py-3 rounded-lg min-h-[48px] touch-manipulation">
                    <a href="https://goodsam.com/emergency-assistance" target="_blank" rel="noopener noreferrer">
                      Emergency Coverage
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <OptimizedAffiliateGrid
            title="Emergency Services & Support"
            subtitle="Be prepared with professional emergency services and safety equipment for your RV adventures"
            partners={[
              {
                partner: 'goodsam',
                title: 'Good Sam Emergency Roadside',
                description: 'America\'s most trusted RV emergency service with 24/7 roadside assistance and technical support',
                features: ['24/7 Emergency Response', 'Nationwide Coverage', 'RV-Specific Services', 'Towing & Recovery'],
                path: '/emergency-roadside',
                buttonText: 'Get Emergency Coverage'
              },
              {
                partner: 'technorv',
                title: 'TechnoRV Emergency Monitoring',
                description: 'Advanced monitoring systems that alert you to potential emergencies before they happen',
                features: ['Real-Time Alerts', 'Emergency Detection', 'Preventive Monitoring', 'Remote Diagnostics'],
                path: '/emergency-monitoring',
                buttonText: 'Shop Monitoring Systems'
              },
              {
                partner: 'rvwaterfilter',
                title: 'Emergency Water Filtration',
                description: 'Essential water filtration systems for emergency situations and off-grid adventures',
                features: ['Emergency Filtration', 'Portable Systems', 'Water Purification', 'Off-Grid Ready'],
                path: '/emergency-water',
                buttonText: 'Shop Emergency Filters'
              }
            ]}
            gridCols="3"
          />

          {/* Affiliate Disclosure */}
          <AffiliateDisclosure />
        </Container>
      </div>
    </Layout>
  );
};

export default RVEmergencyCenter;