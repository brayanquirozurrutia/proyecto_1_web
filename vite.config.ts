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
      'process.env.VITE_REACT_APP_BACKEND_URL': JSON.stringify(process.env.VITE_REACT_APP_BACKEND_URL),
      'process.env.VITE_USER_LOGIN_URL': JSON.stringify(process.env.VITE_USER_LOGIN_URL),
      'process.env.VITE_USER_LOGIN_TOKEN_URL': JSON.stringify(process.env.VITE_USER_LOGIN_TOKEN_URL),
    },
  });
};
