import { motion } from "framer-motion";
import { Navigation, Satellite, Map, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const BestRVGPSComparison = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/best-rv-gps-comparison` : '';

  return (
    <Layout>
      <Helmet>
        <title>Best RV GPS Systems 2024 | Complete Comparison Guide</title>
        <meta name="description" content="Compare the best RV GPS systems including Garmin, Rand McNally, and RV Life Pro. Find the right RV navigation system with height alerts and safe routing." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'Best RV GPS Comparison Guide',
          description: 'Comprehensive comparison of top RV GPS systems with features, pricing, and recommendations for safe RV navigation.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV GPS Navigation',
          offers: {
            url: 'https://rvlife.com',
            availability: 'InStock'
          }
        }))}</script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: 'Best RV GPS Comparison' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Navigation className="h-12 w-12 text-blue-400" />
                  <h1 className="text-5xl font-bold text-white">Best RV GPS Comparison</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Compare top RV GPS systems to find the perfect navigation solution for your rig
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Why RV-Specific GPS Matters</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>Standard car GPS systems have caused over 1,200 bridge strikes in the past year alone.</p>

                <p>RV GPS systems prevent costly accidents by routing around low bridges, weight restrictions, and narrow roads.</p>

                <p>The right GPS system pays for itself by avoiding even a single bridge strike costing $75,000+ in repairs.</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg mb-6">
                <CheckCircle className="h-6 w-6 text-blue-400 mb-2" />
                <p className="text-blue-300 font-semibold">Key Features to Compare:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                  <li>• Height and weight restriction routing</li>
                  <li>• Campground database integration</li>
                  <li>• Real-time traffic and weather updates</li>
                  <li>• Offline map capabilities</li>
                  <li>• Price and subscription costs</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Satellite className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Hardware vs. Software GPS</h3>
                <p className="text-gray-300">
                  Dedicated GPS units offer reliability without phone dependence, while apps provide flexibility and lower cost.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Map className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Database Coverage</h3>
                <p className="text-gray-300">
                  Comprehensive campground and restriction databases are critical for safe routing and trip planning.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <CheckCircle className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Update Frequency</h3>
                <p className="text-gray-300">
                  Regular map and database updates ensure accuracy as roads and restrictions change.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">GPS System Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="pb-4">Feature</th>
                    <th className="pb-4">Garmin RV</th>
                    <th className="pb-4">Rand McNally</th>
                    <th className="pb-4 text-blue-400">RV Life Pro</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Height Routing</td>
                    <td className="py-4">✓</td>
                    <td className="py-4">✓</td>
                    <td className="py-4 text-blue-400">✓</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Campground Database</td>
                    <td className="py-4">10,000+</td>
                    <td className="py-4">8,000+</td>
                    <td className="py-4 text-blue-400">25,000+</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Weather Integration</td>
                    <td className="py-4">Basic</td>
                    <td className="py-4">Basic</td>
                    <td className="py-4 text-blue-400">Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Trip Planning</td>
                    <td className="py-4">Limited</td>
                    <td className="py-4">Yes</td>
                    <td className="py-4 text-blue-400">Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4">Cost</td>
                    <td className="py-4">$300-600</td>
                    <td className="py-4">$350-550</td>
                    <td className="py-4 text-blue-400">$49.99/year</td>
                  </tr>
                  <tr>
                    <td className="py-4">Platform</td>
                    <td className="py-4">Hardware</td>
                    <td className="py-4">Hardware</td>
                    <td className="py-4 text-blue-400">App (iOS/Android)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Recommended RV GPS Solution"
            subtitle="Best value with comprehensive features and lowest total cost"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - App Based GPS',
                description: 'Professional RV GPS navigation with the largest campground database, advanced trip planning, and real time updates at a fraction of hardware GPS cost.',
                features: [
                  'RV-safe routing with height/weight restrictions',
                  '25,000+ campground locations with booking',
                  'Advanced weather and traffic integration',
                  'Comprehensive trip planning tools',
                  'Works on phone/tablet you already own',
                  'Only $49.99/year (vs $300-600 hardware)'
                ]
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Emergency Roadside',
                description: 'Essential backup protection when GPS fails or unexpected situations occur on the road.',
                features: [
                  '24/7 emergency roadside assistance',
                  'Unlimited towing protection',
                  'Emergency routing assistance',
                  'Tire and battery service'
                ]
              }
            ]}
            gridCols="2"
            className="mt-16"
          />

          <AffiliateDisclosure className="mt-8" />

          {/* Related Content */}
          <div className="mt-12 bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Related RV Navigation Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/rv-trip-planning-guide" className="text-blue-400 hover:text-blue-300">
                RV Trip Planning Guide →
              </a>
              <a href="/rv-navigation-app-guide" className="text-blue-400 hover:text-blue-300">
                RV Navigation App Guide →
              </a>
              <a href="/rv-campground-finder" className="text-blue-400 hover:text-blue-300">
                RV Campground Finder →
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default BestRVGPSComparison;
