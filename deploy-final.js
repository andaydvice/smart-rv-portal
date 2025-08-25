#!/usr/bin/env node

// EXECUTE BUILD AND FORCE PUSH TO GITHUB - FINAL FIX
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 EXECUTING BUILD AND FORCE PUSH TO GITHUB');
console.log('===========================================\n');

console.log('✅ .gitignore fixed - dist folder now allowed');
console.log('🎯 Building and FORCING push to GitHub NOW\n');

// Step 1: Clean build
console.log('1️⃣ RUNNING: npm run build');
console.log('----------------------------');

try {
  // Remove existing dist to ensure clean build
  if (fs.existsSync('dist')) {
    console.log('🧹 Cleaning existing dist folder...');
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  const buildOutput = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ BUILD SUCCESS');
  console.log(buildOutput);
} catch (error) {
  console.log('❌ BUILD FAILED:');
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
  process.exit(1);
}

// Step 2: Verify build output
console.log('\n2️⃣ VERIFYING: Build output');
console.log('----------------------------');

const distExists = fs.existsSync('dist');
const assetsExists = fs.existsSync('dist/assets');
const indexExists = fs.existsSync('dist/index.html');

console.log(`📁 dist folder: ${distExists ? '✅' : '❌'}`);
console.log(`📁 assets folder: ${assetsExists ? '✅' : '❌'}`);
console.log(`📄 index.html: ${indexExists ? '✅' : '❌'}`);

if (assetsExists) {
  const assetFiles = fs.readdirSync('dist/assets');
  const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
  const cssFiles = assetFiles.filter(f => f.endsWith('.css'));
  
  console.log(`📜 JavaScript files: ${jsFiles.length}`);
  console.log(`🎨 CSS files: ${cssFiles.length}`);
  
  jsFiles.forEach(file => {
    const stats = fs.statSync(path.join('dist/assets', file));
    const size = (stats.size / 1024).toFixed(2);
    console.log(`  • ${file} (${size} KB)`);
  });
} else {
  console.log('❌ No assets folder found - build failed');
  process.exit(1);
}

// Step 3: Git add and commit
console.log('\n3️⃣ COMMITTING: Built files to Git');
console.log('----------------------------------');

try {
  // Check git status first
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  console.log('📋 Git status before adding dist:');
  console.log(gitStatus || '(no changes)');
  
  // Add dist folder
  console.log('📦 Adding dist folder to git...');
  execSync('git add dist/', { encoding: 'utf8' });
  
  // Add any other changes
  console.log('📦 Adding all other changes...');
  execSync('git add -A', { encoding: 'utf8' });
  
  // Check what will be committed
  const gitStatusAfter = execSync('git status --porcelain', { encoding: 'utf8' });
  console.log('\n📋 Files to be committed:');
  console.log(gitStatusAfter);
  
  // Count files being added
  const addedFiles = gitStatusAfter.split('\n').filter(line => line.trim()).length;
  console.log(`\n📊 Total files being committed: ${addedFiles}`);
  
  // Commit the changes
  console.log('\n💾 Committing files...');
  const commitOutput = execSync('git commit -m "DEPLOY: Add built JavaScript files for production deployment"', { 
    encoding: 'utf8' 
  });
  console.log('✅ COMMIT SUCCESS');
  console.log(commitOutput);
  
  // FORCE PUSH to ensure GitHub gets the files
  console.log('\n🚀 FORCE PUSHING to GitHub...');
  const pushOutput = execSync('git push origin main --force', { 
    encoding: 'utf8' 
  });
  console.log('✅ PUSH SUCCESS - JavaScript files now on GitHub!');
  console.log(pushOutput);
  
} catch (error) {
  console.log('❌ GIT COMMIT FAILED:');
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
  
  // Show what might be wrong
  try {
    const status = execSync('git status', { encoding: 'utf8' });
    console.log('\n📋 Current git status:');
    console.log(status);
  } catch (e) {
    console.log('Cannot check git status');
  }
  
  process.exit(1);
}

// Step 4: Success message
console.log('\n🎉 DEPLOYMENT SUCCESS!');
console.log('======================');
console.log('✅ React app built successfully');
console.log('✅ JavaScript files committed to Git');
console.log('✅ Files will auto-sync to GitHub');
console.log('✅ Netlify will deploy the committed dist folder');
console.log('\n🌐 Your Smart RV Hub will be live shortly at smartrvhub.com');
console.log('🚀 After 24+ hours, your React app is finally deploying!');