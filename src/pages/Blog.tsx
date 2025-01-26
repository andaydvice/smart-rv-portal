import { motion } from "framer-motion";
import BlogHeader from "@/components/blog/BlogHeader";
import TrendingPosts from "@/components/blog/TrendingPosts";
import NewsletterSection from "@/components/blog/NewsletterSection";

const Blog = () => {
  console.log('Rendering Blog page - component mounted');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#080F1F]"
      onAnimationComplete={() => console.log('Blog page animation completed')}
    >
      <div className="pt-16">
        <BlogHeader />
        <TrendingPosts />
        <NewsletterSection />
      </div>
    </motion.div>
  );
};

export default Blog;