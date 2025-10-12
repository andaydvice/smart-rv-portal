import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import SEO from "@/components/seo/SEO";
import { organizationSchema } from "@/components/seo/schemas";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";

const Products = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const canonical = typeof window !== 'undefined' ? window.location.origin + "/products" : '';

  const productSchemas = [] as const;

  return (
    <Layout>
      <SEO
        title="RV Products & Services | Smart RV Portal"
        description="Discover premium RV products and services for your smart RV lifestyle. From rentals to technology upgrades, find everything you need."
        keywords="RV rentals, RV marketplace, mobile internet, solar kits, RV accessories, digital nomad gear, RV services"
        canonical={canonical}
        ogImage="/lovable-uploads/e2566d0d-bbd0-4401-9293-2d105eea8105.png"
        ogImageAlt="Smart RV dealership with premium technology solutions"
        structuredData={[
          organizationSchema,
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
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
            Welcome to our curated marketplace of premium RV products and services. 
          </motion.p>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-white/70 text-center mb-16 max-w-3xl mx-auto"
          >
            From cutting-edge technology solutions to essential travel gear, we've partnered with trusted brands to bring you the best in RV innovation.
          </motion.p>

          {/* Product Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Technology Solutions</h3>
              <p className="text-gray-300 mb-6">
                Smart systems, connectivity solutions, and automation technology for modern RVs.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Smart monitoring systems</li>
                <li>• Internet connectivity</li>
                <li>• Security solutions</li>
                <li>• Power management</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Essential Gear</h3>
              <p className="text-gray-300 mb-6">
                High quality accessories and equipment for comfort, safety, and convenience.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Solar power systems</li>
                <li>• Water filtration</li>
                <li>• Storage solutions</li>
                <li>• Safety equipment</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Services & Support</h3>
              <p className="text-gray-300 mb-6">
                Professional services, maintenance, and support for your RV lifestyle.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Professional installation</li>
                <li>• Maintenance services</li>
                <li>• Trip planning tools</li>
                <li>• Emergency support</li>
              </ul>
            </motion.div>
          </div>

          {/* Testimonials */}
          <TestimonialsSection />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Products;