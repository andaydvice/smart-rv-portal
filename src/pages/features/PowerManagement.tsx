import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Battery, Sun, Zap, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from 'react-helmet-async';
import { FeatureNavigationLinks } from "@/components/navigation/FeatureNavigationLinks";

const PowerManagement = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/features/power-management` : 'https://example.com/features/power-management';
  const title = 'Power management for smart RVs | Optimize energy';
  const description = 'Smart RV power management with solar integration, battery analytics, and smart distribution to optimize energy and extend off grid time.';
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preload" as="image" href="/lovable-uploads/power-management-header.jpg" fetchPriority="high" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Power Management',
          description,
          url: canonicalUrl
        })}</script>
      </Helmet>
      {/* Hero Image Section */}
      <div className="relative w-full h-[600px] md:h-[80vh] max-h-[800px] overflow-hidden">
        <img
          src="/lovable-uploads/power-management-header.jpg?v=3"
          alt="Modern RV interior with advanced power management dashboard showing battery levels, solar input, and electrical distribution controls"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          onLoad={() => console.log('NEW Power management header image loaded successfully')}
          onError={(e) => console.error('NEW Power management header image failed to load:', e)}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Battery className="h-12 w-12 text-yellow-500" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">Power Management</h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Intelligent energy optimization with solar integration, smart distribution, and real-time analytics for extended off-grid adventures
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto pt-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Smart Power Features</h2>
              <div className="space-y-4 text-gray-300 mb-6 text-left">
                <p>
                  Our intelligent power management system optimizes energy usage.
                </p>
                <p>
                  It ensures efficient power distribution throughout your RV.
                </p>
                <p>
                  With solar integration and smart monitoring, you will always have the power you need.
                </p>
                <p>
                  This advanced system helps conserve energy.
                </p>
                <p>
                  It also prolongs battery life for extended off grid adventures.
                </p>
              </div>
              <img 
                src="/lovable-uploads/078abbd1-5852-4d5a-a457-154a7421c673.png"
                alt="Smart RV power management system interface with solar and battery monitoring"
                className="w-full h-64 object-cover rounded-lg mb-6"
                loading="lazy"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300 text-left">
                <li>Solar panel integration and monitoring optimizes energy capture.</li>
                <li>Battery level tracking and alerts keep you informed.</li>
                <li>Automated power source switching ensures seamless transitions.</li>
                <li>Energy consumption analytics provide valuable insights.</li>
                <li>Smart appliance power management reduces waste.</li>
                <li>Generator auto start and stop capabilities offer convenience.</li>
                <li>Load shedding prioritizes critical systems during high demand.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Sun className="h-6 w-6 text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Solar Integration</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Maximize your sustainable energy potential with our advanced solar integration.
                  </p>
                  <p>
                    Our system provides efficient solar power collection.
                  </p>
                  <p>
                    It also manages energy storage with real time monitoring capabilities.
                  </p>
                  <p>
                    Track your solar input and battery charge levels effortlessly.
                  </p>
                  <p>
                    This ensures you make the most of available sunlight.
                  </p>
                  <p>
                    Optimize panel performance through smart tracking and tilt adjustments where available.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Zap className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Distribution</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Benefit from intelligent power routing that prioritizes essential systems.
                  </p>
                  <p>
                    Our smart distribution ensures critical appliances always have power.
                  </p>
                  <p>
                    It automatically manages loads to prevent overloads.
                  </p>
                  <p>
                    You can customize power allocation based on your specific needs.
                  </p>
                  <p>
                    This feature enhances safety and reliability of your RVs electrical system.
                  </p>
                  <p>
                    Receive notifications for unusual power draws or potential issues.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Activity className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Usage Analytics</h3>
                <div className="text-gray-300 space-y-2 text-left">
                  <p>
                    Gain detailed insights into your power consumption patterns.
                  </p>
                  <p>
                    Our usage analytics offer comprehensive tracking.
                  </p>
                  <p>
                    It also provides actionable optimization recommendations.
                  </p>
                  <p>
                    Understand which appliances consume the most energy.
                  </p>
                  <p>
                    Identify opportunities to reduce power usage.
                  </p>
                  <p>
                    Optimize your energy habits for longer off grid stays and lower utility costs.
                  </p>
                  <p>
                    Access historical data to see trends and improvements over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Professional Installation Image */}
          <div className="mt-12 mb-8">
            <img 
              src="/lovable-uploads/professional-power-installation.jpg?v=1"
              alt="Professional technician installing RV power management system with solar panels and battery monitoring equipment"
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              loading="lazy"
              onLoad={() => console.log('Professional installation image loaded successfully')}
              onError={(e) => console.error('Professional installation image failed to load:', e)}
            />
          </div>

          {/* Affiliate Recommendations */}
          <div className="mt-8">
            <OptimizedAffiliateGrid
              title="Professional Power System Installation"
              subtitle="Get expert installation and monitoring for your RV power management system"
              partners={[
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Life Pro GPS Navigation',
                  description: 'Essential RV trip planning and GPS navigation app with power management route optimization',
                  features: ['RV-Safe Routes', 'Campground Info', 'Trip Planning', 'Power Management Tips'],
                  buttonText: 'Get RV Life Pro'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Good Sam Electrical Support',
                  description: 'Expert electrical system support and maintenance for RV power management',
                  features: ['Electrical Diagnostics', 'System Maintenance', 'Emergency Repairs', 'Technical Support'],
                  buttonText: 'Get Electrical Support'
                }
              ]}
              gridCols="2"
            />

            <AffiliateDisclosure className="mt-8" />
          </div>

          {/* Feature Navigation Links */}
          <FeatureNavigationLinks
            className="mt-12 mb-8"
            relatedFeatures={[
              {
                title: "Smart Automation",
                path: "/features/smart-automation",
                description: "Automate your RV's energy management for optimal efficiency"
              },
              {
                title: "Climate Control",
                path: "/features/climate-control",
                description: "Smart temperature management optimized for power consumption"
              },
              {
                title: "Water Systems",
                path: "/features/water-systems",
                description: "Efficient water heating and pumping with power monitoring"
              },
              {
                title: "Solar Power Guide",
                path: "/solar-power-guide",
                description: "Complete guide to solar power systems for your RV"
              }
            ]}
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default PowerManagement;
