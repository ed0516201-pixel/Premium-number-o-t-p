const { execSync } = require('child_process');
const fs = require('fs');

const projectRoot = '/vercel/share/v0-project';

// List files in directory first
console.log('Files in project root:');
const files = fs.readdirSync(projectRoot);
files.forEach(f => console.log(`  - ${f}`));

const zipFiles = ['api.zip', 'artifacts.zip', 'lib.zip', 'scripts.zip'];

for (const zipFile of zipFiles) {
  const zipPath = `${projectRoot}/${zipFile}`;
  console.log(`\nChecking ${zipPath}...`);
  if (fs.existsSync(zipPath)) {
    console.log(`Extracting ${zipFile}...`);
    try {
      execSync(`unzip -o "${zipPath}" -d "${projectRoot}"`, { stdio: 'inherit' });
      console.log(`Done extracting ${zipFile}`);
    } catch (err) {
      console.log(`Error extracting ${zipFile}:`, err.message);
    }
  } else {
    console.log(`${zipFile} not found at ${zipPath}`);
  }
}

console.log('\nExtraction complete!');
