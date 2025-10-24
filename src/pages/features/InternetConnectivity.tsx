
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Wifi, Globe, Shield, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { articleSchema } from "@/components/seo/schemas";
import ConnectivityGuide from "@/components/connectivity/ConnectivityGuide";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { LazyImage } from '@/components/ui/LazyImage';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

const InternetConnectivity = () => {
  // Article schema for SEO and AI model citations
  const schemaData = articleSchema({
    title: 'RV Internet Connectivity Solutions - 50+ Verified Statistics',
    description: 'Comprehensive guide with 50+ verified statistics on Starlink performance (50-100 Mbps, 99% uptime, 87% satisfaction, 25-60ms latency), WiFi boosters (32x signal improvement), mobile hotspots, data requirements (300GB+ minimum), and connectivity solutions for remote work. Includes network performance data and user satisfaction metrics.',
    author: 'Smart RV Portal',
    publishedTime: '2024-01-01',
    url: typeof window !== 'undefined' ? window.location.href : '',
    category: 'RV Connectivity',
    image: '/lovable-uploads/15afbf27-62c7-496b-8042-b625eb5543e5.png'
  });

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Internet Connectivity Solutions | Stay Connected Anywhere</title>
        <meta name="description" content="Stay connected anywhere with smart RV internet solutions. Starlink delivers 50-100 Mbps with 99% uptime. Compare mobile hotspots, WiFi boosters, and satellite options." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Wifi className="h-8 w-8 text-cyan-500" />
            <h1 className="text-4xl font-bold text-white">Internet Connectivity</h1>
          </div>

          {/* Internet Connectivity Statistics Section */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-cyan-500/30 mb-12">
            <h2 className="text-3xl font-semibold text-cyan-400 mb-6 text-center">RV Internet: Speed, Reliability & Market Data</h2>
            <p className="text-gray-300 text-lg mb-6 text-left">
              With 11.2 million households owning RVs and a 62% surge in ownership over 20 years, reliable internet connectivity is essential. Mobile hotspots remain the most popular and affordable option for RVers, with many carrying two different carriers (Verizon & AT&T) for redundancy (Source: Best Cable TV, Prked, SwiftNet 2024-2025).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-cyan-400 mb-2">50-100</div>
                <p className="text-gray-300">Mbps average download (Starlink RV)</p>
                <p className="text-gray-500 text-sm mt-2">(Camping Forge 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-cyan-400 mb-2">99%</div>
                <p className="text-gray-300">Starlink uptime with speeds rivaling cable</p>
                <p className="text-gray-500 text-sm mt-2">(Reviews.org 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-cyan-400 mb-2">32x</div>
                <p className="text-gray-300">Signal strength improvement with WiFi boosters</p>
                <p className="text-gray-500 text-sm mt-2">(TravlFi 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg text-center border border-gray-700">
                <div className="text-4xl font-bold text-cyan-400 mb-2">300GB+</div>
                <p className="text-gray-300">Minimum data plan for comfortable RV travel</p>
                <p className="text-gray-500 text-sm mt-2">(Mobile Internet RC 2024)</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Starlink Performance Data</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong>Download speeds:</strong> 25-220 Mbps range (RV avg: 50-100 Mbps)</li>
                  <li><strong>Upload speeds:</strong> 3-20 Mbps (typically {'<'}5 Mbps)</li>
                  <li><strong>Latency:</strong> 25-60 ms (vs. 600+ ms traditional satellite)</li>
                  <li><strong>User satisfaction:</strong> 87% said extremely/very effective (2024)</li>
                  <li><strong>Network size:</strong> 7,000+ satellites, 4.6M+ users worldwide</li>
                </ul>
                <p className="text-gray-500 text-xs mt-4">(Circle ID, EcoFlow, Starlink Installation Pros 2024)</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Mobile Hotspot & WiFi Booster Data</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong>Cell boosters:</strong> Up to 65 dB gain for RVs (100 dB max)</li>
                  <li><strong>WiFi boosters:</strong> Up to 32x signal strength improvement</li>
                  <li><strong>Range extension:</strong> Up to 2,500 feet (technical max)</li>
                  <li><strong>Real-world test:</strong> 167 Mbps down, 29 Mbps up at 2,000 ft</li>
                  <li><strong>Campground WiFi:</strong> "Hit-or-miss at best" - overcrowded networks</li>
                </ul>
                <p className="text-gray-500 text-xs mt-4">(TravlFi, TheRVgeeks, Home Owner guide 2024-2025)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Always Connected</h2>
              <p className="text-gray-300 mb-6">
                Mobile hotspots are the most popular and flexible option for RVers, described as "the most affordable and effective method to gain Internet access while traveling." Remote workers should maintain minimum 2 internet sources (cellular + WiFi/Starlink) with 300GB+ data plans for comfortable travel, or 1,000GB+ for high-consumption users (Source: Prked, SwiftNet, Mobile Internet Resource Center 2024-2025).
              </p>
              <LazyImage
                {...getOptimizedImageProps({
                  src: "/lovable-uploads/15afbf27-62c7-496b-8042-b625eb5543e5.png",
                  alt: "Mobile Internet Connectivity",
                  type: "feature"
                })}
                className="w-full h-64 object-cover rounded-lg mb-6"
                priority={false}
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>High speed 5G connectivity</li>
                <li>Dual band WiFi system</li>
                <li>Signal booster integration</li>
                <li>Multiple device support</li>
                <li>Secure network encryption</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Globe className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
                <p className="text-gray-300">
                  Seamless connectivity across borders with automatic carrier switching and 
                  satellite backup options.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Shield className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Enhanced Security</h3>
                <p className="text-gray-300">
                  Enterprise grade encryption and security protocols keep your data safe 
                  while on the move.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Zap className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Optimization</h3>
                <p className="text-gray-300">
                  Intelligent bandwidth management and automatic network optimization for 
                  the best possible connection.
                </p>
              </div>
            </div>
          </div>

          <ConnectivityGuide />
          
          <OptimizedAffiliateGrid
            title="Connectivity Solutions"
            subtitle="Get reliable internet access wherever your adventures take you"
            partners={[
              {
                name: 'WeBoost',
                url: 'https://weboost.com',
                title: 'WeBoost Signal Enhancement',
                description: 'Professional cellular signal boosters to maximize your internet connectivity.',
                features: ['Signal strength amplification', 'Multi-carrier support', 'Easy installation', 'Proven results']
              },
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Trip Wizard',
                description: 'Plan routes with connectivity hotspots and campground internet reviews.',
                features: ['WiFi-enabled campground search', 'Connectivity planning tools', 'User internet reviews']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />
          
          <AffiliateDisclosure className="mt-8" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default InternetConnectivity;
