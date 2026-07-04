import { defineConfig } from 'vite';

export default defineConfig({
  // Repo is served at https://<user>.github.io/HSC-Project/, so every
  // built asset path needs this prefix instead of assuming the domain root.
  base: '/HSC-Project/',
});
