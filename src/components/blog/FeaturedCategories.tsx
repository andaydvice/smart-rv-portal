import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const featuredPosts = [
  {
    category: "Culture",
    title: "RV Smart Tech",
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
    title: "Indoor RV Storage",
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
  console.log("Rendering FeaturedCategories with posts:", featuredPosts);
  
  return (
    <section className="space-y-8 py-8">
      <div className="border-b border-gray-800 pb-2">
        <h2 className="text-2xl font-medium text-white">Featured</h2>
      </div>
      
      <div className="space-y-24">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1 flex items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-[#00ffff]">{post.author.name}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-400">{post.date}</span>
                  </div>
                </div>
                
                <h3 className="text-5xl font-bold text-white leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {post.description}
                </p>
                
                <Button 
                  variant="ghost"
                  className="bg-[#00ffff] text-black hover:bg-[#00ffff]/80 px-8 py-2 rounded-full"
                >
                  Read More
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;