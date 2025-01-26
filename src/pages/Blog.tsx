import { motion } from "framer-motion";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Navbar from "@/components/Navbar";

const Blog = () => {
  console.log('Rendering Blog page');
  
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-connectivity-bg pt-16"
      >
        <BlogHeader />
        <TrendingPosts />
        <NewsletterSection />
      </motion.div>
    </>
  );
};

export default Blog;