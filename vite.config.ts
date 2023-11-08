import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    build: {
      outDir: "dev-dist",
    },
   plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true // For making sure that the PWA is testable from the Local dev environment
      },
      manifest: {
        name: "Sports zaga application",
        short_name: "Sports zaga",
        icons: [
          {
            "src": "/favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "/favicon-16x16.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/favicon-32x32.png",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/android-chrome-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/android-chrome-512x512.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any maskable" // Icon format that ensures that your PWA icon looks great on all Android devices
          }
        ],
        theme_color: '#AAF',
      },
    }),
  ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
  });
};