const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

console.log('Working directory:', projectRoot);
console.log('Files in directory:', fs.readdirSync(projectRoot));

const zipFiles = ['api.zip', 'artifacts.zip', 'lib.zip', 'scripts.zip'];

for (const zipFile of zipFiles) {
  const zipPath = path.join(projectRoot, zipFile);
  console.log(`\nChecking ${zipPath}...`);
  
  if (fs.existsSync(zipPath)) {
    console.log(`Found ${zipFile}, extracting...`);
    try {
      execSync(`unzip -o "${zipPath}" -d "${projectRoot}"`, { stdio: 'inherit' });
      console.log(`Successfully extracted ${zipFile}`);
    } catch (err) {
      console.error(`Error extracting ${zipFile}:`, err.message);
    }
  } else {
    console.log(`${zipFile} not found`);
  }
}

console.log('\nFinal directory structure:');
function listDir(dir, indent = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item.startsWith('.')) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    console.log(`${indent}${item}${stat.isDirectory() ? '/' : ''}`);
    if (stat.isDirectory() && indent.length < 6) {
      listDir(fullPath, indent + '  ');
    }
  }
}
listDir(projectRoot);
