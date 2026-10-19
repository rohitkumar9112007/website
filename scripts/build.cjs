const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const clientDir = path.join(rootDir, 'client');
const clientDist = path.join(clientDir, 'dist');
const rootDist = path.join(rootDir, 'dist');

console.log('==> Installing client dependencies...');
execSync('npm install', { cwd: clientDir, stdio: 'inherit' });

console.log('==> Building client with Vite...');
execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

console.log('==> Mirroring client/dist to root dist for multi-target Vercel compatibility...');
if (fs.existsSync(clientDist)) {
  fs.cpSync(clientDist, rootDist, { recursive: true });
  console.log('==> Build completed successfully! (client/dist and dist are synced)');
} else {
  console.error('==> Error: client/dist was not found!');
  process.exit(1);
}
