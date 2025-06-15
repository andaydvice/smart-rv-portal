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

  /**
   * Enhanced parser: detects markdown OR automatically structures "Top 10"/plain text lists
   */
  const parseContent = (raw: string) => {
    const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

    // If markdown is detected, use the old parser logic
    const hasMarkdown =
      lines.some(line =>
        /^#\s+/.test(line) ||
        /^##\s+/.test(line) ||
        /^###\s+/.test(line) ||
        /^(-|\*)\s+/.test(line) ||
        /^\d+\.\s+/.test(line)
      );

    if (hasMarkdown) {
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
        const line = lines[i];

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
              <ul key={'ul_' + elements.length} className="mb-6 list-disc list-inside text-white/90 text-lg space-y-2 md:text-xl md:leading-8" />
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
          if (currentUl) {
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
              <ol key={'ol_' + elements.length} className="mb-6 list-decimal list-inside text-white/90 text-lg space-y-2 md:text-xl md:leading-8" />
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
          if (currentOl) {
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

        buffer.push(line);
        if (i === lines.length - 1) {
          flushBufferAsParagraph();
        }
        listType = null;
      }
      flushBufferAsParagraph();

      return elements;
    }

    // --------- New: Non-markdown fallback parser for "plain text" lists and headings -----------

    const elements: React.ReactNode[] = [];
    let paragraphBuffer: string[] = [];

    // Heuristics:
    // - Line starts with Top 10/Top 5/number. or number)
    // - Line is ALL CAPS or Title Case and fairly short (park/state/section)
    // - Else, treat as paragraph unless very short (skip e.g. empty lines)

    const headingRegex = /^(\d{1,2}[.)]|Top\s+\d+|[A-Z][\w\s']{3,30})/;
    const isLikelyHeading = (line: string) => {
      // Top N or starts with number + . or )
      if (/^\d{1,2}[.)]/.test(line)) return true;
      if (/^Top \d+/i.test(line)) return true;
      // Short, mostly starting upper, not a full sentence
      if (
        /^[A-Z][a-z' -]+(?:\s+[A-Z][a-z' -]+)*$/.test(line) &&
        line.length < 40
      ) return true;
      // Park/state names often, e.g. "Yellowstone National Park"
      if (line.split(' ').length < 7 && /^[A-Z]/.test(line) && !/[.?!]$/.test(line)) return true;
      return false;
    };

    lines.forEach((line, i) => {
      if (isLikelyHeading(line)) {
        // Flush existing paragraph
        if (paragraphBuffer.length) {
          elements.push(
            <p key={`para_${i}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
              {paragraphBuffer.join(' ')}
            </p>
          );
          paragraphBuffer = [];
        }
        // Add "heading"
        elements.push(
          <h2 key={`auto_h2_${i}`} className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-3">
            {line.replace(/^(\d+[.)]\s?)/, '')}
          </h2>
        );
      } else if (/^(-|\*)\s+/.test(line)) {
        // Bulleted list if dash/star present, even in plain text (rare, fallback)
        if (
          !elements.length ||
          (elements[elements.length - 1] as any).type !== 'ul'
        ) {
          elements.push(
            <ul key={`ul_auto_${i}`} className="mb-6 list-disc list-inside text-white/90 text-lg space-y-2 md:text-xl md:leading-8"></ul>
          );
        }
        const ulIdx = elements.length - 1;
        const currentUl = elements[ulIdx] as React.ReactElement;
        const li = (
          <li key={`li_auto_${i}`} className="ml-4">
            {line.replace(/^(-|\*)\s+/, '')}
          </li>
        );
        elements[ulIdx] = React.cloneElement(
          currentUl,
          {},
          [...(currentUl.props.children || []), li]
        );
      } else if (/^\d+\.\s+/.test(line)) {
        // Numbered lists if present (rare, fallback)
        if (
          !elements.length ||
          (elements[elements.length - 1] as any).type !== 'ol'
        ) {
          elements.push(
            <ol key={`ol_auto_${i}`} className="mb-6 list-decimal list-inside text-white/90 text-lg space-y-2 md:text-xl md:leading-8"></ol>
          );
        }
        const olIdx = elements.length - 1;
        const currentOl = elements[olIdx] as React.ReactElement;
        const li = (
          <li key={`oli_auto_${i}`} className="ml-4">
            {line.replace(/^\d+\.\s+/, '')}
          </li>
        );
        elements[olIdx] = React.cloneElement(
          currentOl,
          {},
          [...(currentOl.props.children || []), li]
        );
      } else {
        paragraphBuffer.push(line);
        // End of section or last line, flush paragraph
        if (
          i === lines.length - 1 ||
          (lines[i + 1] && isLikelyHeading(lines[i + 1]))
        ) {
          elements.push(
            <p key={`p_fallback_${i}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
              {paragraphBuffer.join(' ')}
            </p>
          );
          paragraphBuffer = [];
        }
      }
    });

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
