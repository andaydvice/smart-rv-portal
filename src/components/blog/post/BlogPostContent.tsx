import React from 'react';

interface Author {
  initials: string;
  name: string;
}

interface BlogPostContentProps {
  category: string;
  title: string;
  author: Author;
  description?: string; // Added description prop
  content: string;
}

// Utility: Determines if a line is likely a headline (not ending with punctuation/almost all uppercase or in title case)
function isLikelyHeadline(line: string) {
  // Not empty, not all-lowercase, does not end with punctuation, not too short/long
  return (
    line.length >= 3 &&
    line.length <= 60 &&
    !/[.?!:,]$/.test(line.trim()) && // Doesn't end with sentence punctuation
    /^[A-Z]/.test(line.trim()) // Starts capitalized
  );
}

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
}: BlogPostContentProps) => {
  // Split content by double newlines
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length);

  // Map paragraphs, auto-promote headlines
  function renderPostContent(chunks: string[]) {
    return chunks.map((chunk, idx) => {
      const trimmed = chunk.trim();
      // Promote single lines likely to be headlines
      if (isLikelyHeadline(trimmed)) {
        return (
          <h2
            key={"h2-" + idx}
            className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-4"
          >
            {trimmed}
          </h2>
        );
      }
      // Otherwise: draw as paragraph
      return (
        <p
          key={"p-" + idx}
          className="mb-0 text-white/90 text-lg leading-8 md:text-xl md:leading-9"
        >
          {trimmed}
        </p>
      );
    });
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4">
      <div className="flex items-center gap-4">
        <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>

      {description && (
        <div className="text-[#E2E8FF] text-xl md:text-2xl font-medium mb-6">
          {description}
        </div>
      )}

      <div className="flex items-center gap-2 text-white/80 mb-8">
        <div className="bg-[#1B2028] w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          {author.initials}
        </div>
        <span className="font-medium">{author.name}</span>
      </div>

      <div className="blog-content space-y-8">
        {renderPostContent(paragraphs)}
      </div>
    </div>
  );
};
