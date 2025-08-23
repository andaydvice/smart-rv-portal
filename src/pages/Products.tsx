
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import SEO from "@/components/seo/SEO";
import { organizationSchema, productSchema } from "@/components/seo/schemas";
import { AFFILIATE_PARTNERS } from "@/components/affiliate/AffiliatePartnerSystem";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const Products = () => {
  useEffect(() => {
    
    scrollToTop();
  }, []);

  // Affiliate products now handled by OptimizedAffiliateGrid system for proper tracking
  const featuredAffiliatePartners = [
    {
      partner: 'rvshare' as const,
      title: 'RV Rentals',
      description: 'Compare and book premium RV rentals nationwide. Perfect for trying before buying or exploring new destinations.',
      features: ['Nationwide Network', 'Insurance Included', '24/7 Support'],
      buttonText: 'Browse RV Rentals'
    },
    {
      partner: 'rvlife' as const,
      title: 'Smart RV Technology',
      description: 'Upgrade your RV with cutting-edge smart technology, monitoring systems, and automation solutions.',
      features: ['Professional Installation', 'Warranty Included', 'Expert Support'],
      buttonText: 'Shop RV Life'
    },
    {
      partner: 'goodsam' as const,
      title: 'RV Services & Insurance',
      description: 'Essential roadside assistance, insurance, and maintenance services every RV owner needs.',
      features: ['24/7 Roadside Assistance', 'Nationwide Coverage', 'Good Sam Partner'],
      buttonText: 'Get Good Sam'
    },
    {
      partner: 'rvwaterfilter' as const,
      title: 'Water Filtration Systems',
      description: 'Premium water filtration and purification systems for safe, clean water wherever you travel.',
      features: ['Clean Water Guarantee', 'Easy Installation', 'Multiple Filter Options'],
      buttonText: 'Shop Water Filters'
    },
    {
      partner: 'outdoorsy' as const,
      title: 'Luxury RV Experiences',
      description: 'Book unique outdoor experiences and luxury RV rentals for premium adventures and glamping.',
      features: ['Luxury Selection', 'Premium Service', 'Unique Locations'],
      buttonText: 'Browse Outdoorsy'
    },
    {
      partner: 'rvlife' as const,
      title: 'Trip Planning Tools',
      description: 'Professional RV trip planning tools, GPS navigation, and comprehensive campground guides.',
      features: ['RV-Safe Routes', 'Expert Reviews', 'Offline Maps'],
      buttonText: 'Get RV Life'
    }
  ];

  const canonical = typeof window !== 'undefined' ? window.location.origin + "/products" : '';

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: featuredAffiliatePartners.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.title,
      url: `${AFFILIATE_PARTNERS[p.partner]?.baseUrl}?ref=${AFFILIATE_PARTNERS[p.partner]?.refCode}`
    }))
  } as const;

  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "RV Rentals",
      brand: { "@type": "Brand", name: AFFILIATE_PARTNERS.rvshare.name },
      category: "Recreational Vehicles",
      description: "Compare and book premium RV rentals nationwide.",
      offers: {
        "@type": "Offer",
        url: `${AFFILIATE_PARTNERS.rvshare.baseUrl}?ref=${AFFILIATE_PARTNERS.rvshare.refCode}`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      additionalProperty: [{
        "@type": "PropertyValue",
        name: "isAffiliateLink",
        value: true
      }]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Cellular Signal Boosters",
      brand: { "@type": "Brand", name: AFFILIATE_PARTNERS.weboost?.name || "WeBoost" },
      category: "Networking",
      description: "Stay connected on the road with professional cellular signal boosters.",
      offers: {
        "@type": "Offer",
        url: `${AFFILIATE_PARTNERS.weboost?.baseUrl || "https://weboost.com"}?ref=${AFFILIATE_PARTNERS.weboost?.refCode || "smartrv"}`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      additionalProperty: [{
        "@type": "PropertyValue",
        name: "isAffiliateLink",
        value: true
      }]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "RV Solar Kits",
      brand: { "@type": "Brand", name: AFFILIATE_PARTNERS.rvlife.name },
      category: "SolarEnergy",
      description: "Complete solar kits designed for RVs to power your adventures off-grid.",
      offers: {
        "@type": "Offer",
        url: `${AFFILIATE_PARTNERS.rvlife.baseUrl}?ref=${AFFILIATE_PARTNERS.rvlife.refCode}`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      additionalProperty: [{
        "@type": "PropertyValue",
        name: "isAffiliateLink",
        value: true
      }]
    }
  ] as const;

  return (
    <Layout>
      <SEO
        title="RV Marketplace | Top Deals on Rentals, Tech & Services"
        description="Shop premium RV rentals, mobile internet solutions, solar power kits, and essential services from verified partners. Exclusive savings and expert-tested products for smart RV living."
        keywords="RV rentals, RV marketplace, mobile internet, solar kits, RV accessories, digital nomad gear, RV services"
        canonical={canonical}
        ogImage="/lovable-uploads/e2566d0d-bbd0-4401-9293-2d105eea8105.png"
        ogImageAlt="Smart RV dealership with premium technology solutions"
        structuredData={[
          organizationSchema,
          itemListSchema,
          ...productSchemas
        ]}
      />
      {/* Hero Image Section */}
      <div className="w-full h-[60vh] relative overflow-hidden">
        <img 
          src="/lovable-uploads/e2566d0d-bbd0-4401-9293-2d105eea8105.png"
          alt="Smart RV dealership aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 image-overlay-headline">
              RV Marketplace
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
              Your trusted source for premium RV products, services, and exclusive deals
            </p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-[#080F1F] to-[#151A22]"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-white/80 text-center mb-4 max-w-3xl mx-auto"
          >
            Save money on essential RV products and services. Trusted partners with exclusive deals for smart RV enthusiasts.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
              <span className="text-green-400 font-semibold">💰 Exclusive savings available</span>
            </div>
          </motion.div>

          {/* Enhanced Affiliate Products Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-8"
          >            
            <OptimizedAffiliateGrid
              title="Featured RV Solutions"
              subtitle="Shop premium RV products and services from verified partners with exclusive savings and expert-tested quality."
              partners={featuredAffiliatePartners}
              gridCols="3"
              className="bg-transparent border-0"
            />
          </motion.div>

          <TestimonialsSection />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-20 bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Looking for personalized recommendations?</h2>
            <p className="text-white/90 text-lg mb-6">
              We curate the best RV gear and services based on real value and reliability so you can make confident choices faster.
            </p>
            <Link 
              to="/products"
              className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-8 py-3 rounded-full font-medium transition-colors min-h-[44px] touch-manipulation"
            >
              Explore Top Deals
            </Link>
          </motion.div>

          {/* Trusted RV Partners */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-20"
          >
            <OptimizedAffiliateGrid
              title="Complete RV Solution Partners"
              subtitle="Everything you need for the perfect RV experience - from rentals and technology to support and maintenance."
              partners={[
                {
                  partner: 'rvshare',
                  title: 'RV Rentals & Try Before You Buy',
                  description: 'Rent premium RVs nationwide or try different models before making your purchase decision.',
                  features: ['Nationwide Network', 'Insurance Included', 'Flexible Terms', 'Owner Support'],
                  buttonText: 'Browse RV Rentals'
                },
                {
                  partner: 'rvlife',
                  title: 'Smart RV Technology',
                  description: 'Upgrade your RV with cutting-edge technology, monitoring systems, and automation solutions.',
                  features: ['Smart Technology', 'Professional Installation', 'Expert Support', 'Warranty Coverage'],
                  buttonText: 'Shop Smart Tech'
                },
                {
                  partner: 'rvwaterfilter',
                  title: 'Water Filtration Systems',
                  description: 'Premium water filtration and purification systems for safe, clean water wherever you travel.',
                  features: ['Clean Water Guarantee', 'Easy Installation', 'Multiple Options', 'Health Safety'],
                  buttonText: 'Shop Water Systems'
                },
                {
                  partner: 'goodsam',
                  title: 'RV Services & Support',
                  description: 'Essential roadside assistance, insurance, and maintenance services every RV owner needs.',
                  features: ['24/7 Roadside Help', 'Insurance Options', 'Maintenance Support', 'Member Discounts'],
                  buttonText: 'Get Good Sam Protection'
                },
                {
                  partner: 'outdoorsy',
                  title: 'Luxury RV Experiences',
                  description: 'Book unique outdoor experiences and luxury RV rentals for premium adventures.',
                  features: ['Luxury Selection', 'Premium Service', 'Unique Locations', 'Concierge Support'],
                  buttonText: 'Explore Luxury Options'
                },
                {
                  partner: 'rvlife',
                  title: 'Trip Planning & Navigation',
                  description: 'Professional RV trip planning tools, GPS navigation, and comprehensive guides.',
                  features: ['RV-Safe Routes', 'Expert Reviews', 'Offline Maps', 'Community Support'],
                  buttonText: 'Plan Better Trips'
                }
              ]}
              gridCols="3"
            />
          </motion.div>
          <div className="px-4">
            <AffiliateDisclosure compact className="max-w-6xl mx-auto my-8" />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Products;
