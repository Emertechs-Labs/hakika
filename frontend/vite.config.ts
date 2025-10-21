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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "lodash/isEqual": "lodash-es/isEqual",
      "lodash/cloneDeep": "lodash-es/cloneDeep",
      "lodash/merge": "lodash-es/merge",
      "lodash/get": "lodash-es/get",
      "lodash/set": "lodash-es/set",
      "lodash/has": "lodash-es/has",
      "lodash/isArray": "lodash-es/isArray",
      "lodash/isObject": "lodash-es/isObject",
      "lodash/isString": "lodash-es/isString",
      "lodash/isFunction": "lodash-es/isFunction",
      "lodash/debounce": "lodash-es/debounce",
      "lodash/throttle": "lodash-es/throttle",
    },
  },
  optimizeDeps: {
    exclude: ["@meshsdk/core-cst"],
    include: ["lodash-es"],
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
