import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TrendingPosts = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'travel'>('all');

  const posts = [
    {
      title: "Top 10 Smart RV Upgrades for 2024",
      excerpt: "Transform your RV into a smart home on wheels with these essential tech upgrades.",
      category: "tech",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=300"
    },
    {
      title: "Solar Power Solutions for Full-Time RVers",
      excerpt: "Complete guide to planning and installing a solar power system in your RV.",
      category: "tech",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
    },
    {
      title: "Remote Work from Your RV: Essential Setup Guide",
      excerpt: "Create the perfect mobile office setup in your RV with these tips.",
      category: "travel",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300"
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-white">Trending Posts</h2>
        <div className="flex gap-2">
          <Button 
            variant={activeCategory === 'all' ? "default" : "outline"}
            onClick={() => setActiveCategory('all')}
            className="bg-connectivity-accent text-white hover:bg-connectivity-accent/80"
          >
            All
          </Button>
          <Button 
            variant={activeCategory === 'tech' ? "default" : "outline"}
            onClick={() => setActiveCategory('tech')}
            className="bg-connectivity-accent text-white hover:bg-connectivity-accent/80"
          >
            Tech
          </Button>
          <Button 
            variant={activeCategory === 'travel' ? "default" : "outline"}
            onClick={() => setActiveCategory('travel')}
            className="bg-connectivity-accent text-white hover:bg-connectivity-accent/80"
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
            <Card className="bg-connectivity-darkBg border-connectivity-accent/20 overflow-hidden hover:border-connectivity-accent/40 transition-colors">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                <p className="text-[#E2E8FF] text-sm">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-[#E2E8FF]/60">
                  <span>{post.category.toUpperCase()}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingPosts;