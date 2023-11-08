// https://vitejs.dev/config/
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    eslintPlugin({
      exclude: ['/virtual:/', 'node_modules/**']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
