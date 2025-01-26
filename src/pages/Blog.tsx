import { motion } from "framer-motion";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import FeaturedCategories from "@/components/blog/FeaturedCategories";

const Blog = () => {
  console.log('Rendering Blog page');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#080F1F]"
    >
      <BlogHeader />
      <TrendingPosts />
      <FeaturedCategories />
    </motion.div>
  );
};

export default Blog;