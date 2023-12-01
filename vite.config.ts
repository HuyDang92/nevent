import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ url }) => {
      //         return url.pathname.startsWith('/api');
      //       },
      //       handler: 'CacheFirst' as const,
      //       options: {
      //         cacheName: 'api-cache',
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
  assetsInclude: ['**/*.riv'],
  resolve: {
    alias: {
      features: path.resolve(__dirname, './src/features'),
      assets: path.resolve(__dirname, './src/assets'),
      Layout: path.resolve(__dirname, './src/Layout'),
      hooks: path.resolve(__dirname, './src/hooks'),
      pages: path.resolve(__dirname, './src/pages'),
      store: path.resolve(__dirname, './src/store'),
      types: path.resolve(__dirname, './src/types'),
      routes: path.resolve(__dirname, './src/routes'),
      components: path.resolve(__dirname, './src/components'),
      '~': path.resolve(__dirname, 'src'), // Đặt đường dẫn "~" tới thư mục "src"
    },
  },
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
});
