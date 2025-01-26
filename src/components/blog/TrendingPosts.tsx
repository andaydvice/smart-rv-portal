import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const trendingPosts = [
  {
    id: 1,
    title: "Designing for Clarity: The Color Psychology Behind Modern RV Tech Interfaces",
    category: "Technology",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Sustainable RV Living: Green Tech Solutions for the Modern Traveler",
    category: "Sustainability",
    author: "Mike Thompson",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Essential RV Tech Upgrades for the Connected Explorer",
    category: "Gear",
    author: "Emily Parker",
    date: "March 8, 2024",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80"
  }
];

const TrendingPosts = () => {
  console.log('Rendering TrendingPosts component');
  
  return (
    <section className="py-24 bg-[#080F1F]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white animate-fade-up">
            Trending Stories
          </h2>
          <a href="/blog/all" className="text-[#5B9BD5] hover:text-[#4B8FE3] transition-colors">
            View All Posts →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="bg-[#151A22] border-[#1a202c] overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-up group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-[#5B9BD5]/20 text-[#5B9BD5] px-4 py-2 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2 hover:text-[#5B9BD5] transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-6 text-sm text-[#E2E8FF]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#5B9BD5]" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#5B9BD5]" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPosts;