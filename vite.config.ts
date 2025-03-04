
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import autoprefixer from "autoprefixer";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
    strictPort: true,
    open: false,
    cors: true,
    hmr: {
      overlay: true,
    }
  },
  plugins: [
    react({
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    force: true
  },
  build: {
    sourcemap: mode === 'development',
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          routing: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast']
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    devSourcemap: true
  },
  // Improve HMR performance
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}));
