
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tv, Cast, Smartphone, Gamepad } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { FeatureNavigationLinks } from "@/components/navigation/FeatureNavigationLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const SmartTV = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/features/smart-tv` : '';
  return (
    <Layout>
      <Helmet>
        <title>Smart TV for RVs | Streaming Entertainment</title>
        <meta name="description" content="Advanced smart TV system for RVs with 4K streaming, voice control, multi room casting, and seamless integration with your favorite entertainment services." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'Smart RV Television System',
          description: 'Integrated smart TV solution for RVs with streaming capabilities, voice control, casting features, and access to all major entertainment platforms.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'Smart RV Entertainment',
          offers: {
            url: typeof window !== 'undefined' ? `${window.location.origin}/pricing` : '',
            availability: 'InStock'
          }
        }))}</script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="w-full px-4 pt-24 pb-12">
          <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: 'Features', href: '/features' }, { label: 'Smart TV' }]} />

            <div className="flex items-center gap-4 mb-8">
              <Tv className="h-8 w-8 text-purple-500" />
              <h1 className="text-4xl font-bold text-white">Smart TV System</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">Entertainment Hub</h2>
                <div className="space-y-4 text-gray-300 mb-6">
                  <p>
                    Experience cinema quality entertainment in your RV with our advanced Smart TV system.
                  </p>
                  <p>
                    Featuring a 4K OLED display with HDR support, our system delivers stunning visuals 
                    and immersive entertainment wherever your journey takes you.
                  </p>
                </div>
                <img 
                  src="/lovable-uploads/831c3ac9-7ade-4fe3-a460-affbfc4123f7.png" 
                  alt="Luxury RV Smart TV Setup" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <ul className="list-disc list-inside space-y-3 text-gray-300">
                  <li>4K Ultra HD Display with HDR Support</li>
                  <li>Smart Voice Control Integration</li>
                  <li>Multiroom Viewing Support</li>
                  <li>Mobile Device Casting</li>
                  <li>Gaming Mode with Low Latency</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <Cast className="h-6 w-6 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Seamless Streaming</h3>
                  <p className="text-gray-300">
                    Access all your favorite streaming services with built in apps and 
                    lightning fast connectivity.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <Smartphone className="h-6 w-6 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Control</h3>
                  <p className="text-gray-300">
                    Control your TV from anywhere in your RV using our mobile app or voice commands.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <Gamepad className="h-6 w-6 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Gaming Ready</h3>
                  <p className="text-gray-300">
                    Enhanced gaming mode with reduced input lag and adaptive refresh rate technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Affiliate Recommendations */}
          <div className="mt-12">
            <OptimizedAffiliateGrid
              title="Complete Your Entertainment Setup"
              subtitle="Enhance your Smart TV experience with these recommended RV accessories and services"
              partners={[
                {
                  name: 'Mobile Home Parts Store',
                  url: 'https://mobilehomeparts.com',
                  title: 'RV Entertainment Systems',
                  description: 'Professional entertainment system components and accessories for smart RV integration',
                  features: ['Quality Components', 'Smart Integration', 'System Compatibility', 'Technical Support'],
                  buttonText: 'Shop Entertainment Systems'
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Life Streaming Guide',
                  description: 'Complete guide to streaming and entertainment apps optimized for RV travel',
                  features: ['Streaming Setup Guide', 'Data Management Tips', 'App Recommendations', 'Troubleshooting'],
                  buttonText: 'Get Streaming Guide'
                }
              ]}
              gridCols="2"
            />

            <AffiliateDisclosure className="mt-8" />

            {/* Feature Navigation Links */}
            <FeatureNavigationLinks
              className="mt-12 mb-8"
              relatedFeatures={[
                {
                  title: "Entertainment",
                  path: "/features/entertainment",
                  description: "Complete entertainment hub with gaming and streaming"
                },
                {
                  title: "Audio System",
                  path: "/features/audio-system",
                  description: "Premium audio integration for your viewing experience"
                },
                {
                  title: "Internet Connectivity",
                  path: "/features/internet-connectivity",
                  description: "Fast internet for seamless streaming and downloads"
                }
              ]}
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartTV;
