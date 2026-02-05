// Vite configuration for the OpenCommit React app.
// This keeps the build simple and focused on the immutable commit UI.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // React plugin enables JSX transform and Fast Refresh.
  plugins: [react()],
});
