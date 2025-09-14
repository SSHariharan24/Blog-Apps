const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), '.output', 'data');
const uploadsDir = path.join(process.cwd(), '.output', 'public', 'uploads');
const postsFile = path.join(dataDir, 'posts.json');

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadsDir, { recursive: true });

if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, '[]', 'utf-8');
}

console.log('Initialization complete.');
