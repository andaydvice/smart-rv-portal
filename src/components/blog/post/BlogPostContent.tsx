
import React from 'react';

interface Author {
  initials: string;
  name: string;
}

interface BlogPostContentProps {
  category: string;
  title: string;
  author: Author;
  description?: string;
  content: string;
}

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
}: BlogPostContentProps) => {
  // Split content into paragraphs for better formatting
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-[#1B2028] text-white px-6 py-3 text-base rounded-full font-medium">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-left leading-tight">{title}</h1>

      {description && (
        <div className="text-[#E2E8FF] text-2xl md:text-3xl font-medium mb-12 text-left leading-relaxed">
          {description}
        </div>
      )}

      <div className="flex items-center gap-4 text-white/80 mb-12">
        <div className="bg-[#1B2028] w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg">
          {author.initials}
        </div>
        <span className="font-medium text-lg">{author.name}</span>
      </div>

      <div className="blog-content text-left space-y-6">
        <div className="text-white/90 text-xl leading-relaxed md:text-2xl md:leading-10">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-8">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
