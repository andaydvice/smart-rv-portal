
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
   * Enhanced parser for "Top 10" RV park content - detects park names and creates subheadings
   */
  const parseContent = (raw: string) => {
    const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

    // Check if this looks like a Top 10 RV parks post
    const hasRVParkContent = raw.toLowerCase().includes('rv') && (
      raw.toLowerCase().includes('park') || 
      raw.toLowerCase().includes('campground') ||
      raw.toLowerCase().includes('resort')
    );

    if (hasRVParkContent) {
      const elements: React.ReactNode[] = [];
      let currentSection: string[] = [];
      let sectionCount = 0;

      // Enhanced RV park name detection
      const isRVParkHeading = (line: string) => {
        const lower = line.toLowerCase();
        
        // Numbered entries (1. Park Name, 10) Park Name, etc.)
        if (/^\d{1,2}[.)]\s*/.test(line)) return true;
        
        // Park/Resort/Campground names
        if (/(national park|state park|rv park|resort|campground|recreation area|koa)/i.test(line) && line.length < 80) return true;
        
        // Location-based names (City, State format)
        if (/^[A-Z][a-zA-Z\s',.-]+,\s*[A-Z]{2}$/i.test(line)) return true;
        
        // Proper nouns that look like place names (2-6 words, starts with capital)
        if (/^[A-Z][a-zA-Z\s'-]{10,60}$/.test(line) && line.split(' ').length <= 6 && !line.includes('.')) return true;
        
        return false;
      };

      const flushSection = () => {
        if (currentSection.length > 0) {
          elements.push(
            <p key={`section_${sectionCount}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
              {currentSection.join(' ')}
            </p>
          );
          currentSection = [];
          sectionCount++;
        }
      };

      lines.forEach((line, index) => {
        if (isRVParkHeading(line)) {
          // Flush any existing section content
          flushSection();
          
          // Create heading - remove number prefix if present
          const cleanTitle = line.replace(/^\d{1,2}[.)]\s*/, '');
          elements.push(
            <h2 key={`heading_${index}`} className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-4 first:mt-0">
              {cleanTitle}
            </h2>
          );
        } else if (line.length > 0) {
          // Add to current section
          currentSection.push(line);
        } else if (currentSection.length > 0) {
          // Empty line - flush current section
          flushSection();
        }
      });

      // Flush any remaining content
      flushSection();

      return elements;
    }

    // Fallback to original parser for other content types
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

    // Basic fallback for plain text
    const elements: React.ReactNode[] = [];
    let paragraphBuffer: string[] = [];

    lines.forEach((line, i) => {
      if (line.length > 0) {
        paragraphBuffer.push(line);
      }
      
      if (line === '' || i === lines.length - 1) {
        if (paragraphBuffer.length > 0) {
          elements.push(
            <p key={`para_${i}`} className="mb-6 text-white/90 text-lg leading-relaxed md:text-xl md:leading-8">
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
