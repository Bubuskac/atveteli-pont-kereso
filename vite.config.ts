import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@apollo/client/core", "@apollo/client/cache", "@apollo/client/link/http"]
  },
  resolve: {
    alias: {
      "@apollo/client/react": "@apollo/client/react/index.js"
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      "/graphql/public": {
        target: "https://api.beta.deliverygateway.io/graphql/public",
        changeOrigin: true,
        secure: false,
        rewrite: () => ""}
      }
  }
});
