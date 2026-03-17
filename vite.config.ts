/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'), // ← was __dirname
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'), // ← was __dirname
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: id => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('@/'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/__stories__/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.d.ts',
        'src/**/*.mdx',
        'src/**/types.ts',
        'src/**/index.css',
        'src/**/index.ts',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
          exclude: ['node_modules', 'dist'],
          setupFiles: ['./vitest.setup.ts', './vitest.coverage.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});