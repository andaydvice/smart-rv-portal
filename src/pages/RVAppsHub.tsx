import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Smartphone, Wifi, Navigation, Settings, Battery, Shield } from 'lucide-react';
import { PageSummary } from '@/components/ui/PageSummary';

const RVAppsHub = () => {
  const appCategories = [
    {
      icon: Navigation,
      title: "Navigation & GPS",
      description: "RV safe routing and trip planning",
      apps: [
        "RV specific GPS navigation",
        "Trip planning tools", 
        "Campground databases",
        "Realtime traffic updates"
      ]
    },
    {
      icon: Wifi,
      title: "Connectivity",
      description: "Internet and communication tools",
      apps: [
        "Signal strength monitoring",
        "Hotspot management",
        "Data usage tracking",
        "Network optimization"
      ]
    },
    {
      icon: Settings,
      title: "RV Management",
      description: "Monitor and control your RV systems",
      apps: [
        "System monitoring",
        "Maintenance tracking",
        "Diagnostic tools",
        "Service reminders"
      ]
    },
    {
      icon: Battery,
      title: "Power & Solar",
      description: "Energy management applications",
      apps: [
        "Battery monitoring",
        "Solar panel tracking",
        "Power consumption analysis",
        "Generator management"
      ]
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Emergency and security applications",
      apps: [
        "Emergency services",
        "Weather alerts",
        "Security monitoring",
        "Location sharing"
      ]
    },
    {
      icon: Smartphone,
      title: "Lifestyle Apps",
      description: "Enhance your RV living experience",
      apps: [
        "Local discoveries",
        "Weather forecasting",
        "Entertainment options",
        "Social networking"
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Essential RV Apps Hub | Smart RV Portal</title>
        <meta name="description" content="Discover must-have mobile apps for RV living, from navigation and connectivity to system monitoring and lifestyle enhancement." />
        <meta name="keywords" content="RV apps, mobile apps for RVers, RV navigation apps, RV technology, camping apps" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/rv-apps-hub' : ''} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-20">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              Essential RV Apps Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the best mobile applications designed specifically for the modern RV lifestyle. 
              From navigation and connectivity to system monitoring and lifestyle enhancement.
            </p>
          </motion.div>

          {/* Guide Overview */}
          <div className="mb-12">
            <PageSummary
              question="What apps are essential for RV living?"
              answer="Comprehensive collection of mobile apps organized into 6 categories to enhance every aspect of RV life. From RV-specific GPS navigation and connectivity tools to system monitoring, power management, safety apps, and lifestyle enhancements."
              keyPoints={[
                "Navigation & GPS - RV-safe routing, trip planning, campground databases, and real-time traffic updates",
                "Connectivity Tools - Signal strength monitoring, hotspot management, data tracking, and network optimization",
                "RV System Management - Monitor tanks, batteries, diagnostics, maintenance tracking, and service reminders",
                "Power & Solar Apps - Battery monitoring, solar tracking, power consumption analysis, and generator control",
                "Safety & Security - Emergency services, weather alerts, security monitoring, and location sharing",
                "Lifestyle Apps - Local discoveries, weather forecasting, entertainment options, and RV social networks"
              ]}
              readingTime="8 min read"
            />
          </div>

          {/* App Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {appCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <category.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {category.apps.map((app, appIndex) => (
                    <li key={appIndex} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                      {app}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* App Selection Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              App Selection Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Essential Features to Look For</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Offline functionality for areas with poor connectivity
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    RV specific routing that considers height and weight restrictions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Regular updates and active developer support
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Integration with other RV systems and apps
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Optimization Tips</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Download maps and content before traveling to remote areas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Keep apps updated for the latest features and bug fixes
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Test critical apps before departing on long trips
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Have backup solutions for essential functions
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};

export default RVAppsHub;