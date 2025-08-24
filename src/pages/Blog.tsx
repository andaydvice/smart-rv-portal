
import SEO from "@/components/seo/SEO";
import { organizationSchema, breadcrumbSchema } from "@/components/seo/schemas";
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
      <SEO
        title="RV Tech Blog | Smart RV Living & Technology Insights"
        description="Discover the latest in RV technology, smart systems, solar power, connectivity solutions, and digital nomad living. Expert reviews, guides, and insights for modern travelers."
        keywords="RV blog, RV technology, Smart RV Hub, digital nomad blog, RV solar power, RV connectivity, mobile internet, RV automation"
        ogImage="/og-image.svg"
        ogImageAlt="Smart RV Technology Blog - Latest insights and guides"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: 'Blog', url: typeof window !== 'undefined' ? `${window.location.origin}/blog` : '' }
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Smart RV Technology Blog',
            description: 'Expert insights on RV technology, smart systems, and connected travel solutions',
            url: typeof window !== 'undefined' ? `${window.location.origin}/blog` : '',
            author: organizationSchema
          }
        ]}
      />
      
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
