
import React from 'react';

interface Author {
  initials: string;
  name: string;
}

interface BlogPostContentProps {
  category: string;
  title: string;
  author: Author;
  content: string;
}

export const BlogPostContent = ({ category, title, author, content }: BlogPostContentProps) => {
  // Split content by double newlines to respect paragraph breaks as authored.
  const paragraphs = content.split(/\n\n+/).filter(paragraph => paragraph.trim() !== '');

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4">
      <div className="flex items-center gap-4">
        <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
        {title}
      </h1>

      <div className="flex items-center gap-2 text-white/80 mb-8">
        <div className="bg-[#1B2028] w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          {author.initials}
        </div>
        <span className="font-medium">{author.name}</span>
      </div>

      <div className="text-white/90 text-lg leading-8 md:text-xl md:leading-9 space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-0">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
