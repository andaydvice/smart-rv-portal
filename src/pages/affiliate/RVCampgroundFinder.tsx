import { motion } from "framer-motion";
import { MapPin, Star, Wifi, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const RVCampgroundFinder = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/rv-campground-finder` : '';

  return (
    <Layout>
      <Helmet>
        <title>RV Campground Finder 2025 | Find & Book RV Parks</title>
        <meta name="description" content="Find and book RV campgrounds with amenities, reviews, and availability. Search 25,000+ RV parks and campgrounds across North America." />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="RV Campground Finder 2025 | Find & Book RV Parks" />
        <meta property="og:description" content="Find and book RV campgrounds with amenities, reviews, and availability. Search 25,000+ RV parks and campgrounds across North America." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RV Campground Finder 2025 | Find & Book RV Parks" />
        <meta name="twitter:description" content="Find and book RV campgrounds with amenities, reviews, and availability. Search 25,000+ RV parks and campgrounds across North America." />
        <meta name="twitter:image" content={typeof window !== 'undefined' ? `${window.location.origin}/og-image.svg` : ''} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'RV Campground Finder Guide',
          description: 'Comprehensive guide to finding and booking RV campgrounds with reviews, amenities, and real-time availability.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'RV Campground Search',
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
          <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: 'RV Campground Finder' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-teal-900/90 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <MapPin className="h-12 w-12 text-green-400" />
                  <h1 className="text-5xl font-bold text-white">RV Campground Finder</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Find and book the perfect RV campground with amenities, reviews, and real-time availability
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
              Never arrive at a full campground again. Search 25,000+ RV parks with real time availability, verified reviews, and instant booking all in one place.
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
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Why a Dedicated Campground Finder Matters</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>In peak season, over 60% of RVers arrive at campgrounds only to find no availability.</p>

                <p>Without proper planning tools, families waste hours driving between full campgrounds or settling for unsuitable locations.</p>

                <p><a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline">Comprehensive campground finders</a> show real time availability, detailed amenities, and verified reviews before you leave home.</p>
              </div>
              <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg mb-6">
                <Star className="h-6 w-6 text-green-400 mb-2" />
                <p className="text-green-300 font-semibold">Essential Campground Features:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                  <li>• Real-time availability and booking</li>
                  <li>• Verified reviews and ratings</li>
                  <li>• Detailed amenity information</li>
                  <li>• Photos and virtual tours</li>
                  <li>• Price comparison tools</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Calendar className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Real-Time Booking</h3>
                <p className="text-gray-300">
                  Check availability and book campsites instantly without calling or waiting for email responses.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Star className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Verified Reviews</h3>
                <p className="text-gray-300">
                  Read authentic reviews from fellow RVers about campground conditions, amenities, and service.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Wifi className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Amenity Filtering</h3>
                <p className="text-gray-300">
                  Filter by essential amenities like full hookups, WiFi, pet-friendly, and pull-through sites.
                </p>
              </div>
            </div>
          </div>

          {/* Mid-Content CTA */}
          <div className="bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6 my-12">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Book Your Perfect Campground Today
            </h3>
            <p className="text-gray-300 mb-4">
              Stop wasting time with phone calls and uncertainty. <a href="https://rvlife.com?ref=smartrvhub" className="text-blue-400 hover:text-blue-300 underline font-semibold">RV Life Pro</a> shows you real time availability at 25,000+ campgrounds with verified reviews and instant booking.
            </p>
            <a
              href="https://rvlife.com?ref=smartrvhub"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Find Your Perfect Spot →
            </a>
          </div>

          {/* Statistics Section */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Campground Search Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">25,000+</div>
                <div className="text-gray-300">Campgrounds in RV Life database</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">60%</div>
                <div className="text-gray-300">Campgrounds fully booked in peak season</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">3+ hours</div>
                <div className="text-gray-300">Wasted searching without proper tools</div>
              </div>
            </div>
          </div>

          {/* What to Look For */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Essential Campground Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Site Features</h4>
                <ul className="space-y-2">
                  <li>• Full hookups (water, electric, sewer)</li>
                  <li>• Pull-through vs back-in sites</li>
                  <li>• Site length and width for your RV</li>
                  <li>• Pad type (concrete, gravel, grass)</li>
                  <li>• Shade and privacy level</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Campground Amenities</h4>
                <ul className="space-y-2">
                  <li>• WiFi speed and reliability</li>
                  <li>• Laundry facilities</li>
                  <li>• Pet policies and dog parks</li>
                  <li>• Pool, playground, recreation areas</li>
                  <li>• Dump station and propane</li>
                </ul>
              </div>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Best RV Campground Finder"
            subtitle="Largest database with real-time booking and verified reviews"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Campground Finder',
                description: 'Most comprehensive RV campground database with 25,000+ locations, real-time booking, detailed amenities, and verified reviews.',
                features: [
                  '25,000+ RV parks and campgrounds',
                  'Real-time availability and instant booking',
                  'Verified reviews from RV travelers',
                  'Detailed amenity information and photos',
                  'Filter by hookups, WiFi, pet-friendly, more',
                  'Integrated with RV-safe GPS navigation'
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
              <a href="/best-rv-gps-comparison" className="text-blue-400 hover:text-blue-300">
                Best RV GPS Comparison →
              </a>
              <a href="/family-rv-travel-guide" className="text-blue-400 hover:text-blue-300">
                Family RV Travel Guide →
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default RVCampgroundFinder;
