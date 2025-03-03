
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
      timeout: 300000, // Extended timeout for more stable connections
      host: mode === 'development' ? 'lovableproject.com' : 'lovable.app',
      overlay: false, // Disable overlay to prevent additional connection issues
      protocol: 'wss',
      reloadOnFailure: true,
      reconnect: 10 // Increase reconnection attempts
    },
    watch: {
      usePolling: true,
      interval: 300
    },
    open: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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
    include: ['react', 'react-dom'],
    force: true,
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    sourcemap: mode === 'development',
    minify: mode === 'development' ? false : 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    target: 'es2020',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    assetsDir: 'assets',
  },
  css: {
    // Improve CSS processing and MIME type handling
    postcss: {
      plugins: [require('autoprefixer')],
    },
    modules: {
      localsConvention: 'camelCase',
    },
    devSourcemap: true // Add source maps for better debugging
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    supported: {
      // Ensure modern CSS syntax is supported
      'nesting-rules': true
    }
  }
}));
