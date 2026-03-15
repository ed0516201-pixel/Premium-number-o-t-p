const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const zipFiles = ['api.zip', 'artifacts.zip', 'lib.zip', 'scripts.zip'];

for (const zipFile of zipFiles) {
  const zipPath = path.join(projectRoot, zipFile);
  if (fs.existsSync(zipPath)) {
    console.log(`Extracting ${zipFile}...`);
    execSync(`unzip -o "${zipPath}" -d "${projectRoot}"`, { stdio: 'inherit' });
    console.log(`Done extracting ${zipFile}`);
  } else {
    console.log(`${zipFile} not found, skipping...`);
  }
}

console.log('All zip files extracted successfully!');
