import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://project-backend-six.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
