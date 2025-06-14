
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

// Utility: Parse content into structured, readable sections
function parseContentIntoSections(content: string) {
  const elements: JSX.Element[] = [];
  
  // Split content into sentences and group them logically
  const sentences = content.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  
  // Create structured sections with proper headings
  const sections = [
    {
      title: "Advanced Security Features",
      content: sentences.slice(0, 4).join(' ')
    },
    {
      title: "Smart Monitoring Capabilities", 
      content: sentences.slice(4, 8).join(' ')
    },
    {
      title: "Remote Access and Control",
      content: sentences.slice(8, 12).join(' ')
    },
    {
      title: "Installation and Maintenance",
      content: sentences.slice(12, 16).join(' ')
    },
    {
      title: "Benefits and Peace of Mind",
      content: sentences.slice(16).join(' ')
    }
  ];

  sections.forEach((section, index) => {
    if (section.content.trim()) {
      // Add section heading
      elements.push(
        <h2 key={`section-${index}`} className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6 first:mt-0">
          {section.title}
        </h2>
      );
      
      // Split section content into readable paragraphs
      const paragraphs = section.content.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(p => p.trim().length > 0);
      
      paragraphs.forEach((paragraph, pIndex) => {
        elements.push(
          <p key={`para-${index}-${pIndex}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8 text-left">
            {paragraph.trim()}
          </p>
        );
      });
    }
  });

  return elements;
}

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
}: BlogPostContentProps) => {
  const contentElements = parseContentIntoSections(content);

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
