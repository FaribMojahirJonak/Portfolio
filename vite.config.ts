
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      minify: true,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'motion': ['motion/react'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });