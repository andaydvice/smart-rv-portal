
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
  // Enhanced content formatting that properly breaks up large text blocks
  const formatContent = (text: string) => {
    // Split by double line breaks first, then by single periods for sentence-by-sentence paragraphs
    const sentences = text.split(/\.(?:\s+|$)/).filter(s => s.trim().length > 0);
    
    return sentences.map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      
      if (!trimmedSentence) return null;
      
      // Add period back if it doesn't end with punctuation
      const formattedSentence = trimmedSentence.match(/[.!?]$/) 
        ? trimmedSentence 
        : trimmedSentence + '.';
      
      // Detect potential headlines (short sentences that introduce topics)
      const isHeadline = (
        trimmedSentence.length < 100 && 
        (
          trimmedSentence.toLowerCase().includes('guide to') ||
          trimmedSentence.toLowerCase().includes('national park') ||
          trimmedSentence.toLowerCase().includes('state park') ||
          trimmedSentence.toLowerCase().includes('campground') ||
          trimmedSentence.toLowerCase().includes('rv park') ||
          trimmedSentence.toLowerCase().includes('features include') ||
          trimmedSentence.toLowerCase().includes('benefits include') ||
          trimmedSentence.toLowerCase().includes('considerations include') ||
          (index > 0 && sentences[index - 1] && sentences[index - 1].trim().length < 80)
        )
      );
      
      if (isHeadline && index > 2) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-semibold text-white mt-12 mb-6">
            {formattedSentence}
          </h2>
        );
      }
      
      return (
        <p key={index} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
          {formattedSentence}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-[#1B2028] text-white px-6 py-3 text-base rounded-full font-medium">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-left leading-tight">{title}</h1>

      {description && (
        <div className="text-[#E2E8FF] text-xl md:text-2xl font-medium mb-12 text-left leading-relaxed">
          {description}
        </div>
      )}

      <div className="flex items-center gap-4 text-white/80 mb-12">
        <div className="bg-[#1B2028] w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg">
          {author.initials}
        </div>
        <span className="font-medium text-lg">{author.name}</span>
      </div>

      <div className="blog-content text-left space-y-4">
        {formatContent(content)}
      </div>
    </div>
  );
};
