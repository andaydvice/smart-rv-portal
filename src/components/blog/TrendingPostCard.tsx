
import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  category: string;
  title: string;
  description: string;
  image: string;
  slug?: string;
}

interface TrendingPostCardProps {
  post: Post;
}

const TrendingPostCard: React.FC<TrendingPostCardProps> = ({ post }) => {
  // Generate slug from title if not provided
  const slug = post.slug || post.title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="bg-[#080f20] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:translate-y-[-5px]">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <div className="p-6 space-y-3">
        <div className="bg-[#1B2028] text-white px-3 py-1 text-xs rounded-full inline-block">
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </div>
        
        <h3 className="text-xl font-semibold text-white">
          {post.title}
        </h3>
        
        <p className="text-[#E2E8FF] text-sm">
          {post.description}
        </p>
        
        <Link 
          to={`/blog/${slug}`}
          className="inline-block text-[#5B9BD5] hover:text-[#00ffff] text-sm font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default TrendingPostCard;
