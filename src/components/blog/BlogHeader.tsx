import { Search } from "lucide-react";
import { Input } from "../ui/input";

const BlogHeader = () => {
  return (
    <div className="w-full bg-gradient-to-b from-connectivity-bg to-connectivity-darkBg py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white mb-6">Smart RV Blog</h1>
        <p className="text-xl text-connectivity-accent mb-8 max-w-2xl">
          Discover the latest insights, tips, and innovations in RV technology and smart living.
        </p>
        <div className="relative max-w-lg">
          <Input 
            placeholder="Search articles..." 
            className="bg-[#131a2a] border-[#1a202c] text-white pl-12 h-12"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-connectivity-accent w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;