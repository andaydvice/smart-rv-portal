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
    title: 'The Future of Mobile Living',
    description: 'Smart RVs are revolutionizing how we experience life on the road.',
    image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png',
    slug: 'future-of-mobile-living'
  },
  {
    category: 'travel',
    author: {
      initials: 'AS',
      name: 'Alice Smith'
    },
    title: 'Sustainable Travel Redefined',
    description: 'Where eco friendly design meets intelligent mobile home solutions.',
    image: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png',
    slug: 'sustainable-travel-redefined'
  }
];

interface BlogGridProps {
  activeCategory?: 'all' | 'tech' | 'travel';
}

export default function BlogGrid({ activeCategory = 'all' }: BlogGridProps) {
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  console.log("BlogGrid - Active Category:", activeCategory);
  console.log("BlogGrid - Filtered Posts:", filteredPosts);
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post, index) => (
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