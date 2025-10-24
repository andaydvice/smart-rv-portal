/**
 * Author Byline Component
 *
 * Displays author information ONLY when real, verified data is available
 * Will not render if author profile contains placeholder data
 */

import React from 'react';
import { getAuthor, validateAuthorProfile } from './authors';

interface AuthorBylineProps {
  authorId: string;
  showBio?: boolean;
  showCredentials?: boolean;
  className?: string;
}

export const AuthorByline: React.FC<AuthorBylineProps> = ({
  authorId,
  showBio = false,
  showCredentials = false,
  className = '',
}) => {
  const author = getAuthor(authorId);

  // Don't render if author doesn't exist or has placeholder data
  if (!author || !validateAuthorProfile(author)) {
    if (import.meta.env.DEV) {
      console.warn(
        `AuthorByline: Author "${authorId}" not rendered - ` +
        `author doesn't exist or contains placeholder data. ` +
        `Update src/components/seo/authors.ts with real information.`
      );
    }
    return null;
  }

  return (
    <div className={`author-byline ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {author.image && (
          <img
            src={author.image}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm text-gray-400">Written by</p>
          <p className="font-semibold text-white">
            {author.name}
            {author.role && <span className="text-gray-400 font-normal"> • {author.role}</span>}
          </p>
        </div>
      </div>

      {showBio && author.bio && (
        <p className="text-gray-300 text-sm mb-3">{author.bio}</p>
      )}

      {showCredentials && author.credentials.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {author.credentials.map((credential, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded"
            >
              {credential}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Usage Example:
 *
 * import { AuthorByline } from '@/components/seo/AuthorByline';
 *
 * // Basic usage
 * <AuthorByline authorId="your-author-id" />
 *
 * // With bio and credentials
 * <AuthorByline
 *   authorId="your-author-id"
 *   showBio={true}
 *   showCredentials={true}
 * />
 *
 * IMPORTANT: Component will NOT render until real author data is added to
 * src/components/seo/authors.ts and published flag is set to true
 */
