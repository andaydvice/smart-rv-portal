import React from 'react';

export interface ParsedContent {
  elements: React.ReactNode[];
}

/**
 * Enhanced RV park name detection for "Top 10" style content
 */
export const isRVParkHeading = (line: string): boolean => {
  const trimmed = line.trim();
  
  // Numbered entries (1. Park Name, 10. Park Name, etc.)
  if (/^\d{1,2}\.\s+/.test(trimmed)) return true;
  
  // Also check for numbered entries with parentheses: 1) Park Name
  if (/^\d{1,2}\)\s+/.test(trimmed)) return true;
  
  return false;
};

/**
 * Check if content has RV park related content
 */
export const hasRVParkContent = (content: string): boolean => {
  const lower = content.toLowerCase();
  
  // Check for numbered list patterns AND RV/travel related keywords
  const hasNumberedList = /^\d{1,2}[.)]\s+/m.test(content);
  const hasRVKeywords = lower.includes('rv') || lower.includes('park') || lower.includes('campground') || lower.includes('resort');
  // This check is now simpler because hasMarkdownContent is checked first in the parser component.
  return hasNumberedList && hasRVKeywords;
};

/**
 * Check if content has markdown formatting (headings, bullets)
 */
export const hasMarkdownContent = (lines: string[]): boolean => {
  // We check for markdown first, so this can be more specific.
  // We don't check for numbered lists here to avoid ambiguity with RV Park lists.
  return lines.some(line =>
    /^#+\s+/.test(line) || // h1, h2, h3, etc.
    /^\s*(-|\*)\s+/.test(line) // bullet points
  );
};

/**
 * Extract summary from content
 */
export const extractSummary = (content: string, summary?: string): string => {
  if (summary) return summary;
  
  const lines = content.trim().split('\n').filter(line => line.trim().length > 0);
  
  // Find the first substantial paragraph (not a heading)
  for (let line of lines) {
    const trimmed = line.trim();
    // Skip numbered headings and short lines
    if (!isRVParkHeading(trimmed) && trimmed.length > 60) {
      return trimmed;
    }
  }
  
  // Fallback: first 2 sentences if no long paragraph found
  const sentences = content.split(/[.?!]\s+/).filter(Boolean);
  return sentences.slice(0, 2).join('. ') + (sentences.length > 1 ? '.' : '');
};
