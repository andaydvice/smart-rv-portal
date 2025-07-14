
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
              
              <div className="mt-16">
                <OptimizedAffiliateGrid
                  title="Content Creator & RV Community Resources"
                  subtitle="Essential tools and services for RV bloggers, content creators, and community builders sharing their adventures."
                  partners={[
                    {
                      partner: 'rvlife',
                      title: 'RV LIFE Content Partnership',
                      description: 'Join the RV LIFE network of content creators with access to exclusive resources, trip data, and community features.',
                      features: ['Content creator tools', 'Trip planning data', 'Community network'],
                      buttonText: 'Join Creator Network'
                    },
                    {
                      partner: 'outdoorsy',
                      title: 'Influencer Collaboration Program',
                      description: 'Partner with Outdoorsy for sponsored RV experiences, content opportunities, and brand collaborations.',
                      features: ['Sponsored experiences', 'Brand partnerships', 'Content opportunities'],
                      buttonText: 'Apply for Program'
                    },
                    {
                      partner: 'goodsam',
                      title: 'Good Sam Ambassador Program',
                      description: 'Become a Good Sam ambassador and earn commissions while helping fellow RV enthusiasts save money.',
                      features: ['Ambassador benefits', 'Commission opportunities', 'Exclusive access'],
                      buttonText: 'Become Ambassador'
                    }
                  ]}
                  gridCols="3"
                />
              </div>
              
              <div className="mt-16">
                <NewsletterSection />
              </div>
            </Container>
          </div>
        </motion.div>
      </ScrollArea>
    </Layout>
  );
};

export default BlogIndex;
