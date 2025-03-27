
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import BlogGrid from "@/components/blog/BlogGrid";
import FeaturedCategories from "@/components/blog/FeaturedCategories";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');
  
  console.log("Blog page - Active Category:", activeCategory);
  
  return (
    <Layout>
      <Helmet>
        <title>Smart RV Blog - Latest RV Tech & Travel Tips</title>
        <meta name="description" content="Discover the latest in RV technology, travel tips, and smart living solutions for modern RV enthusiasts." />
      </Helmet>
      
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-12 pt-20 flex-grow">
        <BlogHeader />
        <TrendingPosts activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <BlogGrid activeCategory={activeCategory} />
        <FeaturedCategories />
        <NewsletterSection />
      </div>
    </Layout>
  );
};

export default Blog;
