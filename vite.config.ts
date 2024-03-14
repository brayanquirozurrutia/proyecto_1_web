import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { loadEnv, UserConfigExport } from 'vite';

export default ({ mode }: { mode: string }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      strictPort: false,
      port: 3000,
    },
    define: {
      'process.env': process.env
    }
  });
};
