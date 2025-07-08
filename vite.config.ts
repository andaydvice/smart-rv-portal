
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
    minify: mode === 'development' ? false : 'terser',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          // Maps chunk
          if (id.includes('mapbox') || id.includes('map')) {
            return 'maps';
          }
          // UI components chunk
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui';
          }
          // Analytics chunk
          if (id.includes('analytics') || id.includes('recharts')) {
            return 'analytics';
          }
          // Utils chunk
          if (id.includes('utils') && !id.includes('node_modules')) {
            return 'utils';
          }
          // Large dependencies
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType || '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 150, // Stricter chunk size limits
    assetsInlineLimit: 4096 // Inline small assets
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
