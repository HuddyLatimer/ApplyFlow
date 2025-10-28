const fs = require('fs');
const path = require('path');

// Simple PNG generator using data URI
// This creates a basic blue square with "AF" text

function createSimplePNG(size) {
  // Create SVG
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.35}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">AF</text>
</svg>`;
  return svg;
}

const publicDir = path.join(__dirname, 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write SVG files (Chrome supports SVG icons)
const icon48 = createSimplePNG(48);
const icon128 = createSimplePNG(128);

fs.writeFileSync(path.join(publicDir, 'icon48.svg'), icon48);
fs.writeFileSync(path.join(publicDir, 'icon128.svg'), icon128);

console.log('✓ Icon SVG files created in public/');
console.log('  - icon48.svg');
console.log('  - icon128.svg');
console.log('\nNote: These will be copied to dist/ during build.');
