#!/usr/bin/env node

// FORCE DEPLOY - REAL EXECUTION NOW
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 FORCE DEPLOYING - EXECUTING NOW');
console.log('===================================');

try {
  // Clean any existing dist
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('🧹 Cleaned existing dist folder');
  }

  // Build the project
  console.log('🔨 Running npm run build...');
  const buildOutput = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ BUILD OUTPUT:');
  console.log(buildOutput);

  // Verify dist exists and show contents
  if (fs.existsSync('dist')) {
    console.log('✅ DIST FOLDER CREATED');
    
    const showContents = (dir, prefix = '') => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        const fullPath = `${dir}/${item.name}`;
        if (item.isDirectory()) {
          console.log(`${prefix}📁 ${item.name}/`);
          if (prefix.length < 4) showContents(fullPath, prefix + '  ');
        } else {
          const stats = fs.statSync(fullPath);
          console.log(`${prefix}📄 ${item.name} (${(stats.size/1024).toFixed(2)} KB)`);
        }
      });
    };
    
    showContents('dist');
    
    // Check for JS files specifically
    if (fs.existsSync('dist/assets')) {
      const jsFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
      console.log(`\n🎯 JAVASCRIPT FILES: ${jsFiles.length} found`);
      jsFiles.forEach(file => console.log(`   • ${file}`));
    }
  } else {
    console.log('❌ DIST FOLDER NOT CREATED - BUILD FAILED');
    process.exit(1);
  }

  // Git add and commit
  console.log('\n📦 Adding to Git...');
  execSync('git add dist/', { encoding: 'utf8' });
  execSync('git add -A', { encoding: 'utf8' });
  
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  console.log('📋 Git status:');
  console.log(gitStatus);
  
  // Commit
  console.log('\n💾 Committing...');
  const commitOutput = execSync('git commit -m "DEPLOY: Force add dist folder with JavaScript files"', { 
    encoding: 'utf8' 
  });
  console.log(commitOutput);
  
  // Force push
  console.log('\n🚀 FORCE PUSHING TO GITHUB...');
  const pushOutput = execSync('git push origin main --force', { 
    encoding: 'utf8' 
  });
  console.log('✅ PUSH COMPLETE:');
  console.log(pushOutput);
  
  console.log('\n🎉 SUCCESS - DIST FOLDER PUSHED TO GITHUB!');
  console.log('Check: https://github.com/andaydvice/smart-rv-portal');
  
} catch (error) {
  console.log('❌ DEPLOYMENT FAILED:');
  console.log('Exit code:', error.status);
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
  process.exit(1);
}