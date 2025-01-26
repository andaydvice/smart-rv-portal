import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import NewsletterSection from "@/components/blog/NewsletterSection";
import Navbar from "@/components/Navbar";

const Blog = () => {
  console.log('Rendering Blog page');
  
  return (
    <Layout>
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
    </Layout>
  );
};

export default Blog;