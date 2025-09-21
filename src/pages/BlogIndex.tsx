
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Layout from '../components/layout/Layout';
import BlogHeader from '../components/blog/BlogHeader';
import TrendingPosts from '../components/blog/TrendingPosts';
import FeaturedCategories from '../components/blog/FeaturedCategories';
import NewsletterSection from '../components/blog/NewsletterSection';
import BlogGrid from '../components/blog/BlogGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Container } from '@/components/ui/container';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');

  const handleCategoryChange = (category: 'all' | 'tech' | 'travel') => {
    console.log("Category changed to:", category);
    setActiveCategory(category);
  };

  return (
    <Layout>
      <ScrollArea className="h-full w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full px-4 py-10">
            <Container>
              <BlogHeader />
              
              <div className="mt-16">
                <TrendingPosts 
                  activeCategory={activeCategory} 
                  onCategoryChange={handleCategoryChange} 
                />
              </div>
              
              <div className="mt-16">
                <FeaturedCategories />
              </div>
              
              <div className="mt-16">
                <BlogGrid activeCategory={activeCategory} />
              </div>
              
              {/* Affiliate sections removed during cleanup */}
              
              <div className="mt-16">
                <NewsletterSection />
              </div>
              
              <AffiliateDisclosure className="mt-8" />
            </Container>
          </div>
        </motion.div>
      </ScrollArea>
    </Layout>
  );
};

export default BlogIndex;
