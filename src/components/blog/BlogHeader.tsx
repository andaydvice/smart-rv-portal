import { motion } from "framer-motion";
import { SplineSceneBasic } from "./SplineSceneBasic";

const BlogHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <h1 className="text-5xl font-bold bg-gradient-to-r from-[#5B9BD5] to-[#E2E8FF] text-transparent bg-clip-text">
        Smart RV Living
      </h1>
      <p className="text-[#E2E8FF] text-xl max-w-2xl mx-auto">
        Explore the intersection of technology and RV lifestyle with expert insights, travel tips, and smart solutions for modern adventurers.
      </p>
      <SplineSceneBasic />
    </motion.div>
  );
};

export default BlogHeader;