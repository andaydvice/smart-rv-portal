import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

const featuredPosts = [
  {
    category: "Culture",
    title: "The Digital Age",
    description: "In an era characterized by rapid globalization and technological advancement.",
    author: {
      name: "Jen Taylor",
      avatar: "/placeholder.svg"
    },
    date: "Sep 16, 2023",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    category: "Technology",
    title: "The 5G Technology",
    description: "The world of technology is continually evolving, and the rollout of 5G.",
    author: {
      name: "Jason Williams",
      avatar: "/placeholder.svg"
    },
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-semibold text-white mb-8">Featured</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-connectivity-darkBg border-none overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-[#1B2028] text-white px-3 py-1 text-sm rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-[#E2E8FF]">
                    <Avatar className="w-6 h-6">
                      <img src={post.author.avatar} alt={post.author.name} />
                    </Avatar>
                    <span>{post.author.name}</span>
                    <span>|</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{post.title}</h3>
                  <p className="text-[#E2E8FF]">{post.description}</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-connectivity-accent hover:text-connectivity-accent/80"
                >
                  Read More
                </Button>
              </div>
              
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;