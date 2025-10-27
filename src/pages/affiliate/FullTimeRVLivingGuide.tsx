import { motion } from "framer-motion";
import { Home, TrendingUp, MapPin, Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { productSchema } from "@/components/seo/schemas";

const FullTimeRVLivingGuide = () => {
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/full-time-rv-living-guide` : '';

  return (
    <Layout>
      <Helmet>
        <title>Full-Time RV Living Guide 2024 | Complete Lifestyle Guide</title>
        <meta name="description" content="Complete guide to full-time RV living including budgeting, domicile, mail forwarding, internet, healthcare, and campground selection for nomadic lifestyle." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema({
          name: 'Full-Time RV Living Guide',
          description: 'Comprehensive guide for transitioning to and maintaining full-time RV living lifestyle with practical tips and resources.',
          url: canonicalUrl,
          brand: 'Smart RV Hub',
          category: 'Full-Time RV Living',
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
          <Breadcrumbs items={[{ label: 'Resources', href: '/blog' }, { label: 'Full-Time RV Living Guide' }]} />

          {/* Hero Section */}
          <div className="relative h-96 mb-16 mt-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Home className="h-12 w-12 text-indigo-400" />
                  <h1 className="text-5xl font-bold text-white">Full-Time RV Living Guide</h1>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  Everything you need to know about living the full-time RV lifestyle
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 text-left">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">The Full-Time RV Lifestyle Reality</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p>Over 1 million Americans now live full-time in RVs, with the number growing 64% in the past five years.</p>

                <p>Full-timers report an average 50-70% reduction in living expenses compared to traditional housing while gaining location freedom.</p>

                <p>Successful full-time RV living requires proper planning for domicile, mail, healthcare, connectivity, and campground management.</p>
              </div>
              <div className="bg-indigo-900/20 border border-indigo-500 p-4 rounded-lg mb-6">
                <TrendingUp className="h-6 w-6 text-indigo-400 mb-2" />
                <p className="text-indigo-300 font-semibold">Full-Time Essentials:</p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                  <li>• Legal domicile and mail forwarding</li>
                  <li>• Reliable internet and connectivity</li>
                  <li>• Healthcare and insurance planning</li>
                  <li>• Budget and financial management</li>
                  <li>• Campground network and planning</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <MapPin className="h-6 w-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Domicile & Mail</h3>
                <p className="text-gray-300">
                  Establish legal domicile in RV-friendly states and set up mail forwarding for important documents.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Briefcase className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Work & Income</h3>
                <p className="text-gray-300">
                  Remote work, freelancing, and location-independent income sources enable sustainable full-time travel.
                </p>
              </div>

              <div className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
                <Home className="h-6 w-6 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Campground Strategy</h3>
                <p className="text-gray-300">
                  Balance between free camping, membership parks, and paid campgrounds to optimize costs and amenities.
                </p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Full-Time RV Living Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-4">Average Monthly Expenses</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Campground fees:</span>
                    <span className="text-white">$600-1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel and travel:</span>
                    <span className="text-white">$300-500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance (RV, health, auto):</span>
                    <span className="text-white">$400-600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food and supplies:</span>
                    <span className="text-white">$400-600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Internet and connectivity:</span>
                    <span className="text-white">$100-200</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-3 font-semibold">
                    <span>Total Monthly:</span>
                    <span className="text-green-400">$1,800-3,100</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-4">Cost Saving Strategies</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Use Harvest Hosts and free camping (BLM, National Forests)</li>
                  <li>• Join camping membership programs for discounts</li>
                  <li>• Work camp for free sites and small income</li>
                  <li>• Cook in RV instead of restaurants</li>
                  <li>• Solar power reduces campground dependency</li>
                  <li>• Stay longer to reduce fuel costs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-connectivity-darkBg p-8 rounded-lg border border-gray-700 mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Full-Time RV Living Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-400 mb-2">1M+</div>
                <div className="text-gray-300">Full-time RVers in USA</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">64%</div>
                <div className="text-gray-300">Growth in past 5 years</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">50-70%</div>
                <div className="text-gray-300">Living cost reduction vs housing</div>
              </div>
            </div>
          </div>

          <OptimizedAffiliateGrid
            title="Essential Tools for Full-Time RV Living"
            subtitle="Plan your routes, find campgrounds, and manage your nomadic lifestyle"
            partners={[
              {
                name: 'RV Life',
                url: 'https://rvlife.com',
                title: 'RV Life Pro - Full-Timer Edition',
                description: 'Complete trip planning and campground management system designed for full-time RVers with extended stay options and membership tracking.',
                features: [
                  '25,000+ campground database with long-term options',
                  'Trip planning for continuous travel',
                  'Work camping and membership park integration',
                  'RV-safe routing between locations',
                  'Budget tracking and expense management',
                  'Full-timer community and tips'
                ]
              },
              {
                name: 'Good Sam',
                url: 'https://goodsam.com',
                title: 'Good Sam Full-Timer Protection',
                description: 'Essential roadside assistance and camping discounts for full-time RVers living on the road year-round.',
                features: [
                  '24/7 emergency roadside assistance',
                  '10% camping discounts at 2,000+ parks',
                  'Unlimited towing for full-timers',
                  'Priority service for RV residents'
                ]
              }
            ]}
            gridCols="2"
            className="mt-16"
          />

          <AffiliateDisclosure className="mt-8" />

          {/* Related Content */}
          <div className="mt-12 bg-connectivity-darkBg p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Related RV Lifestyle Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/remote-work-rv-guide" className="text-blue-400 hover:text-blue-300">
                Remote Work RV Guide →
              </a>
              <a href="/rv-trip-planning-guide" className="text-blue-400 hover:text-blue-300">
                RV Trip Planning Guide →
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

export default FullTimeRVLivingGuide;
