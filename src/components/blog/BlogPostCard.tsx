
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

const preventWidow = (text: string) => {
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    return `${text.substring(0, lastSpace)}\u00A0${text.substring(lastSpace + 1)}`;
  }
  return text;
};

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const getCategoryDisplay = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-[300px] object-cover"
        />
      </div>
      
      <div className="bg-[#080f20] p-6 rounded-3xl border border-white/20">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
              {getCategoryDisplay(post.category)}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white">
            {post.title}
          </h3>
          <p className="text-white/90">
            {preventWidow(post.description)}
          </p>
          
          <Link 
            to={`/blog/${post.slug}`}
            className="inline-block bg-[#00ffff] text-black hover:bg-[#00ffff]/80 px-8 py-2 rounded-full"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
