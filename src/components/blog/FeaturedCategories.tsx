import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const featuredPosts = [
  {
    category: "Technology",
    title: "RV Smart Tech",
    description: ["Experience the future of RV living with cutting edge smart technology that transforms your mobile lifestyle.", "Our innovative systems seamlessly integrate automation, monitoring, and control features to enhance every aspect of your RV experience."],
    image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
    slug: "rv-smart-tech"
  },
  {
    category: "Technology",
    title: "Indoor RV Storage",
    description: ["Discover premium climate controlled indoor RV storage solutions that protect your investment year round.", "Our state of the art facilities offer advanced security systems and easy access, ensuring your RV stays in pristine condition between adventures."],
    image: "/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.png",
    slug: "indoor-rv-storage"
  }
];

const FeaturedCategories = () => {
  const getCategoryDisplay = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

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
                  <span className="bg-connectivity-accent text-white px-4 py-2 text-sm rounded-full font-medium">
                    {getCategoryDisplay(post.category)}
                  </span>
                </div>
                
                <h3 className="text-5xl font-bold text-white leading-tight">
                  {post.title}
                </h3>
                <div className="text-white/90 text-lg space-y-4">
                  {Array.isArray(post.description) ? (
                    post.description.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{post.description}</p>
                  )}
                </div>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-block bg-[#00ffff] text-black hover:bg-[#00ffff]/80 px-8 py-2 rounded-full"
                >
                  Read More
                </Link>
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