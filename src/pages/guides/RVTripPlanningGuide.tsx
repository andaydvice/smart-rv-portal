import { motion } from "framer-motion";
import { Map, Shield, Route, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { FeatureNavigationLinks } from "@/components/navigation/FeatureNavigationLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const RVTripPlanningGuide = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/rv-trip-planning-guide` : '';

  return (
    <Layout>
      <Helmet>
        <title>RV Trip Planning Guide 2025 | Never Hit a Low Bridge Again</title>
        <meta name="description" content="Complete RV trip planning guide with safe routing, campground finder, and weather aware navigation. Avoid bridge strikes and dangerous routes with RV specific GPS software." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'RV Trip Planning Guide',
          description: 'Comprehensive guide to planning safe RV trips with route optimization, campground selection, and avoiding common RV travel mistakes that cost thousands in repairs.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV Trip Planning',
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
          <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }, { label: 'RV Trip Planning' }]} />

          {/* Hero Section with Crisis Hook */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <img
              src="/images/rv-trip-planning-hero.jpg"
              alt="RV Trip Planning - Safe Route Navigation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                  <h1 className="text-4xl md:text-5xl font-bold text-white">Never Hit Another Low Bridge</h1>
                </div>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  One bridge strike costs $15,000+ in repairs. Learn how 50,000+ RVers plan safe trips that avoid height restrictions, weight limits, and dangerous routes.
                </p>
                <a
                  href="https://rvlife.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Try RV Life Pro Free for 7 Days
                </a>
              </div>
            </div>
          </div>

          {/* Crisis Story Section */}
          <div className="mb-16">
            <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4 flex items-center gap-3">
                <AlertTriangle className="h-8 w-8" />
                The $17,400 Mistake Most New RVers Make
              </h2>
              <div className="text-gray-300 space-y-4 text-left">
                <p>
                  Meet Sarah and Tom - excited first time RV owners who spent $85,000 on their dream Class A motorhome. Three weeks into their cross country adventure, their regular GPS routed them under a 12'6" bridge.
                </p>
                <p>
                  Their RV: 13'2" tall.
                </p>
                <p className="text-xl font-bold text-red-400">
                  The damage: $17,400 in roof repairs, ruined solar panels, destroyed air conditioning unit, and insurance premiums that doubled.
                </p>
                <p>
                  This happens to hundreds of RVers every single year - and it's completely preventable with the right trip planning tools.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h2 className="text-2xl font-semibold text-blue-400 mb-6">Essential RV Trip Planning Steps</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">1. Know Your RV Dimensions</h3>
                    <p className="text-gray-300">
                      Before planning any route, you must know your exact height, weight, length, and propane setup. Regular GPS doesn't account for these critical factors.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">2. Use RV-Specific Navigation</h3>
                    <p className="text-gray-300">
                      Standard GPS apps like Google Maps and Apple Maps don't understand RV restrictions. They'll route you under low bridges, through weight restricted roads, and into propane banned tunnels.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">3. Research Campgrounds in Advance</h3>
                    <p className="text-gray-300">
                      Access to 14,000+ campground reviews helps you avoid overpriced, poorly maintained, or unsafe locations. Real RVer reviews make all the difference.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">4. Plan for Weather and Traffic</h3>
                    <p className="text-gray-300">
                      Weather aware routing automatically reroutes you around storms, high winds, and dangerous conditions. Saves trips and prevents accidents.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Shield className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Avoid Costly Mistakes</h3>
                <p className="text-gray-300 mb-4">
                  One bridge strike costs more than 260 years of RV Life Pro subscription. The app pays for itself the first time it routes you safely.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-left">
                  <li>Automatic height and weight routing</li>
                  <li>Propane restriction avoidance</li>
                  <li>Real time low bridge warnings</li>
                  <li>RV safe alternative routes</li>
                </ul>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Map className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Find Perfect Campgrounds</h3>
                <p className="text-gray-300 mb-4">
                  Access 14,000+ campground locations with real reviews, pricing, amenities, and availability information all in one place.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-left">
                  <li>Verified RVer reviews and ratings</li>
                  <li>Filter by amenities and price</li>
                  <li>See photos from real guests</li>
                  <li>Book directly through the app</li>
                </ul>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Route className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Navigate Anywhere</h3>
                <p className="text-gray-300 mb-4">
                  Offline maps mean you're never lost, even in remote areas with zero cell service. Download entire regions before you go.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-left">
                  <li>Works with no internet connection</li>
                  <li>Covers USA, Canada, Mexico</li>
                  <li>Updated monthly with new data</li>
                  <li>Never pay roaming charges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ROI Calculator Section */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">The Math is Simple</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl font-bold text-red-400 mb-2">$17,400</div>
                <div className="text-gray-300">Average bridge strike repair cost</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">vs</div>
                <div className="text-gray-300">Compare to</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-green-400 mb-2">$65/yr</div>
                <div className="text-gray-300">RV Life Pro annual subscription</div>
              </div>
            </div>
            <p className="text-center text-xl text-white mt-8 mb-6">
              That's 267 years of safe navigation for the cost of ONE mistake.
            </p>
            <div className="text-center">
              <a
                href="https://rvlife.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Get 20% Off with Code SMARTRV20
              </a>
            </div>
          </div>

          {/* Affiliate Grid */}
          <OptimizedAffiliateGrid
            title="Essential RV Trip Planning Tools"
            subtitle="Navigate safely and find perfect campgrounds on every journey"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Trip Planning & GPS',
                description: 'RV specific GPS navigation with height and weight routing. Prevents bridge strikes and finds RV safe routes automatically. Includes 14,000+ campground database with real reviews.',
                features: ['RV safe routing', 'Bridge strike prevention', 'Campground finder', 'Offline maps', 'Weather routing', 'Maintenance tracking']
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Emergency Roadside Assistance',
                description: 'Emergency help when things go wrong. 24/7 roadside assistance, towing, tire changes, and emergency routing for RVers.',
                features: ['24/7 emergency support', 'Unlimited distance towing', 'Flat tire service', 'Fuel delivery', 'Lockout assistance']
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
              { href: '/best-rv-gps-comparison', title: 'RV GPS Comparison', description: 'Compare the best RV GPS apps and devices for safe navigation' },
              { href: '/rv-campground-finder', title: 'Campground Finder', description: 'Find and review the best RV campgrounds nationwide' },
              { href: '/family-rv-travel-guide', title: 'Family RV Travel', description: 'Plan safe, fun family RV adventures with kids' }
            ]}
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default RVTripPlanningGuide;
