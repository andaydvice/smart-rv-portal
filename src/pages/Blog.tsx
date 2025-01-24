import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import Layout from "@/components/layout/Layout";

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

const Blog = () => {
  console.log('Rendering Blog page');
  
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full min-h-screen bg-connectivity-bg"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12 text-[#D6BCFA]">RV Living Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover:scale-105 transition-transform duration-300 bg-[#6E59A5]/90 border-[#9b87f5]/20"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl text-[#D6BCFA] line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-[#F1F0FB]/90">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#D6BCFA]/80">
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
        </div>
      </motion.div>
    </Layout>
  );
};

export default Blog;