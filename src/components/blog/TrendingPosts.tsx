import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TrendingPosts = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');

  const posts = [
    {
      title: "Top 10 Smart RV Upgrades",
      excerpt: "Transform your RV into a smart home on wheels with these essential tech upgrades.",
      category: "tech",
      readTime: "8 min read",
      image: "/lovable-uploads/d3b696f0-39e5-4cfa-b38c-6579325a495a.png"
    },
    {
      title: "Solar Power Solutions for Full Time RVers",
      excerpt: "Complete guide to planning and installing a solar power system in your RV.",
      category: "tech",
      readTime: "12 min read",
      image: "/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png"
    },
    {
      title: "Remote Work from Your RV: Essential Setup Guide",
      excerpt: "Create the perfect mobile office setup in your RV with these tips.",
      category: "travel",
      readTime: "10 min read",
      image: "/lovable-uploads/ae930cf7-205f-41d3-9c9b-a4969e5c35e6.png"
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <section className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-white">Trending Posts</h2>
        <div className="flex gap-2">
          <Button 
            variant={activeCategory === 'all' ? "default" : "outline"}
            onClick={() => setActiveCategory('all')}
            className={`
              ${activeCategory === 'all' 
                ? 'bg-connectivity-accent text-white hover:bg-connectivity-accent/80 hover:text-white' 
                : 'border-connectivity-accent text-connectivity-accent hover:bg-connectivity-accent/10 hover:text-white'
              }
            `}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === 'tech' ? "default" : "outline"}
            onClick={() => setActiveCategory('tech')}
            className={`
              ${activeCategory === 'tech' 
                ? 'bg-connectivity-accent text-white hover:bg-connectivity-accent/80 hover:text-white' 
                : 'border-connectivity-accent text-connectivity-accent hover:bg-connectivity-accent/10 hover:text-white'
              }
            `}
          >
            Tech
          </Button>
          <Button 
            variant={activeCategory === 'travel' ? "default" : "outline"}
            onClick={() => setActiveCategory('travel')}
            className={`
              ${activeCategory === 'travel' 
                ? 'bg-connectivity-accent text-white hover:bg-connectivity-accent/80 hover:text-white' 
                : 'border-connectivity-accent text-connectivity-accent hover:bg-connectivity-accent/10 hover:text-white'
              }
            `}
          >
            Travel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:border-connectivity-accent/40 transition-colors">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4 bg-[#080f20]">
                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                <p className="text-[#E2E8FF] text-sm">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-[#E2E8FF]/60">
                  <span>{post.category.toUpperCase()}</span>
                  <span>{post.readTime}</span>
                </div>
                <Button 
                  variant="ghost"
                  className="bg-[#00ffff] text-black hover:bg-[#00ffff]/80 px-8 py-2 rounded-full"
                >
                  Read More
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingPosts;