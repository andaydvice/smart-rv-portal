#!/usr/bin/env node

// Build verification script to ensure all critical files are present
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build environment...');

// Critical files that MUST exist for build to work
const criticalFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  'src/main.tsx',
  'src/App.tsx'
];

// Check for critical files
let allFilesPresent = true;
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Present`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesPresent = false;
  }
});

// Check package.json content
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Project name: ${packageJson.name}`);
  console.log(`✅ Scripts available: ${Object.keys(packageJson.scripts).join(', ')}`);
} catch (error) {
  console.log('❌ Failed to read package.json');
  allFilesPresent = false;
}

// Check if dist directory can be created
try {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
    console.log('✅ dist directory created');
  } else {
    console.log('✅ dist directory exists');
  }
} catch (error) {
  console.log('❌ Cannot create dist directory');
}

if (allFilesPresent) {
  console.log('🎉 All critical files present - build should succeed!');
  process.exit(0);
} else {
  console.log('💥 Missing critical files - build will fail!');
  process.exit(1);
}