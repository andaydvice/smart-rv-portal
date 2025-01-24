import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Essential RV Maintenance Tips for Spring",
      description: "Keep your RV in top condition with these spring maintenance tips.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 2,
      title: "Top 10 RV Smart Technology Upgrades",
      description: "Enhance your RV experience with these smart technology additions.",
      author: "Mike Thompson",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      id: 3,
      title: "Sustainable RVing: Eco-Friendly Travel Tips",
      description: "Learn how to minimize your environmental impact while enjoying the RV lifestyle.",
      author: "Emily Green",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 mt-16 bg-[#1A1F2C]"
    >
      <h1 className="text-4xl font-bold mb-8 text-[#D6BCFA]">RV Living Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#6E59A5] border-[#9b87f5]">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-xl text-[#D6BCFA]">{post.title}</CardTitle>
              <CardDescription className="text-[#F1F0FB]">{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-[#D6BCFA]">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default Blog;