import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface TrendingPost {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

interface TrendingPostCardProps {
  post: TrendingPost;
  index: number;
  getCategoryDisplay: (category: string) => string;
}

const TrendingPostCard = ({ post, index, getCategoryDisplay }: TrendingPostCardProps) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    console.log("Navigating to trending post:", post.slug);
    navigate(`/blog/${post.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:border-[#00ffff]/40 transition-colors">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">{post.title}</h3>
          <p className="text-[#E2E8FF] text-sm">{post.excerpt}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="bg-[#1B2028] text-white px-4 py-2 rounded-full">
              {getCategoryDisplay(post.category)}
            </span>
            <span className="text-[#E2E8FF]/60">{post.readTime}</span>
          </div>
          <Button 
            variant="ghost"
            className="bg-[#00ffff] text-black hover:bg-[#00ffff]/80 hover:text-black px-8 py-2 rounded-full"
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TrendingPostCard;