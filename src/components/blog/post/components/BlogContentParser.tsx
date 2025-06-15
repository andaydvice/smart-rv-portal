
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

  // Check content type and use appropriate parser
  if (hasRVParkContent(content)) {
    return <RVParkContentParser lines={lines} />;
  }

  if (hasMarkdownContent(lines)) {
    return <MarkdownContentParser lines={lines} />;
  }

  return <PlainTextContentParser lines={lines} />;
};
