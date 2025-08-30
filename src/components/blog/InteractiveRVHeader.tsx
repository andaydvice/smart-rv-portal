import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wifi, Zap, Shield, Radio, Cpu, Battery } from "lucide-react";

const InteractiveRVHeader = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const techElements = [
    { id: 'wifi', icon: Wifi, position: { top: '20%', left: '15%' }, label: 'Smart Connectivity' },
    { id: 'solar', icon: Zap, position: { top: '15%', right: '20%' }, label: 'Solar Power' },
    { id: 'security', icon: Shield, position: { top: '40%', left: '10%' }, label: 'Security System' },
    { id: 'radio', icon: Radio, position: { top: '35%', right: '15%' }, label: 'Communication' },
    { id: 'cpu', icon: Cpu, position: { bottom: '30%', left: '20%' }, label: 'Smart Controls' },
    { id: 'battery', icon: Battery, position: { bottom: '25%', right: '25%' }, label: 'Power Management' }
  ];

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-connectivity-darkBg via-[#0A1428] to-[#1A2332] overflow-hidden rounded-2xl">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {[...Array(96)].map((_, i) => (
            <div key={i} className="border border-connectivity-accent/10 animate-pulse" 
                 style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
      
      {/* Flowing light rays */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-connectivity-accent/30 via-connectivity-accent/10 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-[#60A5FA]/20 via-[#60A5FA]/5 to-transparent"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Central RV Silhouette */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative">
          {/* RV Shape with gradient */}
          <svg width="400" height="200" viewBox="0 0 400 200" className="filter drop-shadow-2xl">
            <defs>
              <linearGradient id="rvGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5B9BD5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#E2E8FF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* RV Body */}
            <rect x="50" y="80" width="300" height="80" rx="8" fill="url(#rvGradient)" stroke="#5B9BD5" strokeWidth="2" />
            
            {/* RV Cab */}
            <rect x="30" y="90" width="60" height="60" rx="6" fill="url(#rvGradient)" stroke="#5B9BD5" strokeWidth="2" />
            
            {/* Windows */}
            <rect x="100" y="90" width="40" height="25" rx="3" fill="url(#windowGradient)" />
            <rect x="160" y="90" width="40" height="25" rx="3" fill="url(#windowGradient)" />
            <rect x="220" y="90" width="40" height="25" rx="3" fill="url(#windowGradient)" />
            <rect x="280" y="90" width="40" height="25" rx="3" fill="url(#windowGradient)" />
            
            {/* Windshield */}
            <rect x="35" y="95" width="50" height="30" rx="4" fill="url(#windowGradient)" />
            
            {/* Wheels */}
            <circle cx="110" cy="170" r="15" fill="#333" stroke="#5B9BD5" strokeWidth="2" />
            <circle cx="290" cy="170" r="15" fill="#333" stroke="#5B9BD5" strokeWidth="2" />
            
            {/* Solar panels on roof */}
            <rect x="120" y="70" width="160" height="8" rx="2" fill="#1a365d" stroke="#60A5FA" strokeWidth="1" />
          </svg>

          {/* Pulsing energy core */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-connectivity-accent rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Interactive Tech Elements */}
      {techElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute cursor-pointer group"
          style={element.position}
          whileHover={{ scale: 1.2 }}
          onHoverStart={() => setActiveElement(element.id)}
          onHoverEnd={() => setActiveElement(null)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.random() * 2 }}
        >
          <div className="relative">
            <motion.div
              className="w-12 h-12 bg-connectivity-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-connectivity-accent/30"
              animate={{
                boxShadow: activeElement === element.id 
                  ? "0 0 30px rgba(91, 155, 213, 0.6)" 
                  : "0 0 10px rgba(91, 155, 213, 0.2)"
              }}
            >
              <element.icon className="w-6 h-6 text-connectivity-accent" />
            </motion.div>
            
            {/* Connecting lines */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-gradient-to-r from-connectivity-accent/60 to-transparent origin-left"
              style={{ 
                transform: 'translate(-50%, -50%) rotate(45deg)'
              }}
              animate={{
                opacity: activeElement === element.id ? 1 : 0.3,
                scaleX: activeElement === element.id ? 1 : 0.7
              }}
            />

            {/* Tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: activeElement === element.id ? 1 : 0,
                y: activeElement === element.id ? 0 : 10
              }}
            >
              {element.label}
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Title and Description */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-connectivity-accent to-[#60A5FA]">
            Smart RV Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Discover cutting-edge technology, innovative solutions, and the future of intelligent RV living
          </p>
          
          {/* Interactive CTA */}
          <motion.div
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-connectivity-accent to-[#60A5FA] rounded-full text-white font-semibold cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(91, 155, 213, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Smart RV Tech</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>→</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-connectivity-accent/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveRVHeader;