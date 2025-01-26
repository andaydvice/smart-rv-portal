import { Search } from "lucide-react";
import { Input } from "../ui/input";

const BlogHeader = () => {
  console.log('Rendering BlogHeader component');
  
  return (
    <div className="w-full bg-[#080F1F] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
          <img 
            src="/lovable-uploads/e6eadd22-62ec-46d9-b98c-7f7efc86243d.png" 
            alt="Cultural Fusion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] via-[#080F1F]/80 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="inline-block px-3 py-1 bg-[#5B9BD5]/20 text-[#5B9BD5] rounded-full text-sm mb-4">
              Culture
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              The Cultural Fusion
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#5B9BD5] flex items-center justify-center">
                <span className="text-white text-sm">AC</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#E2E8FF] font-medium">Ayana Carter</span>
                <span className="text-[#E2E8FF]/60">•</span>
                <span className="text-[#E2E8FF]/60">6 mins read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;