import { Search } from "lucide-react";
import { Input } from "../ui/input";

const BlogHeader = () => {
  console.log('Rendering BlogHeader component');
  
  return (
    <div className="w-full bg-[#080F1F] pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 bg-[#151A22]">
          <img 
            src="/lovable-uploads/d162fcf8-2adb-41b5-94cb-1ae7b7ce7b88.png" 
            alt="Mastering Productivity" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] via-[#080F1F]/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="inline-block px-3 py-1 bg-[#5B9BD5]/20 text-[#5B9BD5] rounded-full text-sm mb-4">
              Business
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Mastering Productivity
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#5B9BD5] flex items-center justify-center">
                <span className="text-white text-sm">MK</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#E2E8FF] text-sm">Marcus King</span>
                <span className="text-[#E2E8FF]/60">•</span>
                <span className="text-[#E2E8FF]/60 text-sm">5 mins read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;