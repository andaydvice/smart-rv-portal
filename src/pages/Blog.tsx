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
      <div className="pt-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white">
            Welcome to Our Updated RV Living Blog
          </h1>
          <p className="text-[#E2E8FF] mt-4 opacity-90">
            Discover the latest in smart RV technology and travel
          </p>
        </motion.div>
        <BlogHeader />
        <TrendingPosts />
        <NewsletterSection />
      </div>
    </motion.div>
  );
};

export default Blog;