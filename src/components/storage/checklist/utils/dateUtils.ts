
/**
 * Utility function to ensure a value is a valid Date object or undefined
 * Handles various input types safely with proper type checking
 */
export const ensureValidDate = (value: any): Date | undefined => {
  // Handle null, undefined, and falsy values
  if (!value) return undefined;
  
  // If it's already a Date object, validate it
  if (value instanceof Date) {
    // Check if it's a valid date (not NaN)
    return isNaN(value.getTime()) ? undefined : value;
  }
  
  // If it's a string, try to parse it
  if (typeof value === 'string') {
    try {
      const parsedDate = new Date(value);
      // Check if it's a valid date
      return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    } catch (error) {
      console.error("Invalid date string:", value);
      return undefined;
    }
  }
  
  // For any other type, return undefined
  return undefined;
};

/**
 * Format a date value consistently regardless of input type
 * Returns a formatted string or a placeholder if the date is invalid
 */
export const formatSafeDate = (
  value: Date | string | null | undefined, 
  format: string = 'default'
): string => {
  const date = ensureValidDate(value);
  
  if (!date) return '';
  
  try {
    switch (format) {
      case 'short':
        return date.toLocaleDateString();
      case 'long':
        return date.toLocaleDateString(undefined, { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'iso':
        return date.toISOString();
      case 'default':
      default:
        return date.toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return '';
  }
};
