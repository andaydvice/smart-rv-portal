
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import BlogGrid from "@/components/blog/BlogGrid";
import FeaturedCategories from "@/components/blog/FeaturedCategories";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Layout from "@/components/layout/Layout";

import { Container } from "@/components/ui/container";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCategoryChange = (category: 'all' | 'tech' | 'travel') => {
    setActiveCategory(category);
  };
  return (
    <Layout>
      <Helmet>
        <title>Smart RV Blog - Latest RV Tech & Travel Tips</title>
        <meta name="description" content="Discover the latest in Smart RV technology, travel tips, and smart living solutions for modern Smart RV enthusiasts." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/blog' : ''} />
      </Helmet>
      
      <div className="w-full py-8">
        <Container>
          <BlogHeader />
          <TrendingPosts activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <BlogGrid activeCategory={activeCategory} />
          
          
          <FeaturedCategories />
          <NewsletterSection />
        </Container>
      </div>
    </Layout>
  );
};

export default Blog;
