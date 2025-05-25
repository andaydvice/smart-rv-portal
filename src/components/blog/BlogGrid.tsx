
import React from 'react';
import BlogPostCard from './BlogPostCard';
import { blogPosts } from '@/data/blogPosts'; // MODIFIED: Import blogPosts
import { BlogPost } from '@/types/blog'; // MODIFIED: Import BlogPost type for consistency

interface BlogGridProps {
  activeCategory: 'all' | 'tech' | 'travel';
}

const BlogGrid = ({ activeCategory }: BlogGridProps) => {
  // MODIFIED: Use imported blogPosts instead of local definition
  // const posts = [ ... ]; 
  const posts: BlogPost[] = blogPosts; // Ensure 'posts' has the correct type

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === activeCategory); // MODIFIED: Ensure category comparison is case-insensitive

  console.log("BlogGrid - Active Category:", activeCategory);
  console.log("BlogGrid - Filtered Posts:", filteredPosts);

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-semibold text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? ( // MODIFIED: Add check for empty filteredPosts
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
