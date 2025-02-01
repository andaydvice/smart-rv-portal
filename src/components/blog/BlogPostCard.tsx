import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  imageAlt: string;
}

export default function BlogPostCard({ post, imageAlt }: BlogPostCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl overflow-hidden">
        {post.image ? (
          <img 
            src={post.image} 
            alt={imageAlt}
            className="w-full h-auto object-cover"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
            <defs>
              <linearGradient id="tech-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1E3B70"/>
                <stop offset="100%" stopColor="#1E90FF"/>
              </linearGradient>
              <linearGradient id="window-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            
            <rect width="400" height="300" fill="url(#tech-bg)"/>
            
            <path d="M50 200 L300 200 L350 150 L350 200 L50 200" 
                  fill="#2A4A8F" 
                  stroke="#4A90E2" 
                  strokeWidth="2"/>
            
            <rect x="100" y="160" width="40" height="25" fill="url(#window-gradient)" rx="2"/>
            <rect x="150" y="160" width="40" height="25" fill="url(#window-gradient)" rx="2"/>
            <rect x="200" y="160" width="40" height="25" fill="url(#window-gradient)" rx="2"/>
            
            <circle cx="320" cy="80" r="20" fill="#4A90E2" opacity="0.8"/>
            <circle cx="340" cy="60" r="10" fill="#4A90E2" opacity="0.6"/>
            
            <path d="M320 80 L340 60" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
            <path d="M320 80 L300 100" stroke="#FFFFFF" strokeWidth="1" opacity="0.5"/>
          </svg>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="bg-connectivity-darkBg text-white px-3 py-1 text-sm rounded-full">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-sm text-[#E2E8FF]">
            <Avatar className="w-5 h-5">
              <span className="text-xs">{post.author.initials}</span>
            </Avatar>
            <span>{post.author.name}</span>
            <span>|</span>
            <span>{post.date}</span>
          </div>
        </div>
        <h2 className="text-white text-xl mb-2">{post.title}</h2>
        <p className="text-[#E2E8FF]">{post.description}</p>
      </div>
    </div>
  );
}