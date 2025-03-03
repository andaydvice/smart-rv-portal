
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
    cors: true
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
  },
  build: {
    sourcemap: mode === 'development',
    minify: 'esbuild',
    target: 'es2020',
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    devSourcemap: true
  }
}));
