
import React from 'react';

export interface ParsedContent {
  elements: React.ReactNode[];
}

/**
 * Enhanced RV park name detection for "Top 10" style content
 */
export const isRVParkHeading = (line: string): boolean => {
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

/**
 * Check if content has RV park related content
 */
export const hasRVParkContent = (content: string): boolean => {
  return content.toLowerCase().includes('rv') && (
    content.toLowerCase().includes('park') || 
    content.toLowerCase().includes('campground') ||
    content.toLowerCase().includes('resort')
  );
};

/**
 * Check if content has markdown formatting
 */
export const hasMarkdownContent = (lines: string[]): boolean => {
  return lines.some(line =>
    /^#\s+/.test(line) ||
    /^##\s+/.test(line) ||
    /^###\s+/.test(line) ||
    /^(-|\*)\s+/.test(line) ||
    /^\d+\.\s+/.test(line)
  );
};

/**
 * Extract summary from content
 */
export const extractSummary = (content: string, summary?: string): string => {
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
