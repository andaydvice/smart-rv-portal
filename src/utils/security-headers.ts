/* Security Headers for Vite/React App */

/* This file provides server-side security headers configuration */
/* These headers enhance the client-side meta tag security implementation */

export const securityHeaders = {
  // Content Security Policy - Prevents XSS attacks
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://cdn.jsdelivr.net https://www.google-analytics.com https://analytics.google.com https://adilo.bigcommand.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "object-src 'none'",
    "frame-src 'self' https://adilo.bigcommand.com https://www.youtube.com",
    "connect-src 'self' https://api.lovable.dev https://cdn.lovable.dev https://fonts.googleapis.com https://www.google-analytics.com",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join('; '),
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',
  
  // Enable XSS filtering
  'X-XSS-Protection': '1; mode=block',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Control browser features
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()',
  
  // Cross-Origin policies
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  
  // HTTPS enforcement (for production)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Cache control
  'Cache-Control': 'public, max-age=31536000, immutable',
  
  // Additional security headers
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-Download-Options': 'noopen',
  'Expect-CT': 'max-age=0'
};

/* 
 * For server-side implementation, add these headers to your web server configuration:
 * 
 * Nginx example:
 * add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'...";
 * add_header X-Frame-Options "DENY";
 * add_header X-Content-Type-Options "nosniff";
 * 
 * Apache example:
 * Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'..."
 * Header always set X-Frame-Options "DENY"
 * Header always set X-Content-Type-Options "nosniff"
 * 
 * Vercel/Netlify example (in vercel.json or netlify.toml):
 * "headers": [
 *   {
 *     "source": "/(.*)",
 *     "headers": [
 *       {
 *         "key": "Content-Security-Policy",
 *         "value": "default-src 'self'; script-src 'self' 'unsafe-inline'..."
 *       }
 *     ]
 *   }
 * ]
 */