
import React from 'react';

interface Author {
  initials: string;
  name: string;
}

interface BlogPostHeaderProps {
  category: string;
  title: string;
  description?: string;
  author: Author;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  category,
  title,
  description,
  author,
}) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-[#1B2028] text-white px-6 py-3 text-base rounded-full font-medium">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-left leading-tight">
        {title}
      </h1>

      {description && (
        <div className="text-[#E2E8FF] text-xl md:text-2xl font-medium mb-6 text-left leading-relaxed">
          {description}
        </div>
      )}

      <div className="flex items-center text-white/80 mb-12">
        <span className="font-medium text-lg">{author.name}</span>
      </div>
    </>
  );
};
