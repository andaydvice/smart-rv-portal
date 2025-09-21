import React, { useEffect, lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/sections/ContactSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import SEO from "@/components/seo/SEO";
import { organizationSchema, websiteSchema } from "@/components/seo/schemas";
import { scrollToTop } from "@/utils/scrollToTop";

// Lazy load sections for better performance
const TechnologySection = lazy(() => import("@/components/sections/TechnologySection"));

const Index = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Smart RV Hub - Revolutionizing RV Travel"
        description="Experience cutting-edge smart RV technology with intelligent features, solar power systems, and advanced connectivity solutions for the ultimate RV lifestyle."
        keywords="smart RV, RV technology, solar power, RV automation, intelligent travel"
        canonical="/"
        structuredData={[organizationSchema, websiteSchema]}
      />

      <div className="space-y-0">
        {/* Hero Section */}
        <HeroSection />

        {/* Technology Section */}
        <Suspense fallback={<div className="min-h-[50vh] bg-gray-900" />}>
          <TechnologySection />
        </Suspense>

        {/* Featured Solutions */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 bg-gradient-to-br from-connectivity-darkBg to-[#0A0F1A]"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Essential Smart RV Solutions
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover the technology and services that make smart RV living effortless and enjoyable
              </p>
            </motion.div>

            <OptimizedAffiliateGrid
              title="Featured Smart RV Partners"
              subtitle="Trusted solutions for solar power, trip planning, and RV services"
              partners={[]}
              gridCols="3"
            />
          </div>
        </motion.section>

        {/* Contact Section */}
        <ContactSection />

        {/* Affiliate Disclosure */}
        <AffiliateDisclosure className="mx-4 mb-8" />
      </div>
    </Layout>
  );
};

export default Index;