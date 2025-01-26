import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const trendingPosts = [
  {
    id: 1,
    title: "Smart RV Systems: The Future of Mobile Living",
    category: "Technology",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Sustainable RV Living: Green Tech Solutions",
    category: "Sustainability",
    author: "Mike Thompson",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Essential RV Tech Upgrades for 2024",
    category: "Gear",
    author: "Emily Parker",
    date: "March 8, 2024",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80"
  }
];

const TrendingPosts = () => {
  console.log('Rendering TrendingPosts component');
  
  return (
    <section className="py-20 bg-[#080F1F]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 animate-fade-up">
          Trending Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="bg-[#151A22] border-[#1a202c] overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-[#5B9BD5]/20 text-[#5B9BD5] px-3 py-1 rounded-full text-sm">
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