import { Search } from "lucide-react";
import { Input } from "../ui/input";

const BlogHeader = () => {
  console.log('Rendering BlogHeader component');
  
  return (
    <div className="w-full bg-gradient-to-b from-[#080F1F] to-[#151A22] py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-7xl font-bold text-white mb-6 animate-fade-up leading-tight">
            Smart RV Living Blog
          </h1>
          <p className="text-xl text-[#E2E8FF] mb-12 max-w-2xl animate-fade-up opacity-90" style={{ animationDelay: '0.2s' }}>
            Discover the latest insights, tips, and innovations in RV technology and modern mobile living.
          </p>
          <div className="relative max-w-lg animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Input 
              placeholder="Search articles..." 
              className="bg-[#131a2a]/80 border-[#1a202c] text-white pl-12 h-12 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B9BD5] w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;