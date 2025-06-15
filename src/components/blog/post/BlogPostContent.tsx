
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
  summary?: string; // Optional summary from blog post (future support)
}

export const BlogPostContent = ({
  category,
  title,
  author,
  description,
  content,
  summary,
}: BlogPostContentProps) => {
  // Extract the summary: prefer summary prop, then first paragraph, then first 2 sentences
  const getSummary = () => {
    if (summary) return summary;
    const lines = content.trim().split('\n');
    for (let line of lines) {
      if (line.trim().length > 40) {
        return line.trim();
      }
    }
    // fallback: first 2 sentences if no long paragraph found
    const sentences = content.split(/[.?!]\s+/).filter(Boolean);
    return sentences.slice(0, 2).join('. ') + (sentences.length > 1 ? '.' : '');
  };

  // Lightweight markdown-ish parser to handle titles, bullets, and numbered lists
  const parseContent = (raw: string) => {
    const lines = raw.split('\n').filter(Boolean);

    const elements: React.ReactNode[] = [];
    let buffer: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushBufferAsParagraph = () => {
      if (buffer.length) {
        elements.push(
          <p key={'para_' + elements.length} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
            {buffer.join(' ')}
          </p>
        );
        buffer = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Headings
      if (/^#\s+/.test(line)) {
        flushBufferAsParagraph();
        elements.push(
          <h1 key={'h1_' + elements.length} className="text-4xl md:text-5xl font-bold text-white mt-10 mb-5">{line.replace(/^#\s+/, '')}</h1>
        );
        continue;
      }
      if (/^##\s+/.test(line)) {
        flushBufferAsParagraph();
        elements.push(
          <h2 key={'h2_' + elements.length} className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-5">{line.replace(/^##\s+/, '')}</h2>
        );
        continue;
      }
      if (/^###\s+/.test(line)) {
        flushBufferAsParagraph();
        elements.push(
          <h3 key={'h3_' + elements.length} className="text-xl md:text-2xl font-semibold text-white mt-6 mb-4">{line.replace(/^###\s+/, '')}</h3>
        );
        continue;
      }

      // Unordered List
      if (/^(-|\*)\s+/.test(line)) {
        if (listType !== 'ul') {
          flushBufferAsParagraph();
          listType = 'ul';
          elements.push(
            <ul key={'ul_' + elements.length} className="mb-6 list-disc list-inside text-white/90 text-lg space-y-2 md:text-xl md:leading-8">
              {/* List items will be added here in-place below */}
            </ul>
          );
        }
        const lastIdx = elements.length - 1;
        const currentUl =
          elements[lastIdx] &&
          (elements[lastIdx] as React.ReactElement).type === 'ul'
            ? (elements[lastIdx] as React.ReactElement)
            : null;
        const li = (
          <li key={'li_' + i} className="ml-4">
            {line.replace(/^(-|\*)\s+/, '')}
          </li>
        );
        // Add to the last <ul> element
        if (currentUl) {
          // Create new children array or append
          const newUl = React.cloneElement(
            currentUl,
            {},
            [...(currentUl.props.children || []), li]
          );
          elements[lastIdx] = newUl;
        }
        continue;
      }

      // Ordered List
      if (/^\d+\.\s+/.test(line)) {
        if (listType !== 'ol') {
          flushBufferAsParagraph();
          listType = 'ol';
          elements.push(
            <ol key={'ol_' + elements.length} className="mb-6 list-decimal list-inside text-white/90 text-lg space-y-2 md:text-xl md:leading-8">
              {/* List items will be added here in-place below */}
            </ol>
          );
        }
        const lastIdx = elements.length - 1;
        const currentOl =
          elements[lastIdx] &&
          (elements[lastIdx] as React.ReactElement).type === 'ol'
            ? (elements[lastIdx] as React.ReactElement)
            : null;
        const li = (
          <li key={'oli_' + i} className="ml-4">
            {line.replace(/^\d+\.\s+/, '')}
          </li>
        );
        // Add to the last <ol> element
        if (currentOl) {
          // Create new children array or append
          const newOl = React.cloneElement(
            currentOl,
            {},
            [...(currentOl.props.children || []), li]
          );
          elements[lastIdx] = newOl;
        }
        continue;
      }

      // Blank line resets (end lists if any)
      if (line === '' || i === lines.length - 1) {
        flushBufferAsParagraph();
        listType = null;
        if (i === lines.length - 1 && line.length > 0) {
          buffer.push(line);
          flushBufferAsParagraph();
        }
        continue;
      }

      // Fallback: buffer the line for paragraph
      buffer.push(line);
      // If last line, flush
      if (i === lines.length - 1) {
        flushBufferAsParagraph();
      }
      // End list when not in a list anymore
      listType = null;
    }
    flushBufferAsParagraph();

    return elements;
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
        <div className="text-[#E2E8FF] text-xl md:text-2xl font-medium mb-6 text-left leading-relaxed">
          {description}
        </div>
      )}

      {/* Summary block */}
      <div className="bg-[#131a2a] border-l-4 border-connectivity-accent mb-12 px-6 py-6 rounded-2xl text-left shadow-lg">
        <h3 className="font-semibold text-connectivity-accent text-lg mb-2">Summary</h3>
        <p className="text-white/90 text-base md:text-lg leading-relaxed">{getSummary()}</p>
      </div>

      <div className="flex items-center gap-4 text-white/80 mb-12">
        <div className="bg-[#1B2028] w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg">
          {author.initials}
        </div>
        <span className="font-medium text-lg">{author.name}</span>
      </div>

      <div className="blog-content text-left space-y-4">
        {parseContent(content)}
      </div>
    </div>
  );
};
