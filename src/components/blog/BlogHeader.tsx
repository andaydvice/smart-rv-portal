
import { motion } from "framer-motion";
import { SplineSceneBasic } from "./SplineSceneBasic";

const BlogHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6 mb-12"
    >
      <SplineSceneBasic />
    </motion.div>
  );
};

export default BlogHeader;
