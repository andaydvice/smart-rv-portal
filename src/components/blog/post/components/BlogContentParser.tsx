
import React from 'react';
import { RVParkContentParser } from '../parsers/RVParkContentParser';
import { PlainTextContentParser } from '../parsers/PlainTextContentParser';
import { hasRVParkContent, hasMarkdownContent } from '../utils/contentParser';

interface BlogContentParserProps {
  content: string;
}

// Helper to parse a single line for bold text using `<strong>` tags.
const parseInlineFormatting = (line: string): React.ReactNode => {
    // Split the line by the bold markers (**...**)
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // Return a <strong> element for bolded text.
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

// A custom parser to render content with headlines, lists, and paragraphs.
const CustomMarkdownParser: React.FC<{ lines: string[] }> = ({ lines }) => {
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-3 my-4 pl-4 text-light-blue leading-relaxed">
          {listItems.map((item, index) => (
            <li key={index}>{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    if (/^##\s/.test(line)) {
      flushList();
      elements.push(<h2 key={index} className="text-3xl font-bold mt-8 mb-4 text-white">{parseInlineFormatting(line.substring(3))}</h2>);
    } else if (/^###\s/.test(line)) {
      flushList();
      elements.push(<h3 key={index} className="text-2xl font-bold mt-6 mb-3 text-[#E2E8FF]">{parseInlineFormatting(line.substring(4))}</h3>);
    } else if (/^\s*(-|\*)\s+/.test(line)) {
      listItems.push(line.replace(/^\s*(-|\*)\s+/, ''));
    } else {
      flushList();
      if (line.trim().length > 0) {
        const sentences = line.split(/(?<=[.?!])\s+/).filter(sentence => sentence.trim().length > 0);
        sentences.forEach((sentence, sIndex) => {
            elements.push(<p key={`${index}-${sIndex}`} className="text-light-blue leading-relaxed mb-4">{parseInlineFormatting(sentence)}</p>);
        });
      }
    }
  });

  flushList(); // Render any remaining list items

  return <div className="prose prose-invert max-w-none">{elements}</div>;
};

export const BlogContentParser: React.FC<BlogContentParserProps> = ({ content }) => {
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);

  // Use the custom parser for content with markdown-like features.
  if (hasMarkdownContent(lines)) {
    return <CustomMarkdownParser lines={lines} />;
  }
  
  // Check for RV Park list format if it's not markdown.
  if (hasRVParkContent(content)) {
    return <RVParkContentParser lines={lines} />;
  }

  // Fallback for plain text.
  return <PlainTextContentParser lines={lines} />;
};
