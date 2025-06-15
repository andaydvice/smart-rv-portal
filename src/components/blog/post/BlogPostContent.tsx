
import React from 'react';
import { BlogPostHeader } from './components/BlogPostHeader';
import { BlogContentParser } from './components/BlogContentParser';
import { extractSummary } from './utils/contentParser';

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
  summary?: string;
}

const preventWidow = (text: string) => {
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    return `${text.substring(0, lastSpace)}\u00A0${text.substring(lastSpace + 1)}`;
  }
  return text;
};

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
  summary,
}: BlogPostContentProps) => {
  const extractedSummary = extractSummary(content, summary);
  const summarySentences = extractedSummary
    .split(/(?<=[.?!])\s+/)
    .filter((sentence) => sentence.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <BlogPostHeader
        category={category}
        title={title}
        description={description ? preventWidow(description) : undefined}
        author={author}
      />

      {summarySentences.length > 0 && (
        <div className="my-8 p-6 bg-connectivity-darkBg border-l-4 border-connectivity-accent rounded-r-lg shadow-lg text-left">
          {summarySentences.map((sentence, index) => (
            <p
              key={index}
              className="text-light-blue leading-relaxed md:text-lg [&:not(:last-child)]:mb-4"
            >
              {preventWidow(sentence)}
            </p>
          ))}
        </div>
      )}

      <div className="blog-content text-left space-y-4">
        <BlogContentParser content={content} />
      </div>
    </div>
  );
};
