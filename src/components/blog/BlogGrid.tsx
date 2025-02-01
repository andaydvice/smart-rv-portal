import React from 'react';
import BlogPostCard from './BlogPostCard';

interface BlogGridProps {
  activeCategory: 'all' | 'tech' | 'travel';
}

const BlogGrid = ({ activeCategory }: BlogGridProps) => {
  const posts = [
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
    },
    {
      category: 'tech',
      author: {
        initials: 'ST',
        name: 'Smart Tech'
      },
      title: 'RV Smart Tech',
      description: 'Discover the latest smart technology innovations for your RV.',
      image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png',
      slug: 'rv-smart-tech'
    },
    {
      category: 'tech',
      author: {
        initials: 'IS',
        name: 'Indoor Storage'
      },
      title: 'Indoor RV Storage',
      description: 'Everything you need to know about indoor RV storage solutions.',
      image: '/lovable-uploads/72144d64-5f93-4ee2-8187-e495f556f206.png',
      slug: 'indoor-rv-storage'
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  console.log("BlogGrid - Active Category:", activeCategory);
  console.log("BlogGrid - Filtered Posts:", filteredPosts);

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-semibold text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <BlogPostCard 
            key={post.title} 
            post={post} 
            imageAlt={post.title}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;