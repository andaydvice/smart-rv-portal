import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Battery, Sun, Zap, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from 'react-helmet-async';

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Battery className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-white">Power Management</h1>
          </div>

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
          
          {/* Affiliate Recommendations */}
          <div className="mt-12">
            <OptimizedAffiliateGrid
              title="Professional Power System Installation"
              subtitle="Get expert installation and monitoring for your RV power management system"
              partners={[
                {
                  partner: 'technorv',
                  title: 'TechnoRV Power Management Systems',
                  description: 'Advanced power management systems with smart monitoring and automated energy optimization',
                  features: ['Smart Power Distribution', 'Energy Monitoring', 'Automated Management', 'Professional Installation'],
                  path: '/power-systems',
                  buttonText: 'Shop Power Systems'
                },
                {
                  partner: 'goodsam',
                  title: 'Good Sam Electrical Support',
                  description: 'Expert electrical system support and maintenance for RV power management',
                  features: ['Electrical Diagnostics', 'System Maintenance', 'Emergency Repairs', 'Technical Support'],
                  path: '/electrical-support',
                  buttonText: 'Get Electrical Support'
                }
              ]}
              gridCols="2"
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default PowerManagement;
