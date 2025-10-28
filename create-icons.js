// Simple script to create icon files for the extension
const fs = require('fs');
const path = require('path');

// Create SVG icon
const createIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">AF</text>
</svg>`;
};

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write icon files
fs.writeFileSync(path.join(publicDir, 'icon48.svg'), createIcon(48));
fs.writeFileSync(path.join(publicDir, 'icon128.svg'), createIcon(128));

console.log('Icons created successfully!');
console.log('Note: For production, convert these SVG files to PNG format.');
console.log('You can use online tools like https://cloudconvert.com/svg-to-png');
