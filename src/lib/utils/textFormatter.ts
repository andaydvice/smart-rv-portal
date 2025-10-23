/**
 * Text formatting utilities for consistent AI output processing
 */

/**
 * Removes hyphens between words (but preserves them in numbers, dates, and codes)
 * Example: "Wi-Fi" -> "Wi Fi", but "2024-01-15" remains unchanged
 */
export function removeHyphens(text: string): string {
  return text.replace(/([a-zA-Z])-([a-zA-Z])/g, '$1 $2');
}

/**
 * Formats AI-generated paragraphs for better readability
 * - Removes markdown bold formatting
 * - Adds proper line breaks before bullet points
 * - Adds line breaks after colons and sentence-ending punctuation
 */
export function formatAIParagraphs(content: string): string {
  if (!content) return '';
  
  // Step 1: Remove markdown bold formatting
  let cleanText = content.replace(/\*\*/g, '');
  
  // Step 2: Remove hyphens between words
  cleanText = removeHyphens(cleanText);
  
  // Step 3: Add line breaks before bullet points if not already present
  cleanText = cleanText.replace(/([^\n])\s*•\s*/g, '$1\n\n• ');
  
  // Step 4: Add line breaks after lines ending with colon if followed by non-whitespace
  cleanText = cleanText.replace(/:\s*([^\s])/g, ':\n\n$1');
  
  // Step 5: Add line breaks after sentence-ending punctuation
  // Only break when followed by space and capital letter (start of new sentence)
  cleanText = cleanText.replace(/([.!?])\s*(?=[A-Z])/g, '$1\n\n');
  
  return cleanText;
}

/**
 * Cleans markdown formatting from text
 * Removes: **, __, *, _, code blocks, and other markdown syntax
 */
export function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*/g, '')  // Remove bold
    .replace(/__/g, '')     // Remove underline
    .replace(/\*/g, '')     // Remove italic
    .replace(/_/g, '')      // Remove italic alternative
    .replace(/`/g, '')      // Remove code
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); // Remove links but keep text
}

/**
 * Standardizes spacing in text
 * - Normalizes multiple spaces to single space
 * - Removes leading/trailing whitespace
 * - Standardizes line breaks
 */
export function standardizeSpacing(text: string): string {
  return text
    .replace(/\s+/g, ' ')           // Multiple spaces to single
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Multiple line breaks to double
    .trim();
}

/**
 * Complete text formatter - applies all formatting rules
 * Use this for processing AI responses before display
 */
export function formatAIResponse(text: string): string {
  if (!text) return '';
  
  let formatted = formatAIParagraphs(text);
  formatted = standardizeSpacing(formatted);
  
  return formatted;
}

/**
 * Splits formatted text into paragraphs for rendering
 */
export function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}
