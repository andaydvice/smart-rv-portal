import { motion } from "framer-motion";
import { Card } from "../ui/card";

const categories = [
  {
    title: "Nature",
    subtitle: "Breathtaking Beauty",
    image: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&q=80",
    color: "from-green-400/20 to-green-600/20"
  },
  {
    title: "Technology",
    subtitle: "Discover the Future",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    color: "from-blue-400/20 to-blue-600/20"
  },
  {
    title: "Culture",
    subtitle: "Explore the World",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&q=80",
    color: "from-red-400/20 to-red-600/20"
  },
  {
    title: "Sustainability",
    subtitle: "Save Our Planet",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80",
    color: "from-cyan-400/20 to-cyan-600/20"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-[#080F1F]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl font-bold text-white">Featured</h2>
          <span className="text-4xl font-light text-[#5B9BD5]">Categories</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden h-[280px] group cursor-pointer">
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} backdrop-blur-[2px]`} />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-[#E2E8FF]/90">{category.subtitle}</p>
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