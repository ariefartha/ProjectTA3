import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: "https://project-backend-six.vercel.app",
=======
        target: "https://project-backend-six.vercel.app/",
>>>>>>> 9da7721908dfbdbf6017740206c88bb73ec49815
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
