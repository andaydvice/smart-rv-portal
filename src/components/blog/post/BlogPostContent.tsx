
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

// Utility: Parse markdown-style content into structured elements
function parseMarkdownContent(content: string) {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listIndex = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listIndex++}`} className="list-disc list-inside space-y-2 mb-6 text-white/90 text-lg md:text-xl leading-relaxed">
          {currentList.map((item, idx) => (
            <li key={idx} className="ml-4">{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for section headers (## Header or auto-detect)
    if (trimmed.startsWith('## ')) {
      flushList();
      const headerText = trimmed.substring(3).trim();
      elements.push(
        <h2 key={`header-${index}`} className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6 first:mt-0">
          {headerText}
        </h2>
      );
    }
    // Check for bullet points
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const bulletText = trimmed.substring(2).trim();
      currentList.push(bulletText);
    }
    // Auto-detect likely headlines (capitalize and promote)
    else if (isLikelyHeadline(trimmed)) {
      flushList();
      elements.push(
        <h2 key={`auto-header-${index}`} className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6 first:mt-0">
          {parseInlineMarkdown(trimmed)}
        </h2>
      );
    }
    // Regular paragraph
    else {
      flushList();
      elements.push(
        <p key={`para-${index}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8 text-left">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  // Don't forget to flush any remaining list
  flushList();

  return elements;
}

// Parse inline markdown like **bold** and *italic*
function parseInlineMarkdown(text: string): React.ReactNode {
  // Handle **bold**
  let result: React.ReactNode = text;
  
  // Replace **bold** with <strong>
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts = text.split(boldRegex);
  
  if (parts.length > 1) {
    result = parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-white">{part}</strong>;
      }
      return part;
    });
  }
  
  return result;
}

// Utility: Determines if a line is likely a headline
function isLikelyHeadline(line: string) {
  return (
    line.length >= 10 &&
    line.length <= 80 &&
    !/[.?!]$/.test(line.trim()) && // Doesn't end with sentence punctuation
    /^[A-Z]/.test(line.trim()) && // Starts capitalized
    // Additional checks for headline-like content
    (line.includes('RV') || line.includes('System') || line.includes('Smart') || 
     line.includes('Security') || line.includes('Technology') || line.includes('Benefits') ||
     /^[A-Z][a-z]+ [A-Z][a-z]+/.test(line)) // Title Case pattern
  );
}

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
}: BlogPostContentProps) => {
  const contentElements = parseMarkdownContent(content);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-[#1B2028] text-white px-4 py-2 text-sm rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-left">{title}</h1>

      {description && (
        <div className="text-[#E2E8FF] text-xl md:text-2xl font-medium mb-8 text-left leading-relaxed">
          {description}
        </div>
      )}

      <div className="flex items-center gap-3 text-white/80 mb-10">
        <div className="bg-[#1B2028] w-10 h-10 rounded-full flex items-center justify-center font-semibold">
          {author.initials}
        </div>
        <span className="font-medium">{author.name}</span>
      </div>

      <div className="blog-content text-left">
        {contentElements}
      </div>
    </div>
  );
};
