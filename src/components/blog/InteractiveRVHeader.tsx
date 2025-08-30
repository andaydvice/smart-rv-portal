import { motion } from "framer-motion";

const InteractiveRVHeader = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-connectivity-darkBg to-[#0F1A2E] overflow-hidden rounded-2xl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,155,213,0.1),transparent_70%)]"></div>
      </div>
      
      {/* Main content container */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="text-center space-y-8 px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Modern RV icon */}
          <motion.div
            className="mx-auto mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
              <defs>
                <linearGradient id="rvGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5B9BD5" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
              <rect x="15" y="25" width="90" height="30" rx="4" fill="url(#rvGrad)" />
              <rect x="10" y="30" width="20" height="20" rx="3" fill="url(#rvGrad)" />
              <rect x="25" y="30" width="12" height="8" rx="1" fill="white" fillOpacity="0.3" />
              <rect x="45" y="30" width="12" height="8" rx="1" fill="white" fillOpacity="0.3" />
              <rect x="65" y="30" width="12" height="8" rx="1" fill="white" fillOpacity="0.3" />
              <rect x="85" y="30" width="12" height="8" rx="1" fill="white" fillOpacity="0.3" />
              <circle cx="35" cy="62" r="6" fill="#333" stroke="#5B9BD5" strokeWidth="1" />
              <circle cx="85" cy="62" r="6" fill="#333" stroke="#5B9BD5" strokeWidth="1" />
              <rect x="35" y="22" width="50" height="3" rx="1" fill="#60A5FA" />
            </svg>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-connectivity-accent to-[#60A5FA] leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Smart RV Blog
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover cutting-edge technology, expert insights, and innovative solutions for the future of intelligent RV living
          </motion.p>

          {/* Feature badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {['Smart Tech', 'Solar Power', 'Connected Living', 'Expert Reviews'].map((badge, index) => (
              <div
                key={badge}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-gray-200 border border-white/20"
              >
                {badge}
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-connectivity-accent to-[#60A5FA] text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Latest Articles
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle accent elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-connectivity-accent/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#60A5FA]/5 rounded-full blur-xl"></div>
    </div>
  );
};

export default InteractiveRVHeader;