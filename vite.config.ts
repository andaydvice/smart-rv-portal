
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
      usePolling: false, // Disabled polling for better performance
      interval: 300 
    },
    open: false,
  },
  plugins: [
    react({
      plugins: [] // Removed emotion plugin to fix build errors
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
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
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs'],
        },
      },
    },
    target: 'es2020',
    reportCompressedSize: false, // Improves build performance
    chunkSizeWarningLimit: 1000 // Increased limit for better bundle analysis
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}));
