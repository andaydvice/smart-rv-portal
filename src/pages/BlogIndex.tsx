
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Layout from '../components/layout/Layout';
import BlogHeader from '../components/blog/BlogHeader';
import TrendingPosts from '../components/blog/TrendingPosts';
import FeaturedCategories from '../components/blog/FeaturedCategories';
import NewsletterSection from '../components/blog/NewsletterSection';
import BlogGrid from '../components/blog/BlogGrid';
import { ScrollArea } from '@/components/ui/scroll-area';

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');

  const handleCategoryChange = (category: 'all' | 'tech' | 'travel') => {
    console.log("Category changed to:", category);
    setActiveCategory(category);
  };

  return (
    <Layout>
      <ScrollArea className="h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-10">
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
            
            <div className="mt-16">
              <NewsletterSection />
            </div>
          </div>
        </motion.div>
      </ScrollArea>
    </Layout>
  );
};

export default BlogIndex;
