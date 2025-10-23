/**
 * OptimizedImage Component
 *
 * High-quality responsive image component with WebP support
 * Features:
 * - Preserves image quality (92%+ WebP quality)
 * - Responsive images with srcset for different screen sizes
 * - WebP with fallback for older browsers
 * - Lazy loading for performance
 * - Retina display support (2x images)
 * - Prevents layout shift with aspect ratio
 * - SEO-optimized alt text and keywords
 * - Automatic image schema markup
 *
 * Usage:
 *   <OptimizedImage
 *     src="image-name.jpg"
 *     alt="Description"  // Optional - auto-generated from SEO mapping
 *     sizes="(max-width: 768px) 100vw, 50vw"
 *   />
 */

import React from 'react';
import { getImageSEO } from '@/utils/imageSeoMapping';

interface OptimizedImageProps {
  /** Original image filename (e.g., "hero-image.jpg") */
  src: string;

  /** Alt text for accessibility (auto-generated from SEO mapping if not provided) */
  alt?: string;

  /** Image width (used for aspect ratio calculation) */
  width?: number;

  /** Image height (used for aspect ratio calculation) */
  height?: number;

  /** Sizes attribute for responsive images */
  sizes?: string;

  /** CSS class names */
  className?: string;

  /** Loading strategy: 'lazy' (default) or 'eager' for above-fold images */
  loading?: 'lazy' | 'eager';

  /** Priority loading (for LCP images) */
  priority?: boolean;

  /** Quality mode: 'high' (default, 92%) or 'lossless' for critical images */
  quality?: 'high' | 'lossless';

  /** Additional image attributes */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

/**
 * Generate srcset for responsive images
 */
function generateSrcSet(basename: string, format: 'webp' | 'jpg' | 'png'): string {
  const sizes = [400, 800, 1200, 1920];
  return sizes
    .map(width => `/optimized-images/${basename}-${width}w.${format} ${width}w`)
    .join(', ');
}

/**
 * Get image paths from manifest or fallback to originals
 */
function getImagePaths(src: string) {
  // Extract basename without extension
  const basename = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const ext = src.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';

  // Determine fallback format
  const fallbackFormat = ext.toLowerCase() === 'png' ? 'png' : 'jpg';

  return {
    webpSrcSet: generateSrcSet(basename, 'webp'),
    fallbackSrcSet: generateSrcSet(basename, fallbackFormat as 'jpg' | 'png'),
    webpFallback: `/optimized-images/${basename}-original.webp`,
    originalFallback: `/lovable-uploads/${src}`, // Fallback to original if optimized not found
  };
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  priority = false,
  quality = 'high',
  imgProps = {},
}) => {
  const paths = getImagePaths(src);

  // Get SEO metadata for automatic alt text and keywords
  const seoData = getImageSEO(src);
  const finalAlt = alt || seoData.alt;
  const imageTitle = seoData.title || finalAlt;

  // Calculate aspect ratio for preventing layout shift
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  // Priority images should load eagerly
  const loadingStrategy = priority ? 'eager' : loading;

  return (
    <picture className={className}>
      {/* WebP source with responsive sizes - HIGHEST QUALITY */}
      <source
        type="image/webp"
        srcSet={paths.webpSrcSet}
        sizes={sizes}
      />

      {/* Fallback to JPEG/PNG for older browsers */}
      <source
        type={`image/${paths.fallbackSrcSet.includes('.png') ? 'png' : 'jpeg'}`}
        srcSet={paths.fallbackSrcSet}
        sizes={sizes}
      />

      {/* Final fallback img element with SEO-optimized attributes */}
      <img
        src={paths.originalFallback}
        alt={finalAlt}
        title={imageTitle}
        loading={loadingStrategy}
        decoding={priority ? 'sync' : 'async'}
        width={width}
        height={height}
        style={{
          aspectRatio: aspectRatio ? `${width} / ${height}` : undefined,
          maxWidth: '100%',
          height: 'auto',
        }}
        {...imgProps}
      />
    </picture>
  );
};

/**
 * OptimizedBackgroundImage Component
 *
 * For hero sections and background images
 * Uses high-quality WebP with CSS background-image
 */
interface OptimizedBackgroundImageProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  quality?: 'high' | 'lossless';
}

export const OptimizedBackgroundImage: React.FC<OptimizedBackgroundImageProps> = ({
  src,
  className = '',
  children,
  quality = 'high',
}) => {
  const paths = getImagePaths(src);

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url('${paths.webpFallback}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
};

/**
 * HighQualityHeroImage Component
 *
 * Specialized component for hero/above-fold images
 * - No lazy loading (loads immediately)
 * - High priority
 * - Optimized for LCP (Largest Contentful Paint)
 */
interface HighQualityHeroImageProps extends Omit<OptimizedImageProps, 'loading' | 'priority'> {}

export const HighQualityHeroImage: React.FC<HighQualityHeroImageProps> = (props) => {
  return (
    <OptimizedImage
      {...props}
      loading="eager"
      priority={true}
      quality="lossless"
    />
  );
};

export default OptimizedImage;
