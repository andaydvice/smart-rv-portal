
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 443,
      path: '/@vite/client',
      timeout: 120000,
      host: '95549a04-cacd-4e64-a52b-ecc6aed8e361.lovableproject.com',
      overlay: true,
      protocol: 'wss',
      // Add better reconnection handling
      reloadOnFailure: true
    },
    watch: {
      usePolling: true,
      interval: 1000 // Increase interval to reduce CPU usage
    },
    open: false,
    // SPA fallback for client-side routing
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'mapbox-gl', 
      '@tanstack/react-query', 
      'lucide-react'
    ],
    force: true,
    esbuildOptions: {
      target: 'es2020',
      treeShaking: true // Enable tree shaking for dependencies
    }
  },
  build: {
    sourcemap: mode === 'development',
    minify: mode === 'development' ? false : 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor libraries
          vendor: ['react', 'react-dom'],
          
          // Router and routing
          router: ['react-router-dom'],
          
          // UI libraries
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-accordion'],
          
          // Query and data fetching
          query: ['@tanstack/react-query'],
          
          // Maps and visualization
          mapbox: ['mapbox-gl', '@react-google-maps/api'],
          
          // Forms and validation
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Date utilities
          dates: ['date-fns'],
          
          // Charts and analytics
          charts: ['recharts', 'web-vitals'],
          
          // SEO and meta
          seo: ['react-helmet-async'],
          
          // Animation and motion
          motion: ['framer-motion']
        },
        // Better chunk naming for caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      },
      // Enable rollup treeshaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    target: 'es2020', // Ensure consistent target with optimizeDeps
    cssCodeSplit: true, // Split CSS for better caching
    reportCompressedSize: false, // Disable compressed size reporting for faster builds
    chunkSizeWarningLimit: 500 // Lower limit to encourage smaller chunks
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  css: {
    devSourcemap: mode === 'development' // Enable sourcemaps for CSS in dev
  },
  // Make environment variables available to the application
  define: {
    // This ensures process.env is not used directly
    'process.env': {}
  }
}));
