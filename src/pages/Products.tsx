import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import SEO from "@/components/seo/SEO";
import { organizationSchema, productSchema } from "@/components/seo/schemas";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import { ExternalLinkButton } from "@/components/ui/external-link-button";

const Products = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Smart RV Products & Solutions"
        description="Discover the best Smart RV products, technology, and services. From solar power to internet connectivity, find everything you need for smart RV living."
        canonical="/products"
        structuredData={[organizationSchema, productSchema]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart RV Products & Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover premium RV products and services designed to enhance your smart RV lifestyle with cutting-edge technology and reliable solutions.
            </p>
          </motion.div>

          {/* Product Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-connectivity-accent mb-4">Solar Power</h3>
              <p className="text-gray-300 mb-6">Complete solar solutions for off-grid RV living</p>
              <ExternalLinkButton href="https://a1solarstore.com" className="w-full">
                Browse Solar Systems
              </ExternalLinkButton>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-connectivity-accent mb-4">RV Rentals</h3>
              <p className="text-gray-300 mb-6">Try before you buy with premium RV rentals</p>
              <ExternalLinkButton href="https://rvshare.com" className="w-full">
                Find RV Rentals
              </ExternalLinkButton>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-connectivity-accent mb-4">Trip Planning</h3>
              <p className="text-gray-300 mb-6">RV-safe navigation and comprehensive planning tools</p>
              <ExternalLinkButton href="https://rvlife.com" className="w-full">
                Get RV Life Pro
              </ExternalLinkButton>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-connectivity-accent mb-4">RV Services</h3>
              <p className="text-gray-300 mb-6">Roadside assistance and membership benefits</p>
              <ExternalLinkButton href="https://goodsam.com" className="w-full">
                Join Good Sam
              </ExternalLinkButton>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-connectivity-accent mb-4">RV Comfort</h3>
              <p className="text-gray-300 mb-6">Premium mattresses and bedding for RV living</p>
              <ExternalLinkButton href="https://brentwoodhome.com" className="w-full">
                Shop Comfort Products
              </ExternalLinkButton>
            </div>

            <div className="bg-connectivity-darkBg border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-connectivity-accent mb-4">Premium Rentals</h3>
              <p className="text-gray-300 mb-6">Luxury RV experiences with professional hosts</p>
              <ExternalLinkButton href="https://outdoorsy.com" className="w-full">
                Book Premium RVs
              </ExternalLinkButton>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center bg-connectivity-darkBg border border-gray-700 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Upgrade Your RV Experience?
            </h2>
            <p className="text-gray-300 mb-6">
              Explore our comprehensive guides and calculators to find the perfect solutions for your smart RV lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/solar-power-guide" 
                className="bg-connectivity-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Solar Power Guide
              </Link>
              <Link 
                to="/calculators" 
                className="border border-connectivity-accent text-connectivity-accent hover:bg-connectivity-accent hover:text-white px-6 py-3 rounded-lg transition-colors"
              >
                RV Calculators
              </Link>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16"
          >
            <TestimonialsSection />
          </motion.div>

        </div>
      </div>
    </Layout>
  );
};

export default Products;