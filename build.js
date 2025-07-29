#!/usr/bin/env node

// Build script for Cloudflare Pages deployment
import { build } from 'vite';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

console.log('🚀 Building Curioustube for Cloudflare Pages...');

// Step 1: Build the client-side application
console.log('📦 Building client application...');
await build({
  root: './client',
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  },
});

// Step 2: Build the server-side application
console.log('🔧 Building server application...');
const { build: esbuild } = await import('esbuild');

await esbuild({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/index.js',
  external: ['pg-native'],
  format: 'esm',
  banner: {
    js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`,
  },
});

// Step 3: Copy package.json for production dependencies
const packageJson = {
  "name": "curioustube",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.1",
    "drizzle-orm": "^0.36.4",
    "express": "^4.21.2",
    "zod": "^3.23.8"
  }
};

await fs.writeFile('dist/package.json', JSON.stringify(packageJson, null, 2));

// Step 4: Create _routes.json for Cloudflare Pages
const routesConfig = {
  "version": 1,
  "include": ["/api/*"],
  "exclude": ["/*"]
};

await fs.writeFile('dist/public/_routes.json', JSON.stringify(routesConfig, null, 2));

console.log('✅ Build complete! Ready for Cloudflare Pages deployment.');
console.log('📁 Built files are in the /dist directory');