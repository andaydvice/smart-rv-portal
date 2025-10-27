import { motion } from "framer-motion";
import { Navigation, Smartphone, Monitor, Check, X, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { FeatureNavigationLinks } from "@/components/navigation/FeatureNavigationLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const BestRVGPSComparison = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/best-rv-gps-comparison` : '';

  return (
    <Layout>
      <Helmet>
        <title>Best RV GPS 2025: App vs Device Comparison Guide</title>
        <meta name="description" content="Compare the best RV GPS navigation apps and devices in 2025. RV Life Pro vs Garmin vs Google Maps - which prevents bridge strikes and finds RV safe routes?" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'Best RV GPS Comparison 2025',
          description: 'Comprehensive comparison of RV GPS navigation systems including apps and dedicated devices. Find the best RV safe routing solution for your needs.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV GPS Comparison',
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
          <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }, { label: 'Best RV GPS Comparison' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/navigation-hero.jpg"
              alt="RV GPS Comparison - Apps vs Devices"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Navigation className="h-12 w-12 text-blue-400" />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">Best RV GPS 2025</h1>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  Compare RV GPS apps vs dedicated devices. Which prevents bridge strikes? Which has the most campgrounds? Find the perfect navigation solution for your RV.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="https://rvlife.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                  >
                    Try Top Rated RV Life Pro Free
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">RV GPS Comparison Table 2025</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-connectivity-darkBg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-900/50">
                    <th className="p-4 text-left text-white font-semibold">Feature</th>
                    <th className="p-4 text-center text-white font-semibold">
                      <div className="flex flex-col items-center gap-2">
                        <Smartphone className="h-6 w-6 text-green-400" />
                        <span>RV Life Pro</span>
                        <span className="text-sm text-gray-300">App</span>
                      </div>
                    </th>
                    <th className="p-4 text-center text-white font-semibold">
                      <div className="flex flex-col items-center gap-2">
                        <Monitor className="h-6 w-6 text-blue-400" />
                        <span>Garmin RV GPS</span>
                        <span className="text-sm text-gray-300">Device</span>
                      </div>
                    </th>
                    <th className="p-4 text-center text-white font-semibold">
                      <div className="flex flex-col items-center gap-2">
                        <Smartphone className="h-6 w-6 text-gray-400" />
                        <span>Google Maps</span>
                        <span className="text-sm text-gray-300">Free App</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-700">
                    <td className="p-4 font-semibold">RV Height Routing</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-gray-800/30">
                    <td className="p-4 font-semibold">RV Weight Routing</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-4 font-semibold">Propane Restrictions</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-gray-800/30">
                    <td className="p-4 font-semibold">Campground Database</td>
                    <td className="p-4 text-center text-green-400 font-bold">14,000+</td>
                    <td className="p-4 text-center text-yellow-400">Limited</td>
                    <td className="p-4 text-center text-gray-500">None</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-4 font-semibold">Real RVer Reviews</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center text-gray-500">General only</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-gray-800/30">
                    <td className="p-4 font-semibold">Offline Maps</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center text-yellow-400">Limited</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-4 font-semibold">Weather Routing</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center text-yellow-400">Basic</td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-gray-800/30">
                    <td className="p-4 font-semibold">Maintenance Tracking</td>
                    <td className="p-4 text-center"><Check className="h-6 w-6 text-green-400 mx-auto" /></td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-4 font-semibold">Price</td>
                    <td className="p-4 text-center text-green-400 font-bold">$65/year</td>
                    <td className="p-4 text-center text-yellow-400">$300-600</td>
                    <td className="p-4 text-center text-green-400">Free</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-gray-800/30">
                    <td className="p-4 font-semibold">Update Frequency</td>
                    <td className="p-4 text-center text-green-400">Monthly</td>
                    <td className="p-4 text-center text-yellow-400">Yearly</td>
                    <td className="p-4 text-center text-green-400">Real time</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="p-4 font-semibold">Free Trial</td>
                    <td className="p-4 text-center text-green-400 font-bold">7 Days</td>
                    <td className="p-4 text-center"><X className="h-6 w-6 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center text-green-400">Always</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Winner Section */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-2 border-green-500/50 rounded-lg p-8 mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Star className="h-10 w-10 text-yellow-400 fill-current" />
              <h2 className="text-3xl font-bold text-white">Our #1 Recommendation: RV Life Pro</h2>
              <Star className="h-10 w-10 text-yellow-400 fill-current" />
            </div>

            <div className="text-gray-300 space-y-4 mb-8 text-left max-w-4xl mx-auto">
              <p className="text-lg">
                After testing all major RV GPS solutions, RV Life Pro offers the best combination of safety features, campground database, and value for money.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">4.8 ★</div>
                  <div className="text-gray-300">12,000+ Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">50,000+</div>
                  <div className="text-gray-300">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">$65/yr</div>
                  <div className="text-gray-300">vs $300-600 Devices</div>
                </div>
              </div>

              <p className="text-xl font-semibold text-white">
                Why RV Life Pro Wins:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Most comprehensive RV safe routing (height, weight, propane)</li>
                <li>Largest campground database with verified RVer reviews</li>
                <li>Works on your existing smartphone - no new device needed</li>
                <li>Includes maintenance tracking and trip planning tools</li>
                <li>Monthly updates vs yearly on dedicated devices</li>
                <li>Try free for 7 days with no credit card required</li>
              </ul>
            </div>

            <div className="text-center">
              <a
                href="https://rvlife.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your Free 7-Day Trial → Get 20% Off with Code SMARTRV20
              </a>
            </div>
          </div>

          {/* Detailed Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h3 className="text-2xl font-semibold text-green-400 mb-4">✓ Best for Most RVers: RV Life Pro App</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">Price:</strong> $65/year (20% off with code SMARTRV20)
                </p>
                <p>
                  <strong className="text-white">Best Features:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Automatic RV safe routing based on your specific dimensions</li>
                  <li>14,000+ campground database with photos and reviews</li>
                  <li>Offline maps for remote travel</li>
                  <li>Weather routing and alerts</li>
                  <li>Maintenance tracking integrated</li>
                  <li>Works on iPhone and Android</li>
                </ul>
                <p>
                  <strong className="text-white">Who it's for:</strong> Any RVer who wants the safest routes, best campgrounds, and doesn't want to buy a separate $300-600 device.
                </p>
                <a
                  href="https://rvlife.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all mt-4"
                >
                  Try Free for 7 Days
                </a>
              </div>
            </div>

            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Garmin RV GPS Devices</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">Price:</strong> $300-600 one time cost
                </p>
                <p>
                  <strong className="text-white">Best Features:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Dedicated large screen display</li>
                  <li>RV specific routing for height and weight</li>
                  <li>Preloaded maps (updates cost extra yearly)</li>
                  <li>No phone required</li>
                </ul>
                <p>
                  <strong className="text-white">Downsides:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>High upfront cost ($300-600)</li>
                  <li>Yearly map updates cost $50-100</li>
                  <li>Limited campground database</li>
                  <li>No maintenance tracking</li>
                  <li>Device can become outdated</li>
                </ul>
                <p>
                  <strong className="text-white">Who it's for:</strong> RVers who prefer dedicated devices and don't mind the high upfront cost and yearly update fees.
                </p>
              </div>
            </div>
          </div>

          {/* Why Not Google Maps */}
          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-red-400 mb-4 text-center">Why Google Maps Fails RVers</h3>
            <div className="text-gray-300 space-y-4 text-left max-w-3xl mx-auto">
              <p>
                While Google Maps is excellent for cars, it's dangerously inadequate for RVs. Here's why:
              </p>
              <ul className="list-disc list-inside space-y-3 text-lg">
                <li><strong className="text-white">No RV dimensions awareness:</strong> Routes you under low bridges, through weight restricted roads</li>
                <li><strong className="text-white">No propane restrictions:</strong> Can route you through tunnels that ban propane tanks</li>
                <li><strong className="text-white">No RV specific POIs:</strong> Doesn't know where campgrounds, dump stations, or RV friendly stops are</li>
                <li><strong className="text-white">Generic reviews:</strong> Restaurant reviews don't help you find RV parking</li>
              </ul>
              <p className="text-xl font-semibold text-red-400 mt-6">
                Bottom line: Using Google Maps in an RV is like gambling with a $100,000+ asset.
              </p>
            </div>
          </div>

          {/* Affiliate Grid */}
          <OptimizedAffiliateGrid
            title="Recommended RV Navigation Solutions"
            subtitle="Get the best RV GPS software and emergency backup"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Best Overall RV GPS App',
                description: 'Our top recommendation. RV safe routing, 14,000+ campground database, maintenance tracking, weather routing. Works on iPhone and Android.',
                features: ['RV safe routing', 'Bridge strike prevention', '14,000+ campgrounds', 'Offline maps', 'Weather alerts', '7 day free trial']
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Emergency Roadside Assistance',
                description: 'Essential backup for when GPS fails or emergencies happen. 24/7 roadside assistance, unlimited towing, tire service.',
                features: ['24/7 emergency routing', 'Unlimited towing', 'Tire changes', 'Fuel delivery', 'Lockout assistance']
              }
            ]}
            gridCols="2"
            className="mt-16"
          />

          <AffiliateDisclosure className="mt-8" />

          {/* Feature Navigation Links */}
          <FeatureNavigationLinks
            className="mt-12 mb-8"
            relatedFeatures={[
              { href: '/rv-trip-planning-guide', title: 'RV Trip Planning', description: 'Complete guide to planning safe RV trips' },
              { href: '/rv-navigation-app-guide', title: 'RV Navigation Apps', description: 'Detailed guide to RV navigation software' },
              { href: '/rv-campground-finder', title: 'Campground Finder', description: 'Find the best campgrounds with real reviews' }
            ]}
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default BestRVGPSComparison;
