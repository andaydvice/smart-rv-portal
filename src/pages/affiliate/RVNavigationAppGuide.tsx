import { motion } from "framer-motion";
import { Smartphone, Download, Wifi, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const RVNavigationAppGuide = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/rv-navigation-app-guide` : '';

  return (
    <Layout>
      <Helmet>
        <title>Best RV Navigation Apps 2025 | Complete App Comparison</title>
        <meta name="description" content="Compare top RV navigation apps including RV Life Pro, Garmin, and Google Maps alternatives. Find the best RV navigation app for iPhone and Android." />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Best RV Navigation Apps 2025 | Complete App Comparison" />
        <meta property="og:description" content="Compare top RV navigation apps including RV Life Pro, Garmin, and Google Maps alternatives. Find the best RV navigation app for iPhone and Android." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best RV Navigation Apps 2025 | Complete App Comparison" />
        <meta name="twitter:description" content="Compare top RV navigation apps including RV Life Pro, Garmin, and Google Maps alternatives. Find the best RV navigation app for iPhone and Android." />
        <meta name="twitter:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'RV Navigation App Guide',
          description: 'Comprehensive guide to RV navigation apps with features, pricing, and recommendations for mobile RV navigation.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV Navigation Apps',
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
          <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: 'RV Navigation App Guide' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Smartphone className="h-12 w-12 text-purple-400" />
                  <h1 className="text-5xl font-bold text-white">RV Navigation App Guide</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Navigate safely with RV specific mobile apps that prevent bridge strikes and find campgrounds
                </p>
              </div>
            </div>
          </div>

          {/* Early CTA - Above the Fold */}
          <div className="bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Try RV Life Pro Free for 7 Days
            </h3>
            <p className="text-gray-300 mb-4">
              Download the best RV navigation app today. Get instant access to RV safe routes, 25,000+ campgrounds, and offline maps on your iPhone or Android device.
            </p>
            <a
              href="https://rvlife.com?ref=smartrvhub"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Start Free Trial →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Why RV Navigation Apps Beat Standard GPS</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>In 2023, over 800 RVers reported using Google Maps for navigation, only to encounter low bridges that caused massive damage.</p>

                <p>Standard navigation apps do not account for RV height, weight, or width restrictions.</p>

                <p><a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline">RV specific apps</a> prevent disasters by routing around restrictions and providing campground integration.</p>
              </div>
              <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg mb-6">
                <Zap className="h-6 w-6 text-green-400 mb-2" />
                <p className="text-green-300 font-semibold">App Advantages:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                  <li>• Use phone/tablet you already own</li>
                  <li>• Lower cost than dedicated GPS units</li>
                  <li>• Automatic updates and improvements</li>
                  <li>• Integrated campground booking</li>
                  <li>• Real-time traffic and weather</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Download className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Easy Installation</h3>
                <p className="text-gray-300">
                  Download from App Store or Google Play and start navigating safely within minutes.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Wifi className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Offline Capability</h3>
                <p className="text-gray-300">
                  Download maps for offline use in remote areas without cellular coverage.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Smartphone className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Always Updated</h3>
                <p className="text-gray-300">
                  Automatic updates ensure you have the latest maps and restriction information.
                </p>
              </div>
            </div>
          </div>

          {/* Mid-Content CTA */}
          <div className="bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 my-12">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Get the Most Complete RV Navigation App
            </h3>
            <p className="text-gray-300 mb-4">
              Join over 2 million RVers using <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline font-semibold">RV Life Pro</a> for safe navigation. Works on your existing phone with offline maps, 25,000+ campgrounds, and automatic updates.
            </p>
            <a
              href="https://rvlife.com?ref=smartrvhub"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Download Now - Free Trial →
            </a>
          </div>

          {/* App Comparison */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">RV Navigation App Comparison</h3>
            <div className="space-y-6">
              <div className="border-b border-gray-700 pb-6">
                <h4 className="text-xl font-semibold text-blue-400 mb-3">RV Life Pro (Recommended)</h4>
                <p className="text-gray-300 mb-3">
                  Most comprehensive RV navigation app with 25,000+ campground database and advanced trip planning.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white ml-2">$49.99/year</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Campgrounds:</span>
                    <span className="text-white ml-2">25,000+</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Offline:</span>
                    <span className="text-white ml-2">Yes</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Platform:</span>
                    <span className="text-white ml-2">iOS/Android</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h4 className="text-xl font-semibold text-gray-300 mb-3">Garmin RV (Alternative)</h4>
                <p className="text-gray-300 mb-3">
                  Companion app for Garmin hardware units with limited standalone functionality.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white ml-2">Requires hardware</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Campgrounds:</span>
                    <span className="text-white ml-2">10,000+</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Offline:</span>
                    <span className="text-white ml-2">Limited</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Platform:</span>
                    <span className="text-white ml-2">iOS/Android</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-300 mb-3">CoPilot RV (Alternative)</h4>
                <p className="text-gray-300 mb-3">
                  Budget option with basic RV routing but limited campground database.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white ml-2">$34.99/year</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Campgrounds:</span>
                    <span className="text-white ml-2">5,000+</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Offline:</span>
                    <span className="text-white ml-2">Yes</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Platform:</span>
                    <span className="text-white ml-2">iOS/Android</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Best RV Navigation App"
            subtitle="Most comprehensive features at the best value for RV travelers"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Premium RV Navigation',
                description: 'Industry-leading RV navigation app with the largest campground database, RV-safe routing, and comprehensive trip planning tools.',
                features: [
                  'RV-safe routing with height/weight/width alerts',
                  '25,000+ campground database with booking',
                  'Advanced trip planning and route optimization',
                  'Offline maps for remote areas',
                  'Real-time weather and traffic integration',
                  'Works on iOS and Android devices'
                ]
              }
            ]}
            gridCols="1"
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
              <a href="/best-rv-gps-comparison" className="text-blue-400 hover:text-blue-300">
                Best RV GPS Comparison →
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

export default RVNavigationAppGuide;
