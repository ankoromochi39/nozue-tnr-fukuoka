#!/usr/bin/env node

/**
 * Download all /images/ assets referenced in Home.tsx
 * Saves to client/public/images/
 * Handles HTTP redirects (307)
 * 
 * Usage: node download-assets.mjs
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = __dirname;
const HOME_TSX = path.join(PROJECT_ROOT, 'client/src/pages/Home.tsx');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'client/public/images');
const BASE_URL = 'https://3000-ir1amm2dkkasfkri8bqi7-a5d7d1e5.sg1.manus.computer';

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

// Read Home.tsx
const homeContent = fs.readFileSync(HOME_TSX, 'utf-8');

// Extract all /images/ URLs
const urlPattern = /\/manus-storage\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|png|webp|mp4|webm)/g;
const urls = new Set(homeContent.match(urlPattern) || []);

console.log(`\n📦 Found ${urls.size} unique assets to download:\n`);

// Download with redirect support
let downloaded = 0;
let failed = 0;

const downloadFile = (relativeUrl) => {
  return new Promise((resolve) => {
    const filename = path.basename(relativeUrl);
    const filepath = path.join(OUTPUT_DIR, filename);
    const fullUrl = `${BASE_URL}${relativeUrl}`;

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⊘ Already exists: ${filename}`);
      resolve();
      return;
    }

    const handleResponse = (response) => {
      // Handle redirects (307, 301, 302, etc.)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const redirectUrl = response.headers.location;
        const protocol = redirectUrl.startsWith('https') ? https : http;
        protocol.get(redirectUrl, handleResponse).on('error', (err) => {
          console.error(`✗ Redirect error: ${filename}`);
          failed++;
          resolve();
        });
        return;
      }

      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const sizeKB = (fs.statSync(filepath).size / 1024).toFixed(1);
          console.log(`✓ Downloaded: ${filename} (${sizeKB} KB)`);
          downloaded++;
          resolve();
        });
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {});
          console.error(`✗ Error writing: ${filename}`);
          failed++;
          resolve();
        });
      } else {
        console.error(`✗ HTTP ${response.statusCode}: ${filename}`);
        failed++;
        resolve();
      }
    };

    https.get(fullUrl, handleResponse).on('error', (err) => {
      console.error(`✗ Network error: ${filename} - ${err.message}`);
      failed++;
      resolve();
    });
  });
};

// Download all files sequentially
(async () => {
  for (const url of urls) {
    await downloadFile(url);
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Downloaded: ${downloaded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Location: ${OUTPUT_DIR}\n`);

  if (failed === 0) {
    console.log('✓ All assets downloaded successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Update Home.tsx to use relative paths:');
    console.log('      FROM: /images/filename_hash.jpg');
    console.log('      TO:   /images/filename_hash.jpg');
    console.log('   2. Commit to GitHub with the images folder');
    console.log('   3. Deploy - images will be served from client/public/\n');
  }
})();
