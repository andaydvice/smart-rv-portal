#!/usr/bin/env node

// TEST BUILD FOR DEPLOYMENT
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 TESTING BUILD FOR DEPLOYMENT');
console.log('================================\n');

try {
  // Clean any previous builds
  if (fs.existsSync('dist')) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  console.log('⚡ Running build command...');
  console.log('Command: npm run build');
  console.log('-------------------------');
  
  // Execute build with detailed output
  const output = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'inherit',
    timeout: 120000 // 2 minutes timeout
  });
  
  console.log('\n✅ BUILD COMPLETED SUCCESSFULLY!');
  console.log('==================================');
  
  // Verify dist folder exists and has content
  if (fs.existsSync('dist')) {
    console.log('\n📁 Build artifacts verification:');
    console.log('--------------------------------');
    
    // Check index.html
    if (fs.existsSync('dist/index.html')) {
      const size = fs.statSync('dist/index.html').size;
      console.log(`✅ index.html (${(size/1024).toFixed(1)} KB)`);
    } else {
      console.log('❌ index.html missing');
    }
    
    // Check assets folder
    if (fs.existsSync('dist/assets')) {
      const files = fs.readdirSync('dist/assets');
      const jsFiles = files.filter(f => f.endsWith('.js'));
      const cssFiles = files.filter(f => f.endsWith('.css'));
      
      console.log(`✅ JavaScript files: ${jsFiles.length}`);
      console.log(`✅ CSS files: ${cssFiles.length}`);
      
      // Calculate total bundle size
      let totalSize = 0;
      files.forEach(file => {
        const size = fs.statSync(`dist/assets/${file}`).size;
        totalSize += size;
      });
      
      console.log(`📦 Total bundle size: ${(totalSize/1024/1024).toFixed(2)} MB`);
      
      if (totalSize < 50 * 1024 * 1024) { // 50MB limit
        console.log('✅ Bundle size within reasonable limits');
      } else {
        console.log('⚠️ Bundle size is quite large');
      }
    }
    
    console.log('\n🎉 DEPLOYMENT BUILD TEST PASSED!');
    console.log('Project is ready for deployment.');
    
  } else {
    console.log('\n❌ DEPLOYMENT BUILD FAILED!');
    console.log('dist folder was not created');
    process.exit(1);
  }
  
} catch (error) {
  console.log('\n💥 BUILD FAILED!');
  console.log('=================');
  console.log('Status:', error.status || 'Unknown');
  console.log('Signal:', error.signal || 'None');
  
  if (error.stdout) {
    console.log('\nSTDOUT:', error.stdout.toString());
  }
  
  if (error.stderr) {
    console.log('\nSTDERR:', error.stderr.toString());
  }
  
  console.log('\n🔍 Common build failure causes:');
  console.log('- TypeScript compilation errors');
  console.log('- Missing dependencies');
  console.log('- Import/export issues');
  console.log('- Memory issues during build');
  console.log('- File path issues');
  
  process.exit(1);
}