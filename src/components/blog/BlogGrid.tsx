import React from 'react';
import { BlogPost } from '@/types/blog';
import BlogPostCard from './BlogPostCard';

const blogPosts: BlogPost[] = [
  {
    category: 'tech',
    author: {
      initials: 'JD',
      name: 'John Doe'
    },
    date: 'Sep 16',
    title: 'The Future of Mobile Living',
    description: 'Smart RVs are revolutionizing how we experience life on the road.',
    image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png'
  },
  {
    category: 'travel',
    author: {
      initials: 'AS',
      name: 'Alice Smith'
    },
    date: 'Sep 16',
    title: 'Sustainable Travel Redefined',
    description: 'Where eco-friendly design meets intelligent mobile home solutions.',
    image: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png'
  }
];

export default function BlogGrid() {
  console.log("Rendering BlogGrid with posts:", blogPosts);
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <BlogPostCard 
            key={post.title}
            post={post} 
            imageAlt={post.title}
          />
        ))}
      </div>
    </div>
  );
}