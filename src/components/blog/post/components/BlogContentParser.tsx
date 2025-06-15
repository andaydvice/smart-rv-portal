
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
  let orderedListItems: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const paragraphText = paragraphBuffer.join(' ');
      elements.push(
        <p key={`p-${elements.length}`} className="text-light-blue leading-relaxed mb-4">
          {parseInlineFormatting(paragraphText)}
        </p>
      );
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-outside space-y-3 my-4 pl-6 text-light-blue leading-relaxed">
          {listItems.map((item, index) => (
            <li key={index} className="text-balance">{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushOrderedList = () => {
    if (orderedListItems.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal list-outside space-y-3 my-4 pl-6 text-light-blue leading-relaxed">
          {orderedListItems.map((item, index) => (
            <li key={index} className="text-balance">{parseInlineFormatting(item)}</li>
          ))}
        </ol>
      );
      orderedListItems = [];
    }
  };

  lines.forEach((line, index) => {
    if (/^##\s/.test(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      elements.push(<h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-white">{parseInlineFormatting(line.substring(3))}</h2>);
    } else if (/^###\s/.test(line)) {
      flushParagraph();
      flushList();
      flushOrderedList();
      elements.push(<h3 key={index} className="text-xl font-bold mt-6 mb-3 text-[#E2E8FF]">{parseInlineFormatting(line.substring(4))}</h3>);
    } else if (/^\s*(-|\*)\s+/.test(line)) {
      flushParagraph();
      flushOrderedList();
      listItems.push(line.replace(/^\s*(-|\*)\s+/, ''));
    } else if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushList();
      orderedListItems.push(line.replace(/^\d+\.\s+/, ''));
    } else if (line.length > 0) {
      flushList();
      flushOrderedList();
      paragraphBuffer.push(line);
    } else { // Empty line
      flushParagraph();
      flushList();
      flushOrderedList();
    }
  });

  flushParagraph();
  flushList();
  flushOrderedList();

  return <div className="prose prose-invert max-w-none">{elements}</div>;
};

export const BlogContentParser: React.FC<BlogContentParserProps> = ({ content }) => {
  const allLines = content.split('\n').map(line => line.trim());
  const filteredLines = allLines.filter(Boolean);

  // Use the custom parser for content with markdown-like features.
  // The custom parser now needs all lines to detect context (like empty lines).
  if (hasMarkdownContent(allLines)) {
    return <CustomMarkdownParser lines={allLines} />;
  }
  
  // Check for RV Park list format if it's not markdown.
  if (hasRVParkContent(content)) {
    return <RVParkContentParser lines={filteredLines} />;
  }

  // Fallback for plain text.
  return <PlainTextContentParser lines={filteredLines} />;
};
