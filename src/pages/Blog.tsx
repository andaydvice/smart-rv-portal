
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import BlogGrid from "@/components/blog/BlogGrid";
import FeaturedCategories from "@/components/blog/FeaturedCategories";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Container } from "@/components/ui/container";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Blog page - Active Category:", activeCategory);
  }, []);
  
  const handleCategoryChange = (category: 'all' | 'tech' | 'travel') => {
    console.log("Changing category to:", category);
    setActiveCategory(category);
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Smart RV Blog - Latest RV Tech & Travel Tips</title>
        <meta name="description" content="Discover the latest in RV technology, travel tips, and smart living solutions for modern RV enthusiasts." />
      </Helmet>
      
      <div className="w-full py-8">
        <Container>
          <BlogHeader />
          <TrendingPosts activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <BlogGrid activeCategory={activeCategory} />
          
          {/* Partner Content & Tools */}
          <OptimizedAffiliateGrid
            title="Enhance Your RV Content Experience"
            subtitle="Get the tools and resources that make RV blogging and content creation easier"
            partners={[
              {
                partner: 'rvlife',
                title: 'RV Life Trip Planning & Content Tools',
                description: 'Professional trip planning tools with content creation features and RV-safe routes',
                features: ['Trip Planning Tools', 'Photo Mapping', 'Content Templates', 'Social Sharing'],
                path: '/content-tools',
                buttonText: 'Explore Content Tools'
              },
              {
                partner: 'rvshare',
                title: 'RVShare Content Partnership',
                description: 'Join the RVShare affiliate program and monetize your RV content with rental referrals',
                features: ['Affiliate Program', 'Content Monetization', 'Rental Network', 'Creator Resources'],
                path: '/affiliate-program',
                buttonText: 'Join Affiliate Program'
              }
            ]}
            gridCols="2"
          />
          
          <FeaturedCategories />
          <NewsletterSection />
        </Container>
      </div>
    </Layout>
  );
};

export default Blog;
