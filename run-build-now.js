#!/usr/bin/env node

// PROVE THE BUILD WORKS - Show actual output
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 PROVING BUILD EXECUTION WITH REAL OUTPUT');
console.log('============================================\n');

// Step 1: Show current directory and package.json
console.log('1️⃣ ENVIRONMENT CHECK:');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('Project:', packageJson.name);
  console.log('Build script:', packageJson.scripts.build);
} catch (e) {
  console.log('❌ Cannot read package.json');
}

// Step 2: Clean and build
console.log('\n2️⃣ CLEANING AND BUILDING:');
console.log('Removing existing dist folder...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
  console.log('✅ Old dist folder removed');
}

console.log('\n🔨 RUNNING: npm run build');
console.log('---------------------------------------');
try {
  const buildOutput = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ BUILD SUCCESS - OUTPUT:');
  console.log(buildOutput);
} catch (error) {
  console.log('❌ BUILD FAILED:');
  console.log('Exit code:', error.status);
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
  process.exit(1);
}

// Step 3: Verify dist folder
console.log('\n3️⃣ DIST FOLDER VERIFICATION:');
console.log('---------------------------------------');

if (fs.existsSync('dist')) {
  console.log('✅ dist folder exists');
  
  // List all files in dist
  const listFiles = (dir, indent = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
      const fullPath = `${dir}/${item.name}`;
      if (item.isDirectory()) {
        console.log(`${indent}📁 ${item.name}/`);
        if (indent.length < 6) { // Avoid deep recursion
          listFiles(fullPath, indent + '  ');
        }
      } else {
        const stats = fs.statSync(fullPath);
        const size = (stats.size / 1024).toFixed(2);
        console.log(`${indent}📄 ${item.name} (${size} KB)`);
      }
    });
  };
  
  listFiles('dist');
  
  // Check for JavaScript files specifically
  if (fs.existsSync('dist/assets')) {
    const assetFiles = fs.readdirSync('dist/assets');
    const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
    console.log(`\n📜 JavaScript files found: ${jsFiles.length}`);
    jsFiles.forEach(file => {
      const stats = fs.statSync(`dist/assets/${file}`);
      console.log(`  • ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });
  }
} else {
  console.log('❌ dist folder does not exist - BUILD FAILED');
  process.exit(1);
}

// Step 4: Git status
console.log('\n4️⃣ GIT STATUS CHECK:');
console.log('---------------------------------------');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  console.log('Git status before adding dist:');
  console.log(gitStatus || '(no uncommitted changes)');
} catch (e) {
  console.log('Git status check failed:', e.message);
}

console.log('\n🎉 BUILD VERIFICATION COMPLETE');
console.log('Build worked, dist folder created with JavaScript files');
console.log('Ready to commit to Git and push to GitHub');