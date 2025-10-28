import { motion } from "framer-motion";
import { MapPin, Route, AlertTriangle, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const RVTripPlanningGuide = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/rv-trip-planning-guide` : '';

  return (
    <Layout>
      <Helmet>
        <title>RV Trip Planning Guide 2025 | Route Planning & Safety Tips</title>
        <meta name="description" content="Complete RV trip planning guide with route planning tips, height clearance warnings, bridge strike prevention, and campground booking strategies for safe RV travel." />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="RV Trip Planning Guide 2025 | Route Planning & Safety Tips" />
        <meta property="og:description" content="Complete RV trip planning guide with route planning tips, height clearance warnings, bridge strike prevention, and campground booking strategies for safe RV travel." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RV Trip Planning Guide 2025 | Route Planning & Safety Tips" />
        <meta name="twitter:description" content="Complete RV trip planning guide with route planning tips, height clearance warnings, bridge strike prevention, and campground booking strategies for safe RV travel." />
        <meta name="twitter:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'RV Trip Planning Guide',
          description: 'Comprehensive guide for planning safe RV trips with route optimization, clearance checking, and campground reservations.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV Travel Planning',
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
          <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: 'RV Trip Planning Guide' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <MapPin className="h-12 w-12 text-blue-400" />
                  <h1 className="text-5xl font-bold text-white">RV Trip Planning Guide</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Plan safe RV trips with professional route planning, clearance checking, and crisis avoidance strategies
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
              Stop risking bridge strikes. Plan safe RV routes with professional height clearance verification and real time road restrictions in the largest campground database available.
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
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Why Proper Trip Planning Saves Lives</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>Every year, hundreds of RVers strike low bridges, causing thousands in damage and injuries.</p>

                <p>In 2023 alone, insurance companies processed over 1,200 bridge strike claims averaging $75,000 in damages.</p>

                <p>Professional <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline">trip planning with RV Life Pro</a> prevents these disasters before they happen.</p>
              </div>
              <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg mb-6">
                <AlertTriangle className="h-6 w-6 text-red-400 mb-2" />
                <p className="text-red-300 font-semibold">Crisis Prevention Alert:</p>
                <p className="text-gray-300 text-sm mt-2">
                  Standard GPS routing does not account for RV height, width, or weight restrictions. Using car GPS for RV navigation is the leading cause of preventable accidents.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>RV specific route planning with clearance verification</li>
                <li>Bridge and tunnel height restriction database</li>
                <li>Weight-restricted road identification</li>
                <li>Campground booking integration</li>
                <li>Real-time weather and road condition alerts</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Route className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Safe Route Planning</h3>
                <p className="text-gray-300">
                  Plan routes that account for your RV's exact dimensions, avoiding low clearances and restricted roads with <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline">RV specific GPS navigation</a>.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Shield className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Bridge Strike Prevention</h3>
                <p className="text-gray-300">
                  Comprehensive database of height restrictions prevents costly bridge strikes and roof damage.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <MapPin className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Campground Finder</h3>
                <p className="text-gray-300">
                  Integrated campground database with availability, amenities, and booking capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Mid-Content CTA */}
          <div className="bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 my-12">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Protect Your RV with Professional Route Planning
            </h3>
            <p className="text-gray-300 mb-4">
              Join thousands of RVers who use <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline font-semibold">RV Life Pro</a> to avoid bridge strikes and plan perfect trips with confidence. Get instant access to height clearance verification and 25,000+ campgrounds.
            </p>
            <a
              href="https://rvlife.com?ref=smartrvhub"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Start Your Free Trial →
            </a>
          </div>

          {/* Statistics Section */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">The Cost of Poor Planning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">$75,000</div>
                <div className="text-gray-300">Average bridge strike repair cost</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">1,200+</div>
                <div className="text-gray-300">Bridge strikes reported annually</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-gray-300">Preventable with proper routing</div>
              </div>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Professional RV Trip Planning Tools"
            subtitle="Avoid bridge strikes and plan safe routes with RV specific navigation"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Trip Planning Suite',
                description: 'Professional trip planning with RV-safe routing, height clearance verification, and integrated campground booking.',
                features: [
                  'RV-safe routing with clearance checking',
                  'Bridge and tunnel height database',
                  'Campground finder with 25,000+ locations',
                  'Weather and road condition integration',
                  'Trip planning and booking tools'
                ]
              }
            ]}
            gridCols="1"
            className="mt-16"
          />

          <AffiliateDisclosure className="mt-8" />

          {/* Related Content */}
          <div className="mt-12 bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Related RV Planning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/best-rv-gps-comparison" className="text-blue-400 hover:text-blue-300">
                Best RV GPS Comparison →
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

export default RVTripPlanningGuide;
