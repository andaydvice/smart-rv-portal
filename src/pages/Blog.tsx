
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import BlogGrid from "@/components/blog/BlogGrid";
import FeaturedCategories from "@/components/blog/FeaturedCategories";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Navbar from "@/components/Navbar";
import Footer2 from "@/components/ui/Footer2";
import { scrollToTop } from "@/utils/scrollToTop";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');

  // Scroll to top on component mount
  useEffect(() => {
    console.log("Blog page - Scrolling to top");
    scrollToTop();
  }, []);

  // Define the footer links and socials for this page
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Features", href: "/features" },
        { text: "Models", href: "/models" }
      ]
    },
    {
      title: "Blog Categories",
      links: [
        { text: "Technology", href: "/blog?category=tech" },
        { text: "Travel", href: "/blog?category=travel" },
        { text: "All Posts", href: "/blog" }
      ]
    }
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  console.log("Blog page - Active Category:", activeCategory);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#080F1F]">
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
      <Footer2 
        links={footerLinks}
        socials={footerSocials}
        description="Discover the latest in Smart RV technology, travel tips, and innovations"
      />
    </div>
  );
};

export default Blog;
