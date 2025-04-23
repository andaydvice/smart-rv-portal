
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import BlogGrid from "@/components/blog/BlogGrid";
import FeaturedCategories from "@/components/blog/FeaturedCategories";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Layout from "@/components/layout/Layout";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');
  
  useEffect(() => {
    // Scroll to top when component mounts
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
        <link rel="preload" href="/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png" as="image" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 space-y-12 pt-20 flex-grow">
        <BlogHeader />
        <TrendingPosts activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <BlogGrid activeCategory={activeCategory} />
        <FeaturedCategories />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Blog;
