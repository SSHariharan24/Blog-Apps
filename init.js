const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), '.output', 'data');
const postsFile = path.join(dataDir, 'posts.json');

// Ensure data directory exists
fs.mkdirSync(dataDir, { recursive: true });

// Initialize posts.json if not exists
if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, '[]', 'utf-8');
}

console.log('Initialization complete (Cloudinary setup, no local uploads).');
