
import React from 'react';
import { RVParkContentParser } from '../parsers/RVParkContentParser';
import { MarkdownContentParser } from '../parsers/MarkdownContentParser';
import { PlainTextContentParser } from '../parsers/PlainTextContentParser';
import { hasRVParkContent, hasMarkdownContent } from '../utils/contentParser';

interface BlogContentParserProps {
  content: string;
}

export const BlogContentParser: React.FC<BlogContentParserProps> = ({ content }) => {
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);

  // Prioritize markdown content check because it's more explicit.
  if (hasMarkdownContent(lines)) {
    return <MarkdownContentParser lines={lines} />;
  }
  
  // Check for RV Park list format if it's not markdown.
  if (hasRVParkContent(content)) {
    return <RVParkContentParser lines={lines} />;
  }

  // Fallback for plain text.
  return <PlainTextContentParser lines={lines} />;
};
