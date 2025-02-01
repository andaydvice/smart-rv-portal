import React from 'react';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';

interface BlogPostCardProps {
  post: BlogPost;
  imageAlt: string;
}

const BlogPostCard = ({ post, imageAlt }: BlogPostCardProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden">
        <img 
          src={post.image} 
          alt={imageAlt}
          className="w-full h-[300px] object-cover"
        />
      </div>
      
      <div className="bg-[#080f20] p-6 rounded-3xl border border-white/20">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2">
              <div className="bg-[#1B2028] w-8 h-8 rounded-full flex items-center justify-center text-[#00ffff]">
                {post.author.initials}
              </div>
              <span className="text-[#00ffff]">{post.author.name}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white">
            {post.title}
          </h3>
          <p className="text-gray-400">
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
    </div>
  );
};

export default BlogPostCard;