import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      types: path.resolve(__dirname, "src/types"),
      features: path.resolve(__dirname, "src/features"),
      app: path.resolve(__dirname, "src/app"),
      containers: path.resolve(__dirname, "src/containers"),
      theme: path.resolve(__dirname, "src/theme")
    },
  },
  server: {
    port: 3000,
  },
});
