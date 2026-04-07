// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Tell Vitest to use jsdom for all tests
    environment: 'jsdom', 
    
    // (Optional) If you want to enable globals like expect/describe everywhere
    // globals: true, 
  },
});