import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  esbuild: {
    // Option to drop console and debugger in production (uncomment to enable)
    // drop: ['console', 'debugger'],
  },
  css: {
    // Enable CSS sourcemap for easier debugging of CSS
    devSourcemap: true,
  },
  plugins: [
    react(),
    // Synchronize the alias settings from tsconfig.json paths
    tsconfigPaths(),
    createSvgIconsPlugin({
      // Specify the folder where the icon files are stored
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Define the symbolId format for the icons
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    // Automatically open the browser
    open: true,
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console statements in production
        drop_console: true,
        // Remove debugger statements in production
        drop_debugger: true,
      },
    },
  },
});
