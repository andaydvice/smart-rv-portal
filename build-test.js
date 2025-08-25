// Build test script to show actual output
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 BUILD TEST - SHOWING ACTUAL OUTPUT');
console.log('=====================================\n');

console.log('1️⃣ RUNNING: npm run build');
console.log('----------------------------');

try {
  const buildOutput = execSync('npm run build', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ BUILD SUCCESS:');
  console.log(buildOutput);
} catch (error) {
  console.log('❌ BUILD FAILED:');
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
  process.exit(1);
}

console.log('\n2️⃣ CHECKING: dist folder contents');
console.log('----------------------------------');

if (fs.existsSync('dist')) {
  console.log('✅ dist folder exists');
  
  const listFiles = (dir, prefix = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        console.log(`${prefix}📁 ${item.name}/`);
        listFiles(fullPath, prefix + '  ');
      } else {
        const stats = fs.statSync(fullPath);
        const size = (stats.size / 1024).toFixed(2);
        console.log(`${prefix}📄 ${item.name} (${size} KB)`);
      }
    });
  };
  
  listFiles('dist');
} else {
  console.log('❌ dist folder does not exist');
}

console.log('\n3️⃣ CHECKING: dist/index.html content');
console.log('------------------------------------');

const indexPath = 'dist/index.html';
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  console.log('✅ index.html exists:');
  
  // Show just the script tags
  const scriptMatches = indexContent.match(/<script[^>]*>/g);
  if (scriptMatches) {
    console.log('📜 Script tags found:');
    scriptMatches.forEach(script => console.log('  ', script));
  } else {
    console.log('❌ No script tags found in index.html');
  }
  
  // Show link tags for CSS
  const linkMatches = indexContent.match(/<link[^>]*rel="stylesheet"[^>]*>/g);
  if (linkMatches) {
    console.log('🎨 CSS link tags found:');
    linkMatches.forEach(link => console.log('  ', link));
  }
} else {
  console.log('❌ dist/index.html does not exist');
}

console.log('\n4️⃣ CHECKING: JavaScript files in dist/assets');
console.log('---------------------------------------------');

const assetsPath = 'dist/assets';
if (fs.existsSync(assetsPath)) {
  const assetFiles = fs.readdirSync(assetsPath);
  const jsFiles = assetFiles.filter(file => file.endsWith('.js'));
  
  if (jsFiles.length > 0) {
    console.log(`✅ Found ${jsFiles.length} JavaScript files:`);
    jsFiles.forEach(file => {
      const stats = fs.statSync(path.join(assetsPath, file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  📄 ${file} (${size} KB)`);
    });
  } else {
    console.log('❌ No JavaScript files found in dist/assets');
  }
} else {
  console.log('❌ dist/assets folder does not exist');
}

console.log('\n🎯 SUMMARY');
console.log('==========');
console.log('This shows the EXACT build process and output.');
console.log('If build succeeds but no JS files, it\'s a Vite config issue.');
console.log('If dist folder is empty, build is failing silently.');
console.log('If files exist but aren\'t deployed, it\'s a deployment issue.');