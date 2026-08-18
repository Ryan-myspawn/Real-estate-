import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// One-file build for offline sharing: no code-splitting, no asset hashing games.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-single",
    rollupOptions: { output: { inlineDynamicImports: true } },
    chunkSizeWarningLimit: 4000,
  },
});
