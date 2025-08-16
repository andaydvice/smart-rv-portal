
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation, Shield, Battery, Tv, Droplet, Cog, Thermometer, Music } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import SEO from "@/components/seo/SEO";
import { organizationSchema, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/schemas";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const Features = () => {
  const features = [
    { name: "Navigation System", description: "Advanced GPS navigation specifically designed for RVs", icon: "Navigation" },
    { name: "Security System", description: "Comprehensive security with smart locks, cameras, and sensors", icon: "Shield" },
    { name: "Power Management", description: "Intelligent power distribution and optimization", icon: "Battery" },
    { name: "Smart TV System", description: "Premium entertainment with 4K display and voice control", icon: "Tv" },
    { name: "Water Systems", description: "Advanced water management with monitoring and filtration", icon: "Droplet" },
    { name: "Smart Automation", description: "Comprehensive home automation for climate and lighting", icon: "Cog" },
    { name: "Climate Control", description: "Advanced multi-zone climate with smart scheduling", icon: "Thermometer" },
    { name: "Entertainment", description: "Premium audio and outdoor media solutions", icon: "Music" }
  ];

  const featuresFAQ = [
    {
      question: "What smart features are available for RVs?",
      answer: "Smart RVs can include navigation systems, security features, power management, water systems, automation, climate control, entertainment, and smart TV systems."
    },
    {
      question: "How do smart RV features enhance safety?",
      answer: "Features like security systems with cameras and sensors, GPS navigation with RV-safe routes, and power management systems all contribute to safer RV travel."
    },
    {
      question: "Can smart features be added to existing RVs?",
      answer: "Yes, most smart features can be retrofitted to existing RVs through professional installation and system integration."
    }
  ];

  return (
    <Layout>
      <SEO
        title="Smart RV Features & Capabilities | Navigation, Security, Power & More"
        description="Explore comprehensive Smart RV features including GPS navigation, security systems, power management, water systems, climate control, and entertainment. Professional installation available."
        keywords="smart RV features, RV navigation system, RV security system, RV power management, smart water systems, RV automation, climate control, RV entertainment"
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/features` : ''}
        ogImage="/og-image.svg"
        ogImageAlt="Smart RV Features and System Capabilities"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: 'Features', url: typeof window !== 'undefined' ? `${window.location.origin}/features` : '' }
          ]),
          faqSchema(featuresFAQ),
          serviceSchema({
            name: "Smart RV Feature Installation",
            description: "Professional installation and integration of smart RV features and systems",
            provider: "Smart RV Technology Hub",
            serviceType: "Installation Services"
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Smart RV Features',
            itemListElement: features.map((feature, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: feature.name,
              description: feature.description
            }))
          }
        ]}
      />
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
            <div className="px-4">
              <AffiliateDisclosure compact className="max-w-7xl mx-auto my-8" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Features;
