
import React from 'react';
import BlogPostCard from './BlogPostCard';
import { blogPosts } from '@/data/blog'; // MODIFIED: Updated import path
import { BlogPost } from '@/types/blog';

interface BlogGridProps {
  activeCategory: 'all' | 'tech' | 'travel';
}

const BlogGrid = ({ activeCategory }: BlogGridProps) => {
  const posts: BlogPost[] = blogPosts;

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === activeCategory);


  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-semibold text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogPostCard 
              key={post.slug}
              post={post}
            />
          ))
        ) : (
          <p className="text-white/90 col-span-full text-center">No posts found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
