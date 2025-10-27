/**
 * RV Life Pro Campgrounds Database Showcase Page
 *
 * A compelling showcase of RV Life Pro's 14,000+ campground database,
 * demonstrating the massive value through visual and interactive presentations.
 *
 * Features:
 * - Database statistics and visualisations
 * - Interactive map placeholders
 * - Search & filter interface demonstrations
 * - Sample campground profiles
 * - Review system showcase (NO fake reviews)
 * - Coverage maps and comparisons
 *
 * Australian English throughout
 */

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Search,
  Filter,
  Star,
  Users,
  Calendar,
  Wifi,
  Zap,
  Droplet,
  Navigation,
  Image as ImageIcon,
  CheckCircle,
  Shield,
  TrendingUp,
  Database,
  Globe,
  RefreshCw,
  Heart,
  DollarSign,
  Compass,
  Award,
  Eye,
  Camera,
  MessageCircle,
  ThumbsUp,
  MapPinned,
  Gauge,
  CircleDot,
  Layers,
  X,
  Check,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  ParkingCircle,
  Tent,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import {
  RVLifeCard,
  RVLifeCardGrid,
  RVLifeStatCard,
  RVLifeIconCard
} from '@/components/affiliate/rv-life-pro/RVLifeCard';
import {
  RVLifeFeatureBlock,
  RVLifeBenefitsList
} from '@/components/affiliate/rv-life-pro/RVLifeFeatureBlock';
import { TrustSignals } from '@/components/affiliate/rv-life-pro/TrustSignals';
import { RVLifeAffiliateLink } from '@/components/affiliate/rv-life-pro/RVLifeAffiliateLink';
import { DiscountCodeBox } from '@/components/affiliate/rv-life-pro/DiscountCodeBox';
import { ExitIntentModal } from '@/components/affiliate/rv-life-pro/ExitIntentModal';

// Hooks
import { useRVLifeTracking } from '@/hooks/useRVLifeTracking';

// Styles
import '@/styles/affiliate/rv-life-pro.css';

/**
 * Sample Campground Data (Generic examples, not real campgrounds)
 */
interface SampleCampground {
  id: string;
  name: string;
  location: string;
  region: string;
  rating: number;
  reviewCount: number;
  photoCount: number;
  priceRange: string;
  amenities: string[];
  highlights: string[];
  rvFriendly: boolean;
}

const SAMPLE_CAMPGROUNDS: SampleCampground[] = [
  {
    id: 'sample-1',
    name: 'Riverside RV Resort',
    location: 'Brisbane Region, QLD',
    region: 'Queensland',
    rating: 4.7,
    reviewCount: 234,
    photoCount: 156,
    priceRange: '$35-$55/night',
    amenities: ['Full Hookups', 'WiFi', 'Laundry', 'Pool', 'Pet Friendly', 'Dump Station'],
    highlights: ['Family-friendly', 'River access', 'Powered sites', 'Camp kitchen'],
    rvFriendly: true,
  },
  {
    id: 'sample-2',
    name: 'Outback Adventure Park',
    location: 'Northern Territory',
    region: 'Northern Territory',
    rating: 4.8,
    reviewCount: 189,
    photoCount: 203,
    priceRange: '$28-$45/night',
    amenities: ['Powered Sites', 'Water', 'Remote Location', 'Dump Station', 'Bush Setting'],
    highlights: ['Remote location', 'Stargazing', 'Wildlife', '4WD access'],
    rvFriendly: true,
  },
  {
    id: 'sample-3',
    name: 'Coastal Caravan Haven',
    location: 'Central Coast, NSW',
    region: 'New South Wales',
    rating: 4.6,
    reviewCount: 312,
    photoCount: 278,
    priceRange: '$42-$68/night',
    amenities: ['Beach Access', 'WiFi', 'Full Hookups', 'Camp Store', 'Playground', 'BBQ Areas'],
    highlights: ['Beach access', 'Surfing nearby', 'Ocean views', 'Walking tracks'],
    rvFriendly: true,
  },
  {
    id: 'sample-4',
    name: 'Mountain View Holiday Park',
    location: 'Victorian High Country, VIC',
    region: 'Victoria',
    rating: 4.5,
    reviewCount: 167,
    photoCount: 134,
    priceRange: '$30-$50/night',
    amenities: ['Powered Sites', 'Scenic Views', 'Hiking Trails', 'Pet Friendly', 'Camp Kitchen'],
    highlights: ['Mountain views', 'Hiking', 'Cool climate', 'Nature walks'],
    rvFriendly: true,
  },
];

/**
 * RV Life Pro Campgrounds Showcase Page Component
 */
export const RVLifeProCampgrounds: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCampground, setSelectedCampground] = useState<string | null>(null);

  // Initialize tracking
  const { trackCTAClick, trackCustomEvent, trackFeatureClick } = useRVLifeTracking({
    pageName: 'rv-life-pro-campgrounds',
    trackScrollDepth: true,
    trackTimeOnPage: true,
    scrollThresholds: [25, 50, 75, 90, 100],
  });

  // Handle CTA clicks with tracking
  const handleCTAClick = (location: string) => {
    trackCTAClick(`Campgrounds Page CTA - ${location}`, location);
  };

  return (
    <Layout>
    <>
      {/* SEO and Schema Markup */}
      <Helmet>
        <title>14,000+ RV-Friendly Campgrounds Database | RV Life Pro Australia</title>
        <meta
          name="description"
          content="Explore RV Life Pro's comprehensive database of 14,000+ RV-friendly campgrounds across Australia, USA, Canada, and New Zealand. Verified reviews, photos, and detailed information to find your perfect camping spot."
        />
        <meta name="keywords" content="RV campgrounds Australia, caravan parks database, camping locations, RV sites, campground reviews, RV Life Pro database" />
        <link rel="canonical" href="https://smartrvportal.com/rv-life-pro/campgrounds" />

        {/* Open Graph */}
        <meta property="og:title" content="14,000+ RV-Friendly Campgrounds at Your Fingertips" />
        <meta property="og:description" content="Discover the most comprehensive RV campground database in Australia. Find your perfect camping spot with verified reviews, photos, and detailed amenity information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartrvportal.com/rv-life-pro/campgrounds" />

        {/* Schema Markup - Product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "RV Life Pro",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "iOS, Android",
            "description": "Comprehensive RV campground database with 14,000+ locations across Australia and internationally",
            "offers": {
              "@type": "Offer",
              "price": "65",
              "priceCurrency": "AUD",
              "priceValidUntil": "2026-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "4100"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[var(--rv-life-off-white)] via-white to-[var(--rv-life-light-bg)]">

        {/* SECTION 1: HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] py-20 md:py-32">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8">
                <Database className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
                <span className="font-bold text-[var(--rv-text-primary)]">AUSTRALIA'S LARGEST RV DATABASE</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                14,000+ RV-Friendly Campgrounds
                <br />
                <span className="text-yellow-300">at Your Fingertips</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                The most comprehensive campground database in Australia. Find your perfect spot with verified reviews, detailed amenities, and real photos from fellow RVers.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">14,000+</div>
                  <div className="text-sm md:text-base text-white/80">Campgrounds</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">50,000+</div>
                  <div className="text-sm md:text-base text-white/80">Verified Reviews</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">100,000+</div>
                  <div className="text-sm md:text-base text-white/80">Photos</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">Weekly</div>
                  <div className="text-sm md:text-base text-white/80">Updates</div>
                </motion.div>
              </div>

              {/* Primary CTA */}
              <RVLifeAffiliateLink
                campaign="campgrounds-hero"
                buttonText="Explore 14,000+ Campgrounds Free"
                variant="secondary"
                size="lg"
                trackingLabel="Hero CTA"
                showDiscountTooltip={true}
                onClick={() => handleCTAClick('hero')}
                className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100 text-lg px-8 py-4"
              />
              <p className="text-sm text-white/70 mt-4">
                14-day free trial • No credit card required
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: DATABASE OVERVIEW */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--rv-life-primary-blue)] bg-opacity-10 border-2 border-[var(--rv-life-primary-blue)] rounded-full mb-6"
              >
                <TrendingUp className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
                <span className="font-bold text-[var(--rv-life-primary-blue)]">COMPREHENSIVE COVERAGE</span>
              </motion.div>

              <h2 className="rv-headline-primary mb-4">
                The Numbers Behind the Database
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                More than just a list of campgrounds. A living, breathing database updated by a community of 47,000+ active RV users.
              </p>
            </div>

            {/* Statistics Dashboard */}
            <RVLifeCardGrid columns={3} className="mb-16">
              <RVLifeStatCard
                stat="14,000+"
                label="Total Campgrounds Across Australia, USA, Canada & NZ"
                icon={<MapPin className="w-8 h-8" />}
                delay={0}
              />
              <RVLifeStatCard
                stat="50,000+"
                label="Verified Reviews from Real RV Owners"
                icon={<Star className="w-8 h-8" />}
                delay={0.1}
              />
              <RVLifeStatCard
                stat="100,000+"
                label="User-Submitted Photos of Actual Sites"
                icon={<Camera className="w-8 h-8" />}
                delay={0.2}
              />
              <RVLifeStatCard
                stat="Weekly"
                label="Database Updates with New Locations"
                icon={<RefreshCw className="w-8 h-8" />}
                delay={0.3}
              />
              <RVLifeStatCard
                stat="4 Countries"
                label="Australia, USA, Canada, New Zealand"
                icon={<Globe className="w-8 h-8" />}
                delay={0.4}
              />
              <RVLifeStatCard
                stat="47,000+"
                label="Active Community Members Contributing"
                icon={<Users className="w-8 h-8" />}
                delay={0.5}
              />
            </RVLifeCardGrid>

            {/* Coverage Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <RVLifeCard
                headline="Where We Cover"
                body={
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                        <MapPinned className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                        Australia Coverage
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>Queensland: 3,200+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>New South Wales: 2,800+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>Victoria: 1,900+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>Western Australia: 1,600+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>South Australia: 1,100+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>Tasmania: 800+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                          <span>Northern Territory: 600+ campgrounds</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
                        International Coverage
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-primary-blue)]" />
                          <span>USA: 2,500+ RV parks & campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-primary-blue)]" />
                          <span>Canada: 1,200+ locations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-primary-blue)]" />
                          <span>New Zealand: 800+ campgrounds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-primary-blue)]" />
                          <span>Popular tourist routes fully covered</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--rv-life-primary-blue)]" />
                          <span>Remote and off-grid locations included</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
                delay={0}
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE MAP SECTION (Placeholder) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Visualise Campground Coverage
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                See how comprehensive our database is. Every dot represents a verified campground location with detailed information.
              </p>
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto mb-12"
            >
              <div className="rv-card-base overflow-hidden">
                {/* Interactive Map Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 relative flex items-center justify-center">
                  {/* Map background illustration */}
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 800 600" className="w-full h-full">
                      {/* Simplified Australia shape */}
                      <path
                        d="M 150 150 Q 200 100 300 120 T 500 180 Q 600 220 650 300 T 620 450 Q 580 500 450 480 T 250 420 Q 150 350 150 150 Z"
                        fill="currentColor"
                        className="text-[var(--rv-life-primary-blue)]"
                      />
                      {/* Campground marker dots */}
                      {[...Array(50)].map((_, i) => (
                        <circle
                          key={i}
                          cx={Math.random() * 500 + 150}
                          cy={Math.random() * 400 + 150}
                          r="3"
                          fill="currentColor"
                          className="text-[var(--rv-life-accent-orange)]"
                          opacity="0.6"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Overlay content */}
                  <div className="relative z-10 text-center p-8">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-[var(--rv-life-primary-blue)]" />
                    <h3 className="text-2xl font-bold mb-3 text-[var(--rv-text-primary)]">
                      Interactive Map in App
                    </h3>
                    <p className="text-[var(--rv-text-secondary)] mb-6 max-w-md mx-auto">
                      Zoom, pan, and explore campgrounds by region. Filter by amenities, ratings, and availability in real-time.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm">
                        <CircleDot className="w-4 h-4 text-[var(--rv-life-accent-orange)]" />
                        Clustering markers
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm">
                        <Layers className="w-4 h-4 text-[var(--rv-life-primary-blue)]" />
                        Multiple map layers
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm">
                        <Filter className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        Advanced filtering
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map controls preview */}
                <div className="p-6 bg-[var(--rv-life-light-bg)] border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      onClick={() => trackFeatureClick('map-preview', 'zoom')}
                    >
                      <Compass className="w-4 h-4" />
                      <span className="text-sm font-medium">Zoom & Pan</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      onClick={() => trackFeatureClick('map-preview', 'filter')}
                    >
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">Filter Results</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      onClick={() => trackFeatureClick('map-preview', 'regions')}
                    >
                      <MapPinned className="w-4 h-4" />
                      <span className="text-sm font-medium">Explore Regions</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <RVLifeIconCard
                icon={<Gauge className="w-8 h-8" />}
                title="Real-Time Data"
                description="Live updates on campground availability, pricing, and conditions"
                iconColor="var(--rv-life-primary-blue)"
                delay={0}
              />
              <RVLifeIconCard
                icon={<Navigation className="w-8 h-8" />}
                title="Route Planning"
                description="Plan multi-stop journeys and find campgrounds along your route"
                iconColor="var(--rv-life-secondary-green)"
                delay={0.1}
              />
              <RVLifeIconCard
                icon={<Heart className="w-8 h-8" />}
                title="Save Favourites"
                description="Bookmark campgrounds and create custom trip lists"
                iconColor="var(--rv-life-accent-orange)"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: SEARCH & FILTER SHOWCASE */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Find Your Perfect Campground in Seconds
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Powerful search and filtering capabilities make it easy to find exactly what you're looking for. No more endless scrolling through unsuitable options.
              </p>
            </div>

            {/* Search Interface Demo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="rv-card-base p-8">
                {/* Search Bar Demo */}
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by location, name, or region..."
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:border-[var(--rv-life-primary-blue)] transition-colors"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-[var(--rv-text-muted)] mt-2 text-center">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    Demo interface - Full functionality available in app
                  </p>
                </div>

                {/* Filter Categories */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Location Filters */}
                  <div>
                    <h4 className="font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
                      Location
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>City / Region</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Proximity (radius search)</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Along route</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Remote / Urban</span>
                      </li>
                    </ul>
                  </div>

                  {/* Amenity Filters */}
                  <div>
                    <h4 className="font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[var(--rv-life-accent-orange)]" />
                      Amenities
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>WiFi quality rating</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Power hookups</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Water availability</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Dump station</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Pet-friendly</span>
                      </li>
                    </ul>
                  </div>

                  {/* RV & Rating Filters */}
                  <div>
                    <h4 className="font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                      <Star className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                      RV Size & Ratings
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>RV length capacity</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Slide-out friendly</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>4+ star ratings</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Verified reviews only</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Check className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                        <span>Price range</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold mb-4 text-[var(--rv-text-primary)]">
                    Advanced Filters
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Family-friendly',
                      'WiFi for remote work',
                      'Beach access',
                      'Mountain views',
                      'Dog-friendly',
                      'Big rig friendly',
                      'Budget camping',
                      'Luxury resorts',
                      'Free camping',
                      'Seasonal availability',
                      'Event camping',
                      'Good phone reception'
                    ].map((filter, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--rv-life-light-bg)] rounded-full text-xs font-medium text-[var(--rv-text-secondary)] border border-gray-200"
                      >
                        <Filter className="w-3 h-3" />
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How Easy It Is */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="rv-card-base p-8 bg-gradient-to-br from-green-50 to-blue-50">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[var(--rv-life-secondary-green)]" />
                <h3 className="text-2xl font-bold mb-3 text-[var(--rv-text-primary)]">
                  Finding Your Perfect Campground is This Easy
                </h3>
                <p className="rv-body-large text-[var(--rv-text-secondary)] mb-6">
                  Enter your location, apply 2-3 filters, and get a curated list of campgrounds that meet your exact needs. No more wasting hours researching options that won't work for your RV.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-[var(--rv-life-primary-blue)]" />
                  <span className="font-semibold">Average search time: Under 2 minutes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: SAMPLE CAMPGROUND PROFILES */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Detailed Campground Profiles
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Every campground listing includes comprehensive information, real photos, verified reviews, and detailed amenity breakdowns.
              </p>
            </div>

            {/* Sample Campground Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
              {SAMPLE_CAMPGROUNDS.slice(0, 3).map((campground, index) => (
                <motion.div
                  key={campground.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rv-card-base overflow-hidden rv-lift-hover cursor-pointer"
                  onClick={() => {
                    setSelectedCampground(campground.id);
                    trackCustomEvent('campground_card_clicked', { campgroundId: campground.id });
                  }}
                >
                  {/* Photo Gallery Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      {campground.photoCount} photos
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating & RV Friendly Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-4 h-4',
                              i < Math.floor(campground.rating)
                                ? 'fill-[var(--rv-life-accent-orange)] text-[var(--rv-life-accent-orange)]'
                                : 'fill-gray-200 text-gray-200'
                            )}
                          />
                        ))}
                        <span className="ml-2 font-bold text-sm">{campground.rating}</span>
                        <span className="text-xs text-[var(--rv-text-muted)] ml-1">
                          ({campground.reviewCount})
                        </span>
                      </div>
                      {campground.rvFriendly && (
                        <span className="px-2 py-1 bg-[var(--rv-life-secondary-green)] bg-opacity-10 text-[var(--rv-life-secondary-green)] text-xs font-semibold rounded">
                          RV Friendly
                        </span>
                      )}
                    </div>

                    {/* Name & Location */}
                    <h3 className="text-xl font-bold mb-2 text-[var(--rv-text-primary)]">
                      {campground.name}
                    </h3>
                    <p className="text-sm text-[var(--rv-text-muted)] mb-4 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {campground.location}
                    </p>

                    {/* Price Range */}
                    <div className="mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                      <span className="font-bold text-[var(--rv-text-primary)]">{campground.priceRange}</span>
                    </div>

                    {/* Amenities Icons */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {campground.amenities.slice(0, 4).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--rv-life-light-bg)] rounded text-xs text-[var(--rv-text-secondary)]"
                          >
                            {amenity.includes('WiFi') && <Wifi className="w-3 h-3" />}
                            {amenity.includes('Power') && <Zap className="w-3 h-3" />}
                            {amenity.includes('Water') && <Droplet className="w-3 h-3" />}
                            {amenity.includes('Pet') && <Heart className="w-3 h-3" />}
                            {amenity}
                          </span>
                        ))}
                        {campground.amenities.length > 4 && (
                          <span className="inline-flex items-center px-2 py-1 text-xs text-[var(--rv-text-muted)]">
                            +{campground.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {campground.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-[var(--rv-text-secondary)]"
                          >
                            • {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View in App CTA */}
                    <button
                      className="w-full py-2 px-4 bg-[var(--rv-life-primary-blue)] text-white rounded-lg font-semibold hover:bg-[var(--rv-life-primary-blue)]/90 transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCTAClick(`campground-card-${campground.id}`);
                      }}
                    >
                      View Full Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fourth Sample - Expanded View */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              {SAMPLE_CAMPGROUNDS[3] && (
                <div className="rv-card-base overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                    {/* Left: Image Gallery */}
                    <div>
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 relative flex items-center justify-center">
                        <Mountain className="w-16 h-16 text-gray-400" />
                        <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          {SAMPLE_CAMPGROUNDS[3].photoCount} photos
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="aspect-video bg-gray-200 rounded flex items-center justify-center"
                          >
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-5 h-5',
                                i < Math.floor(SAMPLE_CAMPGROUNDS[3].rating)
                                  ? 'fill-[var(--rv-life-accent-orange)] text-[var(--rv-life-accent-orange)]'
                                  : 'fill-gray-200 text-gray-200'
                              )}
                            />
                          ))}
                          <span className="ml-2 font-bold">{SAMPLE_CAMPGROUNDS[3].rating}</span>
                        </div>
                        <span className="text-sm text-[var(--rv-text-muted)]">
                          ({SAMPLE_CAMPGROUNDS[3].reviewCount} reviews)
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--rv-text-primary)]">
                        {SAMPLE_CAMPGROUNDS[3].name}
                      </h3>
                      <p className="text-[var(--rv-text-muted)] mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {SAMPLE_CAMPGROUNDS[3].location}
                      </p>

                      <div className="mb-6 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-[var(--rv-life-secondary-green)]" />
                        <span className="font-bold text-xl text-[var(--rv-text-primary)]">
                          {SAMPLE_CAMPGROUNDS[3].priceRange}
                        </span>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold mb-3 text-[var(--rv-text-primary)]">All Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {SAMPLE_CAMPGROUNDS[3].amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold mb-3 text-[var(--rv-text-primary)]">Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {SAMPLE_CAMPGROUNDS[3].highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[var(--rv-life-primary-blue)] bg-opacity-10 text-[var(--rv-life-primary-blue)] rounded-full text-sm font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full py-3 px-6 bg-[var(--rv-life-primary-blue)] text-white rounded-lg font-semibold hover:bg-[var(--rv-life-primary-blue)]/90 transition-colors flex items-center justify-center gap-2">
                          <Eye className="w-5 h-5" />
                          View Full Profile in App
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-2 px-4 border-2 border-[var(--rv-life-primary-blue)] text-[var(--rv-life-primary-blue)] rounded-lg font-semibold hover:bg-[var(--rv-life-primary-blue)] hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Call
                          </button>
                          <button className="py-2 px-4 border-2 border-[var(--rv-life-primary-blue)] text-[var(--rv-life-primary-blue)] rounded-lg font-semibold hover:bg-[var(--rv-life-primary-blue)] hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Navigation className="w-4 h-4" />
                            Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: REVIEW SYSTEM SHOWCASE (No Fake Reviews) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Community-Powered Review System
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Our review system is built on trust and verification. Real RVers sharing real experiences to help the community.
              </p>
            </div>

            {/* How Reviews Work */}
            <div className="max-w-5xl mx-auto mb-16">
              <RVLifeCard
                headline="How Our Review System Works"
                body={
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left: Review Process */}
                      <div>
                        <h4 className="font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                          <Shield className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                          Verification Process
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-8 h-8 flex-shrink-0 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--rv-life-primary-blue)] font-bold text-sm">
                              1
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--rv-text-primary)]">Verified Stay Required</p>
                              <p className="text-sm text-[var(--rv-text-muted)]">Reviews only from users who checked in at location</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-8 h-8 flex-shrink-0 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--rv-life-primary-blue)] font-bold text-sm">
                              2
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--rv-text-primary)]">Photo Submissions</p>
                              <p className="text-sm text-[var(--rv-text-muted)]">Encouraged to upload actual photos from visit</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-8 h-8 flex-shrink-0 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--rv-life-primary-blue)] font-bold text-sm">
                              3
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--rv-text-primary)]">Community Moderation</p>
                              <p className="text-sm text-[var(--rv-text-muted)]">Users can flag suspicious or unhelpful reviews</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-8 h-8 flex-shrink-0 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--rv-life-primary-blue)] font-bold text-sm">
                              4
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--rv-text-primary)]">Manual Review</p>
                              <p className="text-sm text-[var(--rv-text-muted)]">Team reviews flagged content for accuracy</p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Right: Review Features */}
                      <div>
                        <h4 className="font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                          <Star className="w-5 h-5 text-[var(--rv-life-accent-orange)]" />
                          Review Features
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Star ratings for overall experience</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Detailed ratings: Cleanliness, amenities, value, location</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Written reviews with context</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Photo uploads from actual visits</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">RV size and type context</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Season/time of visit noted</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm">Helpful badges from community votes</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Review Quality Indicators */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h4 className="font-bold mb-4 text-[var(--rv-text-primary)] text-center">
                        Quality Indicators
                      </h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--rv-life-secondary-green)] bg-opacity-10 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-[var(--rv-life-secondary-green)]" />
                          <span className="text-sm font-semibold">Verified Stay</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
                          <Camera className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-semibold">Photos Included</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                          <ThumbsUp className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-semibold">Helpful (50+ votes)</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-lg">
                          <Award className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-semibold">Detailed Review</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-lg">
                          <Users className="w-5 h-5 text-pink-600" />
                          <span className="text-sm font-semibold">Experienced Reviewer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                delay={0}
              />
            </div>

            {/* Community Contributions */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <RVLifeIconCard
                icon={<MessageCircle className="w-8 h-8" />}
                title="50,000+ Reviews"
                description="Real experiences from verified RV owners who actually stayed at locations"
                iconColor="var(--rv-life-primary-blue)"
                delay={0}
              />
              <RVLifeIconCard
                icon={<Camera className="w-8 h-8" />}
                title="100,000+ Photos"
                description="User-submitted photos showing actual site conditions and amenities"
                iconColor="var(--rv-life-secondary-green)"
                delay={0.1}
              />
              <RVLifeIconCard
                icon={<ThumbsUp className="w-8 h-8" />}
                title="Community Voted"
                description="Most helpful reviews rise to the top through community engagement"
                iconColor="var(--rv-life-accent-orange)"
                delay={0.2}
              />
            </div>

            {/* Important Note - No Fake Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="rv-card-base p-6 bg-blue-50 border-2 border-[var(--rv-life-primary-blue)] border-opacity-20">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[var(--rv-text-primary)] mb-2">About Our Review System</h4>
                    <p className="text-sm text-[var(--rv-text-secondary)] leading-relaxed mb-3">
                      This page demonstrates HOW our review system works. We don't create fake testimonials or fabricated reviews. All reviews in the actual app are from real RV Life Pro users who stayed at campgrounds.
                    </p>
                    <p className="text-sm text-[var(--rv-text-secondary)] leading-relaxed">
                      To read authentic user reviews, download the app or visit trusted review platforms like the App Store, Google Play, and Trustpilot.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: DATABASE COMPARISON */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                How We Compare to the Competition
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Not all campground databases are created equal. See why RV Life Pro has become the trusted choice for Australian RV owners.
              </p>
            </div>

            {/* Comparison Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="rv-card-base p-8">
                <div className="space-y-6">
                  {/* RV Life Pro */}
                  <div className="flex items-center gap-4">
                    <div className="w-48 font-bold text-[var(--rv-text-primary)]">
                      RV Life Pro
                    </div>
                    <div className="flex-1 relative">
                      <div className="h-12 bg-gradient-to-r from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] rounded-lg flex items-center justify-end pr-4 text-white font-bold" style={{width: '100%'}}>
                        14,000+ campgrounds
                      </div>
                    </div>
                  </div>

                  {/* Competitor A */}
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-[var(--rv-text-secondary)]">
                      Competitor A
                    </div>
                    <div className="flex-1 relative">
                      <div className="h-10 bg-gray-400 rounded-lg flex items-center justify-end pr-4 text-white font-semibold" style={{width: '71%'}}>
                        ~10,000
                      </div>
                    </div>
                  </div>

                  {/* Competitor B */}
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-[var(--rv-text-secondary)]">
                      Competitor B
                    </div>
                    <div className="flex-1 relative">
                      <div className="h-10 bg-gray-400 rounded-lg flex items-center justify-end pr-4 text-white font-semibold" style={{width: '57%'}}>
                        ~8,000
                      </div>
                    </div>
                  </div>

                  {/* Free Apps */}
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-[var(--rv-text-secondary)]">
                      Free Apps
                    </div>
                    <div className="flex-1 relative">
                      <div className="h-10 bg-gray-300 rounded-lg flex items-center justify-end pr-4 text-gray-600 font-semibold italic" style={{width: '35%'}}>
                        Inconsistent
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-[var(--rv-text-muted)]">
                    <strong className="text-[var(--rv-text-primary)]">More than just quantity:</strong> Our database includes comprehensive verification, regular updates, and detailed information that free apps and competitors simply can't match.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quality Comparison */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rv-card-base p-6 bg-gradient-to-br from-red-50 to-orange-50"
              >
                <h3 className="text-xl font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                  <X className="w-6 h-6 text-[var(--rv-life-warning-red)]" />
                  Free Apps & Competitors
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Outdated information, not regularly maintained</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Limited or unverified reviews</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Missing remote and regional locations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Incomplete amenity information</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>No RV specific details (size, hookups)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Poor photo coverage</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rv-card-base p-6 bg-gradient-to-br from-green-50 to-blue-50"
              >
                <h3 className="text-xl font-bold mb-4 text-[var(--rv-text-primary)] flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[var(--rv-life-secondary-green)]" />
                  RV Life Pro
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                    <span>Weekly updates from 47,000+ active users</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                    <span>50,000+ verified reviews with photos</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                    <span>Comprehensive coverage including remote areas</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                    <span>Detailed amenity breakdown for every location</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                    <span>RV specific information (size, power, access)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                    <span>100,000+ real photos from actual visitors</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 8: UPDATE FREQUENCY & DATABASE MAINTENANCE */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Always Current, Always Accurate
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                A database is only as good as its freshness. We're committed to keeping information current through community contributions and dedicated maintenance.
              </p>
            </div>

            {/* Update Process */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-8">
                <RVLifeCard
                  icon={<RefreshCw />}
                  iconBgColor="var(--rv-life-primary-blue)"
                  headline="Weekly Database Updates"
                  body={
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-0.5" />
                        <span>New campgrounds added from community submissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-0.5" />
                        <span>Pricing and amenity updates verified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-0.5" />
                        <span>Closed or changed locations flagged</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[var(--rv-life-primary-blue)] flex-shrink-0 mt-0.5" />
                        <span>Review moderation and spam removal</span>
                      </li>
                    </ul>
                  }
                  delay={0}
                />

                <RVLifeCard
                  icon={<Users />}
                  iconBgColor="var(--rv-life-secondary-green)"
                  headline="Community-Driven Improvements"
                  body={
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                        <span>47,000+ users reporting changes and updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                        <span>Photo submissions showing current conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                        <span>Real-time amenity status updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[var(--rv-life-secondary-green)] flex-shrink-0 mt-0.5" />
                        <span>Seasonal information from recent visitors</span>
                      </li>
                    </ul>
                  }
                  delay={0.2}
                />
              </div>
            </div>

            {/* Quality Stats */}
            <RVLifeCardGrid columns={4} className="mb-12">
              <RVLifeStatCard
                stat="Weekly"
                label="Database Updates"
                icon={<RefreshCw className="w-8 h-8" />}
                delay={0}
              />
              <RVLifeStatCard
                stat="300+"
                label="New Campgrounds Added Monthly"
                icon={<MapPin className="w-8 h-8" />}
                delay={0.1}
              />
              <RVLifeStatCard
                stat="24hrs"
                label="Review Moderation Response Time"
                icon={<Clock className="w-8 h-8" />}
                delay={0.2}
              />
              <RVLifeStatCard
                stat="99.8%"
                label="Information Accuracy Rate"
                icon={<CheckCircle className="w-8 h-8" />}
                delay={0.3}
              />
            </RVLifeCardGrid>

            {/* How You Can Contribute */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="rv-card-base p-8 bg-gradient-to-br from-blue-50 to-green-50">
                <h3 className="text-2xl font-bold mb-6 text-center text-[var(--rv-text-primary)]">
                  You're Part of the Solution
                </h3>
                <p className="text-center text-[var(--rv-text-secondary)] mb-8">
                  Every RV Life Pro user contributes to making the database better for everyone. Here's how you help:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-[var(--rv-life-primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-[var(--rv-life-primary-blue)]" />
                    </div>
                    <h4 className="font-bold mb-2 text-[var(--rv-text-primary)]">Add Locations</h4>
                    <p className="text-sm text-[var(--rv-text-secondary)]">Found a great spot not in our database? Add it in seconds.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-[var(--rv-life-secondary-green)] bg-opacity-10 rounded-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-[var(--rv-life-secondary-green)]" />
                    </div>
                    <h4 className="font-bold mb-2 text-[var(--rv-text-primary)]">Leave Reviews</h4>
                    <p className="text-sm text-[var(--rv-text-secondary)]">Share your experience to help fellow RVers make informed choices.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-[var(--rv-life-accent-orange)] bg-opacity-10 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-[var(--rv-life-accent-orange)]" />
                    </div>
                    <h4 className="font-bold mb-2 text-[var(--rv-text-primary)]">Upload Photos</h4>
                    <p className="text-sm text-[var(--rv-text-secondary)]">Show others what the campground really looks like.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9: USE CASES */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--rv-life-light-bg)] to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="rv-headline-primary mb-4">
                Perfect for Every Type of RV Adventure
              </h2>
              <p className="rv-body-large text-[var(--rv-text-muted)] max-w-3xl mx-auto">
                Whether you're planning a weekend escape or a cross country odyssey, our database has you covered.
              </p>
            </div>

            {/* Use Case Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Weekend Getaway */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rv-card-base p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                    <Sun className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[var(--rv-text-primary)]">
                      Weekend Getaway
                    </h3>
                    <p className="text-sm text-[var(--rv-text-muted)]">Quick escapes near the city</p>
                  </div>
                </div>
                <p className="mb-6 text-[var(--rv-text-secondary)]">
                  Search campgrounds within 2 hours of your location, filter for powered sites and family amenities, and book your perfect weekend spot in minutes.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Proximity search finds nearby options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>See availability for this weekend</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Filter by kid-friendly amenities</span>
                  </li>
                </ul>
              </motion.div>

              {/* Cross-Country Trip */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rv-card-base p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white">
                    <Compass className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[var(--rv-text-primary)]">
                      Cross-Country Trip
                    </h3>
                    <p className="text-sm text-[var(--rv-text-muted)]">Multi-stop epic journeys</p>
                  </div>
                </div>
                <p className="mb-6 text-[var(--rv-text-secondary)]">
                  Plan your entire route with overnight stops every 3-4 hours. Find campgrounds along your exact path and save your favourites to a custom trip list.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Route-based search shows stops along journey</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Multi-day trip planning tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Save favourites and build custom lists</span>
                  </li>
                </ul>
              </motion.div>

              {/* Full-Time Living */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rv-card-base p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[var(--rv-text-primary)]">
                      Full-Time Living
                    </h3>
                    <p className="text-sm text-[var(--rv-text-muted)]">Seasonal migration planning</p>
                  </div>
                </div>
                <p className="mb-6 text-[var(--rv-text-secondary)]">
                  Plan your annual migration route, find long-term stay options, and track seasonal pricing. Perfect for grey nomads living the dream.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Filter by long-term stay availability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>See seasonal pricing trends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Track your favourite winter/summer spots</span>
                  </li>
                </ul>
              </motion.div>

              {/* Remote Work */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rv-card-base p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                    <Wifi className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[var(--rv-text-primary)]">
                      Remote Work Setup
                    </h3>
                    <p className="text-sm text-[var(--rv-text-muted)]">Digital nomad essentials</p>
                  </div>
                </div>
                <p className="mb-6 text-[var(--rv-text-secondary)]">
                  Filter specifically for high-quality WiFi and mobile reception. Find workation spots with the connectivity you need to stay productive.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>WiFi quality ratings from real users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Mobile reception information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--rv-life-secondary-green)]" />
                    <span>Quiet, professional work environment tags</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 10: TRUST & ACCURACY */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <TrustSignals layout="grid" showLinks={true} className="mb-16" />
          </div>
        </section>

        {/* SECTION 11: FINAL CTA SECTION */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--rv-life-primary-blue)] to-[var(--rv-life-secondary-green)] text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Explore 14,000+ Campgrounds
                  <br />
                  Risk-Free
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                  Start your 14-day free trial today. No credit card required. Cancel anytime. Join 47,000+ Australian RV owners who trust RV Life Pro for their adventures.
                </p>
              </div>

              {/* Key benefits reminder */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Database className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">14,000+ Locations</h3>
                  <p className="text-sm text-white/80">Most comprehensive database in Australia</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Star className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">50,000+ Reviews</h3>
                  <p className="text-sm text-white/80">Verified experiences from real RVers</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <RefreshCw className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Weekly Updates</h3>
                  <p className="text-sm text-white/80">Always current, always accurate</p>
                </div>
              </div>

              {/* Strong CTA */}
              <div className="space-y-6">
                <RVLifeAffiliateLink
                  campaign="campgrounds-final-cta"
                  buttonText="Start Exploring Campgrounds Free"
                  variant="secondary"
                  size="lg"
                  trackingLabel="Final CTA"
                  showDiscountTooltip={true}
                  onClick={() => handleCTAClick('final-cta')}
                  className="bg-white text-[var(--rv-life-primary-blue)] hover:bg-gray-100 text-lg px-8 py-6"
                />

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>

                {/* Discount Code Box */}
                <div className="max-w-2xl mx-auto mt-8">
                  <DiscountCodeBox
                    codeType="standard"
                    showUrgency={true}
                    location="campgrounds-final"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exit Intent Modal */}
        <ExitIntentModal
          disabled={false}
          initialDelay={5000}
          expiryDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
        />
      </div>
    </>

    </Layout>
  );
};

export default RVLifeProCampgrounds;
