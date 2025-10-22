import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    wasm(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") }
    ],
  },
  optimizeDeps: {
    exclude: []
  },
  define: {
    global: "globalThis",
  },
  build: {
    target: "esnext",
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress sourcemap warnings for Cardano SDK
        if (warning.code === 'SOURCEMAP_ERROR' && warning.message.includes('@cardano-sdk')) {
          return;
        }
        warn(warning);
      }
    }
  },
}));
