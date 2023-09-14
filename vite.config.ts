import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
<<<<<<< HEAD
      features: path.resolve(__dirname, './src/features'),
      assets: path.resolve(__dirname, './src/assets'),
      Layout: path.resolve(__dirname, './src/Layout'),
      hooks: path.resolve(__dirname, './src/hooks'),
      pages: path.resolve(__dirname, './src/pages'),
      store: path.resolve(__dirname, './src/store'),
      types: path.resolve(__dirname, './src/types'),
      routes: path.resolve(__dirname, './src/routes'),
      components: path.resolve(__dirname, './src/components'),
=======
      '~': path.resolve(__dirname, 'src'), // Đặt đường dẫn "~" tới thư mục "src"
>>>>>>> 6d54aea511cabf66f6a637068e2f7b9a4a807e7f
    },
  },
});
