import { motion } from "framer-motion";
import smartRvHero from "@/assets/smart-rv-hero.jpg";

const InteractiveRVHeader = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
      {/* Main hero image */}
      <div className="absolute inset-0">
        <img 
          src={smartRvHero}
          alt="Futuristic Smart RV with advanced technology"
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Gradient overlay for enhanced visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative h-full flex items-center justify-center text-center px-8">
        <motion.div
          className="space-y-6 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main heading */}
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Smart RV Blog
          </motion.h1>
          
          {/* Subtitle with gradient text */}
          <motion.p 
            className="text-2xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-connectivity-accent to-[#60A5FA] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            The Future of Intelligent RV Living
          </motion.p>
          
          {/* Description */}
          <motion.p 
            className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Discover cutting-edge technology, expert insights, and innovative solutions that are revolutionizing the world of recreational vehicles
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-connectivity-accent to-[#60A5FA] text-white font-semibold rounded-full text-lg shadow-2xl hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Latest Articles
          </motion.button>
        </motion.div>
      </div>

      {/* Tech floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 bg-connectivity-accent/20 backdrop-blur-sm rounded-full border border-connectivity-accent/30 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-connectivity-accent rounded-full"></div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 w-12 h-12 bg-[#60A5FA]/20 backdrop-blur-sm rounded-full border border-[#60A5FA]/30 flex items-center justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <div className="w-2 h-2 bg-[#60A5FA] rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default InteractiveRVHeader;