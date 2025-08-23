import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, AlertTriangle, Phone, MapPin, Zap, 
  Wrench, Heart, Wind, Flame, Droplets 
} from 'lucide-react';
import { AffiliatePartnerButton } from '@/components/affiliate/AffiliatePartnerSystem';
import { ExternalLinkButton } from '@/components/ui/external-link-button';

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

  // Removed hardcoded emergency services data - now using proper affiliate system

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
        <title>Smart RV Emergency Preparedness Center</title>
        <meta name="description" content="Complete Smart RV emergency preparedness guide. Roadside assistance, emergency equipment, safety services, and emergency response resources for Smart RV travelers." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/emergency-center' : ''} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Container className="py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-red-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Smart RV Emergency Center
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay safe on the road with comprehensive emergency preparedness resources, professional services, and essential safety equipment for every Smart RV adventure.
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

          {/* Emergency Services and Equipment */}
          <OptimizedAffiliateGrid
            title="🚗 Essential Emergency Services & Equipment"
            subtitle="Professional emergency services, essential safety equipment, and emergency preparedness tools for complete RV safety."
            partners={[
              {
                partner: 'goodsam',
                title: 'Good Sam Emergency Roadside Service',
                description: 'Comprehensive 24/7 roadside assistance specifically designed for RVs with unlimited distance towing.',
                features: ['24/7 Emergency Response', 'Unlimited Towing', 'Lockout Service', 'Emergency Fuel Delivery'],
                buttonText: 'Get Emergency Coverage'
              },
              {
                partner: 'rvlife',
                title: 'RV Life Emergency Monitoring',
                description: 'Advanced monitoring systems that detect and alert you to potential emergencies before they happen.',
                features: ['Emergency Detection', 'Real-Time Alerts', 'Preventive Monitoring', 'Remote Diagnostics'],
                buttonText: 'Shop Safety Systems'
              },
              {
                partner: 'rvwaterfilter',
                title: 'Emergency Water & Safety Systems',
                description: 'Essential emergency water filtration and safety equipment for off-grid adventures and emergency situations.',
                features: ['Emergency Filtration', 'Water Purification', 'Safety Equipment', 'Off-Grid Ready'],
                buttonText: 'Shop Emergency Equipment'
              }
            ]}
            gridCols="3"
            className="mb-12"
          />

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
                  <ExternalLinkButton 
                    href="https://progressive.com/rv-insurance/"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg min-h-[48px] touch-manipulation"
                  >
                    Get RV Insurance Quote
                  </ExternalLinkButton>
                  <AffiliatePartnerButton 
                    partner="goodsam" 
                    path="/emergency-assistance"
                    variant="outline" 
                    className="border-purple-500 text-purple-300 hover:bg-purple-900/50 px-8 py-3 rounded-lg min-h-[48px] touch-manipulation"
                  >
                    Emergency Coverage
                  </AffiliatePartnerButton>
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
                partner: 'rvlife',
                title: 'RV Life Emergency Monitoring',
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
          <AffiliateDisclosure compact />
        </Container>
      </div>
    </Layout>
  );
};

export default RVEmergencyCenter;