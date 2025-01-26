import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const trendingPosts = [
  {
    id: 1,
    title: "Designing for Clarity: The Color Psychology Behind Modern RV Tech Interfaces",
    category: "Design",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 2,
    title: "The Future of Smart RV Living: AI-Powered Systems",
    category: "Technology",
    author: "Mike Thompson",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  }
];

const TrendingPosts = () => {
  return (
    <section className="py-16 bg-connectivity-darkBg">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Trending Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trendingPosts.map((post) => (
            <Card 
              key={post.id}
              className="bg-[#091020] border-[#1a202c] overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-connectivity-accent/20 text-connectivity-accent px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-6 text-sm text-[#E2E8FF]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-connectivity-accent" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-connectivity-accent" />
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