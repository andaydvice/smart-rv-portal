import { motion } from "framer-motion";
import { Users, Baby, Heart, Smile } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const FamilyRVTravelGuide = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/family-rv-travel-guide` : '';

  return (
    <Layout>
      <Helmet>
        <title>Family RV Travel Guide 2025 | Tips for RVing with Kids</title>
        <meta name="description" content="Complete guide to RV travel with children including safety tips, entertainment ideas, campground selection, and trip planning for family adventures." />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Family RV Travel Guide 2025 | Tips for RVing with Kids" />
        <meta property="og:description" content="Complete guide to RV travel with children including safety tips, entertainment ideas, campground selection, and trip planning for family adventures." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Family RV Travel Guide 2025 | Tips for RVing with Kids" />
        <meta name="twitter:description" content="Complete guide to RV travel with children including safety tips, entertainment ideas, campground selection, and trip planning for family adventures." />
        <meta name="twitter:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'Family RV Travel Guide',
          description: 'Comprehensive guide for families traveling by RV with children, including safety, entertainment, and planning tips.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV Family Travel',
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
          <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: 'Family RV Travel Guide' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-red-900/90 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Users className="h-12 w-12 text-orange-400" />
                  <h1 className="text-5xl font-bold text-white">Family RV Travel Guide</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Create unforgettable family memories with safe, fun, and stress-free RV adventures
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
              Plan stress free family adventures with RV Life Pro. Find family friendly campgrounds with playgrounds and pools, plus safe routing that keeps your loved ones protected.
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
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Why Families Love RV Travel</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>Over 11 million families in North America now choose RV travel for vacations, with 73% reporting closer family bonds.</p>

                <p><a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline">RV travel</a> provides flexibility for nap times, meal preferences, and spontaneous stops that traditional hotels cannot offer.</p>

                <p>Families save an average of 50% on vacation costs compared to hotels and restaurants while creating richer experiences with <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline">proper trip planning</a>.</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-500 p-4 rounded-lg mb-6">
                <Heart className="h-6 w-6 text-orange-400 mb-2" />
                <p className="text-orange-300 font-semibold">Family RV Benefits:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                  <li>• Quality family time without distractions</li>
                  <li>• Educational experiences at national parks</li>
                  <li>• Flexibility for children's schedules</li>
                  <li>• Cost savings vs traditional vacations</li>
                  <li>• Home comforts while traveling</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Baby className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Child-Friendly Planning</h3>
                <p className="text-gray-300">
                  Plan routes with frequent stops, child-friendly campgrounds, and activities suitable for all ages.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Smile className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Entertainment Options</h3>
                <p className="text-gray-300">
                  Keep kids engaged with nature activities, educational games, and entertainment systems for travel days.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Users className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Safety First</h3>
                <p className="text-gray-300">
                  Essential safety tips for traveling with children including proper seating, emergency plans, and supervision.
                </p>
              </div>
            </div>
          </div>

          {/* Mid-Content CTA */}
          <div className="bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 my-12">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Create Amazing Family Memories
            </h3>
            <p className="text-gray-300 mb-4">
              Find family friendly campgrounds with playgrounds, pools, and activities your kids will love. <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline font-semibold">RV Life Pro</a> makes family trip planning easy with filters for kid friendly amenities.
            </p>
            <a
              href="https://rvlife.com?ref=smartrvhub"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Plan Your Family Adventure →
            </a>
          </div>

          {/* Family RV Statistics */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Family RV Travel Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">11M</div>
                <div className="text-gray-300">Families RVing in North America</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">73%</div>
                <div className="text-gray-300">Report stronger family bonds</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">50%</div>
                <div className="text-gray-300">Cost savings vs traditional travel</div>
              </div>
            </div>
          </div>

          {/* Essential Tips */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Essential Family RV Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Before You Go</h4>
                <ul className="space-y-2">
                  <li>• Choose campgrounds with playgrounds and pools</li>
                  <li>• Pack favorite snacks and comfort items</li>
                  <li>• Plan driving time around nap schedules</li>
                  <li>• Prepare entertainment for travel days</li>
                  <li>• Discuss safety rules with children</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">On the Road</h4>
                <ul className="space-y-2">
                  <li>• Take frequent breaks at rest areas</li>
                  <li>• Visit national parks and attractions</li>
                  <li>• Let kids help with simple RV tasks</li>
                  <li>• Create daily adventure journals</li>
                  <li>• Meet other RV families at campgrounds</li>
                </ul>
              </div>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Essential Tools for Family RV Travel"
            subtitle="Plan safe routes and find family-friendly campgrounds with ease"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Family Trip Planning',
                description: 'Plan family-friendly routes with campground amenities, playgrounds, and attractions along the way. Find the perfect spots for your family adventure.',
                features: [
                  'Family-friendly campground filtering',
                  'Playground and pool amenity search',
                  'Safe routing for RV families',
                  'Attraction and activity planning',
                  'Real-time availability booking',
                  'Trip planning with kids in mind'
                ]
              }
            ]}
            gridCols="1"
            className="mt-16"
          />

          <AffiliateDisclosure className="mt-8" />

          {/* Related Content */}
          <div className="mt-12 bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Related RV Travel Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/rv-trip-planning-guide" className="text-blue-400 hover:text-blue-300">
                RV Trip Planning Guide →
              </a>
              <a href="/rv-campground-finder" className="text-blue-400 hover:text-blue-300">
                RV Campground Finder →
              </a>
              <a href="/full-time-rv-living-guide" className="text-blue-400 hover:text-blue-300">
                Full-Time RV Living Guide →
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default FamilyRVTravelGuide;
