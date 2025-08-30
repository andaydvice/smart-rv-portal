
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { staticGeneratorPlugin } from "./vite-plugins/static-generator";

// Force fresh deployment - cache clear 2024-08-24
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
    sourcemap: true, // Always enable sourcemaps for debugging
    minify: false, // DISABLED: esbuild minification was creating corrupted JS
    rollupOptions: {
      output: {
        // DISABLED: Manual chunks were causing module loading issues
        // manualChunks: undefined,
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    target: 'es2015', // More compatible target
    cssCodeSplit: false, // Keep CSS in single file
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000, // Allow larger chunks for unminified code
    modulePreload: {
      polyfill: true // Ensure module loading works
    },
    assetsInlineLimit: 0 // Don't inline assets
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
