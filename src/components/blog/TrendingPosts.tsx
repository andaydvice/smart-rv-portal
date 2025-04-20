
import React from 'react';
import TrendingPostCard from './TrendingPostCard';
import { motion } from 'framer-motion';

interface TrendingPostsProps {
  activeCategory: 'all' | 'tech' | 'travel';
  onCategoryChange: (category: 'all' | 'tech' | 'travel') => void;
}

const TrendingPosts = ({ activeCategory, onCategoryChange }: TrendingPostsProps) => {
  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'tech', label: 'Technology' },
    { id: 'travel', label: 'Travel Tips' }
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id as 'all' | 'tech' | 'travel')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-[#5B9BD5] text-white'
                : 'bg-[#151A22] text-white hover:bg-[#1E2A3E]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <TrendingPostCard 
          post={{
            category: 'tech',
            title: 'Smart RV Security Systems',
            description: 'Protect your RV with the latest security technology',
            image: '/lovable-uploads/e9503bf4-354a-4790-8a83-fefea32abc5b.png'
          }}
        />
        <TrendingPostCard 
          post={{
            category: 'travel',
            title: 'Top 10 RV Parks in the USA',
            description: 'Discover the most beautiful RV parks across the country',
            image: '/lovable-uploads/e6619d24-bebf-439f-96b0-6aca2fb69380.png'
          }}
        />
        <TrendingPostCard 
          post={{
            category: 'tech',
            title: 'Solar Power for RVs',
            description: 'Harness the power of the sun for your RV adventures',
            image: '/lovable-uploads/80ea47f5-5b04-409f-8eb7-1da434a9e0de.png'
          }}
        />
      </motion.div>
    </section>
  );
};

export default TrendingPosts;
