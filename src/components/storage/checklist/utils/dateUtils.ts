
/**
 * Ensures input is a valid Date object or undefined
 * @param value Any value to convert to a Date (string, Date, undefined, null)
 * @returns A valid Date object or undefined
 */
export function ensureValidDate(value: string | Date | undefined | null): Date | undefined {
  if (!value) {
    return undefined;
  }
  
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? undefined : value;
  }
  
  try {
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  } catch (error) {
    console.error("Failed to parse date:", value);
    return undefined;
  }
}
