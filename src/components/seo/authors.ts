/**
 * Author Profile Template
 *
 * IMPORTANT: This is a TEMPLATE ONLY
 * Replace [PLACEHOLDER] values with REAL, VERIFIED information
 * DO NOT publish with placeholder data
 */

export interface AuthorProfile {
  id: string;
  name: string; // REQUIRED: Real full name
  role: string; // REQUIRED: Actual job title/role
  bio: string; // REQUIRED: Real professional biography
  credentials: string[]; // REQUIRED: Only REAL certifications (e.g., "RVIA Certified Technician")
  experience: string; // REQUIRED: Actual years/background
  specialties: string[]; // REQUIRED: Real areas of expertise
  email?: string; // Optional: Real contact email
  linkedin?: string; // Optional: Real LinkedIn profile URL
  image?: string; // Optional: Real headshot photo path
  published: boolean; // Set to false until real data is added
}

/**
 * TEMPLATE - Replace with real author information before publishing
 */
export const authorTemplates: Record<string, AuthorProfile> = {
  // Example structure - DO NOT USE AS-IS
  'template-author': {
    id: 'template-author',
    name: '[REAL AUTHOR NAME NEEDED]',
    role: '[REAL ROLE/TITLE NEEDED]',
    bio: '[REAL BIOGRAPHY NEEDED - Include actual experience, background, and qualifications]',
    credentials: [
      '[REAL CERTIFICATION 1]',
      '[REAL CERTIFICATION 2]',
      // Only add VERIFIED credentials
    ],
    experience: '[REAL EXPERIENCE DESCRIPTION NEEDED]',
    specialties: [
      '[REAL SPECIALTY 1]',
      '[REAL SPECIALTY 2]',
      // Only add TRUE areas of expertise
    ],
    email: undefined, // Add real email if author wants to be contacted
    linkedin: undefined, // Add real LinkedIn URL if available
    image: undefined, // Add real headshot path if available
    published: false, // KEEP FALSE until real data is added
  },
};

/**
 * Get author profile by ID
 * Returns null if author doesn't exist or isn't published
 */
export function getAuthor(id: string): AuthorProfile | null {
  const author = authorTemplates[id];

  if (!author || !author.published) {
    console.warn(`Author ${id} not found or not published`);
    return null;
  }

  return author;
}

/**
 * Validate author profile has real data (not placeholders)
 */
export function validateAuthorProfile(author: AuthorProfile): boolean {
  const hasPlaceholders =
    author.name.includes('[') ||
    author.role.includes('[') ||
    author.bio.includes('[') ||
    author.credentials.some(c => c.includes('[')) ||
    author.experience.includes('[') ||
    author.specialties.some(s => s.includes('['));

  if (hasPlaceholders) {
    console.error('Author profile contains placeholder data!');
    return false;
  }

  return true;
}

/**
 * Generate Person schema for author
 * Only use for published authors with verified data
 */
export function generateAuthorSchema(author: AuthorProfile) {
  if (!validateAuthorProfile(author)) {
    throw new Error('Cannot generate schema for author with placeholder data');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.specialties,
    email: author.email,
    sameAs: author.linkedin ? [author.linkedin] : undefined,
  };
}

/**
 * Author Byline Component Template
 *
 * Usage:
 * import { AuthorByline } from '@/components/seo/AuthorByline';
 *
 * <AuthorByline authorId="template-author" />
 */
