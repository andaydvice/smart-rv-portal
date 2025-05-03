
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/blog/post/OptimizedImage";
import { useEffect } from "react";

const DocumentationHeader = () => {
  // Preload header image immediately when component mounts
  useEffect(() => {
    const headerImageSrc = '/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png';
    
    // Create and inject a preload link with high priority
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = headerImageSrc;
    link.fetchPriority = 'high';
    // Remove importance attribute as it's not supported in TypeScript
    document.head.appendChild(link);
    
    // Also preload using Image constructor for immediate loading
    const img = new Image();
    img.src = headerImageSrc;
    img.fetchPriority = 'high';
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Full width header image section */}
      <div className="relative w-full mb-8 border-b border-gray-800">
        <div className="max-h-[400px] overflow-hidden">
          <OptimizedImage
            src="/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png"
            alt="Complete System Documentation"
            className="w-full object-cover"
            width={1920}
            height={400}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Content container */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Removed the "Back to Troubleshooting" button */}

        <div className="text-center mb-16">
          <h1 className="text-[1.75rem] font-bold text-[#0EA5E9] mb-4">System Documentation</h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Complete documentation and technical specifications for your Smart RV system
          </p>
        </div>

        {/* Added more vertical spacing with mt-32 (instead of mt-24) */}
        <div className="mt-32 text-center mb-16">
          <Link to="/documentation/complete">
            <Button 
              variant="outline" 
              className="bg-transparent border-gray-300 text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9]/25 text-sm py-2 px-4 focus:text-white active:text-white"
            >
              View Complete System Documentation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentationHeader;
