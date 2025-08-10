
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Navigation, Shield, Battery, Tv, Droplet, Cog, Thermometer, Music } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from "react-helmet-async";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const Features = () => {
  return (
    <Layout>
      <Helmet>
        <title>Smart RV Features | Systems And Capabilities</title>
        <meta name="description" content="Explore Smart RV features including navigation, security, power management, water systems, and automation with trusted partners." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/features' : ''} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <h1 className="text-4xl font-bold text-white mb-8">Smart RV Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/features/navigation-system" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                <Navigation className="h-8 w-8 text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">Navigation System</h2>
                <p className="text-gray-300">Advanced GPS navigation specifically designed for RVs, with route planning that considers vehicle height, weight, and road restrictions.</p>
              </div>
            </Link>

            <Link to="/features/security-system" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors">
                <Shield className="h-8 w-8 text-emerald-500 mb-4" />
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Security System</h2>
                <p className="text-gray-300">Comprehensive security features including smart locks, cameras, and motion sensors to keep your RV safe wherever you go.</p>
              </div>
            </Link>

            <Link to="/features/power-management" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
                <Battery className="h-8 w-8 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Power Management</h2>
                <p className="text-gray-300">Intelligent power distribution system that monitors and optimizes energy usage across all RV systems.</p>
              </div>
            </Link>
            
            <Link to="/features/smart-tv" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
                <Tv className="h-8 w-8 text-purple-500 mb-4" />
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">Smart TV System</h2>
                <p className="text-gray-300">Premium entertainment system with 4K display, streaming integration, and voice control for the ultimate viewing experience in your RV.</p>
              </div>
            </Link>

            <Link to="/features/water-systems" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                <Droplet className="h-8 w-8 text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">Water Systems</h2>
                <p className="text-gray-300">Advanced water management with real time monitoring, filtration, and conservation features for both fresh and waste water systems.</p>
              </div>
            </Link>

            <Link to="/features/smart-automation" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-teal-500 transition-colors">
                <Cog className="h-8 w-8 text-teal-500 mb-4" />
                <h2 className="text-2xl font-semibold text-teal-400 mb-4">Smart Automation</h2>
                <p className="text-gray-300">Comprehensive home automation system for your RV with climate control, lighting, and energy management integration.</p>
              </div>
            </Link>
            
            <Link to="/features/climate-control" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                <Thermometer className="h-8 w-8 text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">Climate Control</h2>
                <p className="text-gray-300">Advanced multi zone climate system with smart scheduling, humidity management, and air quality monitoring for ultimate comfort.</p>
              </div>
            </Link>
            
            <Link to="/features/entertainment" className="block">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-colors">
                <Music className="h-8 w-8 text-pink-500 mb-4" />
                <h2 className="text-2xl font-semibold text-pink-400 mb-4">Entertainment</h2>
                <p className="text-gray-300">Comprehensive entertainment solution with premium audio, smart TV integration, and outdoor media options for the ultimate RV experience.</p>
              </div>
            </Link>
          </div>
          
          {/* Feature upgrade recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <OptimizedAffiliateGrid
              title="Upgrade Your RV with Smart Features"
              subtitle="Transform your RV into a smart home on wheels with these proven technologies from our trusted partners."
              partners={[
                {
                  partner: 'technorv',
                  title: 'Smart RV Technology Systems',
                  description: 'Complete smart technology solutions for RV automation, monitoring, and control systems.',
                  features: ['Smart Power Management', 'Security Systems', 'Automation Controls', 'Remote Monitoring'],
                  buttonText: 'Shop Smart Tech'
                },
                {
                  partner: 'rvwaterfilter',
                  title: 'Advanced Water System Features',
                  description: 'Premium water filtration and monitoring systems for safe, clean water in your smart RV.',
                  features: ['Smart Water Monitoring', 'Multi-Stage Filtration', 'NSF Certified', 'Easy Installation'],
                  buttonText: 'Shop Water Systems'
                },
                {
                  partner: 'goodsam',
                  title: 'Professional Feature Installation',
                  description: 'Expert installation and support services for all your RV feature upgrades and smart systems.',
                  features: ['Professional Installation', 'Expert Support', 'Warranty Coverage', 'System Integration'],
                  buttonText: 'Get Installation Service'
                }
              ]}
              gridCols="3"
            />
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Features;
