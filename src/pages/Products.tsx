
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from "react-helmet-async";
import { AFFILIATE_PARTNERS } from "@/components/affiliate/AffiliatePartnerSystem";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const Products = () => {
  useEffect(() => {
    console.log("Products page - Scrolling to top");
    scrollToTop();
  }, []);

  const affiliateProducts = [
    {
      title: "RV Rentals",
      description: "Compare and book premium RV rentals nationwide. Perfect for trying before buying or exploring new destinations.",
      badge: "Most Popular",
      features: ["Nationwide Network", "Insurance Included", "24/7 Support"],
      url: "https://rvshare.com/?ref=smartroadportal",
      buttonText: "Browse RV Rentals",
      savings: "Save up to $200 on first booking"
    },
    {
      title: "Smart RV Technology",
      description: "Upgrade your RV with cutting-edge smart technology, monitoring systems, and automation solutions.",
      badge: "Tech Essentials",
      features: ["Professional Installation", "Warranty Included", "Expert Support"],
      url: "https://technorv.com/?ref=smartroadportal",
      buttonText: "Shop TechnoRV",
      savings: "Free installation on orders $500+"
    },
    {
      title: "RV Services & Insurance",
      description: "Essential roadside assistance, insurance, and maintenance services every RV owner needs.",
      badge: "Peace of Mind",
      features: ["24/7 Roadside Assistance", "Nationwide Coverage", "Good Sam Partner"],
      url: "https://www.goodsam.com/?ref=smartroadportal",
      buttonText: "Get Good Sam",
      savings: "First month free with annual plan"
    },
    {
      title: "Water Filtration Systems",
      description: "Premium water filtration and purification systems for safe, clean water wherever you travel.",
      badge: "Health Essential",
      features: ["Clean Water Guarantee", "Easy Installation", "Multiple Filter Options"],
      url: "https://rvwaterfilterstore.com/?ref=smartroadportal",
      buttonText: "Shop Water Filters",
      savings: "20% off complete systems"
    },
    {
      title: "Luxury RV Experiences",
      description: "Book unique outdoor experiences and luxury RV rentals for premium adventures and glamping.",
      badge: "Luxury Choice",
      features: ["Luxury Selection", "Premium Service", "Unique Locations"],
      url: "https://outdoorsy.com/?ref=smartroadportal",
      buttonText: "Browse Outdoorsy",
      savings: "Exclusive luxury deals available"
    },
    {
      title: "Trip Planning Tools",
      description: "Professional RV trip planning tools, GPS navigation, and comprehensive campground guides.",
      badge: "Travel Smart",
      features: ["RV-Safe Routes", "Expert Reviews", "Offline Maps"],
      url: "https://rvlife.com/?ref=smartroadportal",
      buttonText: "Get RV Life",
      savings: "30-day free trial included"
    }
  ];

  const canonical = typeof window !== 'undefined' ? window.location.origin + "/products" : '';

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: affiliateProducts.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.title,
      url: p.url
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
      name: "Mobile Internet Connectivity",
      brand: { "@type": "Brand", name: AFFILIATE_PARTNERS.winegard?.name || "Winegard" },
      category: "Networking",
      description: "Stay connected on the road with RV internet connectivity solutions.",
      offers: {
        "@type": "Offer",
        url: `${AFFILIATE_PARTNERS.winegard?.baseUrl || "https://winegard.com"}?ref=${AFFILIATE_PARTNERS.winegard?.refCode || "smartconnect"}`,
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
      brand: { "@type": "Brand", name: AFFILIATE_PARTNERS.renogy.name },
      category: "SolarEnergy",
      description: "Complete solar kits designed for RVs to power your adventures off-grid.",
      offers: {
        "@type": "Offer",
        url: `${AFFILIATE_PARTNERS.renogy.baseUrl}?ref=${AFFILIATE_PARTNERS.renogy.refCode}`,
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
      <Helmet>
        <title>RV Marketplace | Top Deals on Rentals, Tech, Services</title>
        <meta name="description" content="Shop RV rentals, mobile internet, solar kits, and essential services from verified partners with exclusive savings." />
        <link rel="canonical" href={canonical || (typeof window !== 'undefined' ? window.location.href : '')} />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        {productSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>
      {/* Hero Image Section */}
      <div className="w-full h-[60vh] relative overflow-hidden">
        <img 
          src="/lovable-uploads/e2566d0d-bbd0-4401-9293-2d105eea8105.png"
          alt="Smart RV dealership aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4 image-overlay-headline">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {affiliateProducts.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-[#5B9BD5]/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{product.title}</h3>
                    <span className="px-3 py-1 bg-[#5B9BD5]/20 text-[#5B9BD5] text-sm font-medium rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  
                  <p className="text-white/80 mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-white/70 text-sm">
                          <div className="w-1.5 h-1.5 bg-[#5B9BD5] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                    <p className="text-green-400 text-sm font-medium">💸 {product.savings}</p>
                  </div>
                  
                  <a 
                    href={product.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="block w-full text-center bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105"
                  >
                    {product.buttonText} →
                  </a>
                </motion.div>
              ))}
            </div>
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
              className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-8 py-3 rounded-full font-medium transition-colors"
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
                  partner: 'technorv',
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
