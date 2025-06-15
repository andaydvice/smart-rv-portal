
import React from 'react';

interface MarkdownContentParserProps {
  lines: string[];
}

export const MarkdownContentParser: React.FC<MarkdownContentParserProps> = ({ lines }) => {
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
        <h1 key={'h1_' + elements.length} className="text-4xl md:text-5xl font-bold text-white mt-10 mb-5">
          {line.replace(/^#\s+/, '')}
        </h1>
      );
      continue;
    }
    if (/^##\s+/.test(line)) {
      flushBufferAsParagraph();
      elements.push(
        <h2 key={'h2_' + elements.length} className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-5">
          {line.replace(/^##\s+/, '')}
        </h2>
      );
      continue;
    }
    if (/^###\s+/.test(line)) {
      flushBufferAsParagraph();
      elements.push(
        <h3 key={'h3_' + elements.length} className="text-xl md:text-2xl font-semibold text-white mt-6 mb-4">
          {line.replace(/^###\s+/, '')}
        </h3>
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

  return <>{elements}</>;
};
