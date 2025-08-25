#!/usr/bin/env node

// EXECUTE BUILD AND SHOW PROOF TO USER
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 EXECUTING BUILD - REAL PROOF');
console.log('================================\n');

console.log('BUILD COMMAND: npm run build');
console.log('------------------------------');

try {
  // Execute build and capture output
  const output = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 60000
  });
  
  console.log('✅ BUILD SUCCESS!');
  console.log('BUILD OUTPUT:');
  console.log(output);
  
  // Check dist folder
  if (fs.existsSync('dist')) {
    console.log('\n📁 DIST FOLDER CONTENTS:');
    console.log('-------------------------');
    
    const listDir = (dir, prefix = '') => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        if (item.isDirectory()) {
          console.log(`${prefix}📁 ${item.name}/`);
          if (prefix.length < 4) {
            listDir(`${dir}/${item.name}`, prefix + '  ');
          }
        } else {
          const stats = fs.statSync(`${dir}/${item.name}`);
          const size = (stats.size / 1024).toFixed(2);
          console.log(`${prefix}📄 ${item.name} (${size} KB)`);
        }
      });
    };
    
    listDir('dist');
    
    // Check JavaScript files
    if (fs.existsSync('dist/assets')) {
      const jsFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
      console.log(`\n🎯 JAVASCRIPT FILES: ${jsFiles.length} found`);
      jsFiles.forEach(file => console.log(`   • ${file}`));
    }
  } else {
    console.log('❌ NO DIST FOLDER CREATED');
  }
  
} catch (error) {
  console.log('❌ BUILD FAILED:');
  console.log('Status:', error.status);
  console.log('Output:', error.stdout);
  console.log('Error:', error.stderr);
}

console.log('\n📋 PROOF COMPLETE');