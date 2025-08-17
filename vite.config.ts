
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { staticGeneratorPlugin } from "./vite-plugins/static-generator";

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
    mode === 'production' && staticGeneratorPlugin(),
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
          vendor: ['react', 'react-dom'],
          mapbox: ['mapbox-gl'],
          query: ['@tanstack/react-query'],
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-popover']
        },
      },
    },
    target: 'es2020', // Ensure consistent target with optimizeDeps
    cssCodeSplit: true,
    reportCompressedSize: false, // Disable compressed size reporting for faster builds
    chunkSizeWarningLimit: 1000 // Increase chunk size warning limit
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
