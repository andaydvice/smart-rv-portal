import { motion } from "framer-motion";
import { Card } from "../ui/card";

const featuredPosts = [
  {
    title: "The 5G Technology",
    category: "Technology",
    author: "Marcus King",
    readTime: "3 mins read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
  },
  {
    title: "A Journey Through Time",
    category: "Music",
    author: "Jacob Williams",
    readTime: "7 mins read",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80"
  },
  {
    title: "The Digital Age",
    category: "Culture",
    author: "Emily Davis",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
  },
  {
    title: "The Power Of Networking",
    category: "Business",
    author: "Ayana Carter",
    readTime: "4 mins read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-[#080F1F]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Featured <span className="text-[#5B9BD5]">Posts</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="relative overflow-hidden h-[300px] group cursor-pointer border-none bg-[#151A22]">
                <div className="absolute inset-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151A22] to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#5B9BD5]/20 text-[#5B9BD5] px-4 py-2 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#5B9BD5] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#5B9BD5] flex items-center justify-center">
                        <span className="text-white text-sm">{post.author.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#E2E8FF]">{post.author}</span>
                        <span className="text-[#E2E8FF]/60">•</span>
                        <span className="text-[#E2E8FF]/60">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;