
import React from 'react';

interface BlogPostSummaryProps {
  summary: string;
}

export const BlogPostSummary: React.FC<BlogPostSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-[#131a2a] border-l-4 border-connectivity-accent mb-12 px-6 py-6 rounded-2xl text-left shadow-lg">
      <h3 className="font-semibold text-connectivity-accent text-lg mb-2">Summary</h3>
      <p className="text-white/90 text-base md:text-lg leading-relaxed">{summary}</p>
    </div>
  );
};
