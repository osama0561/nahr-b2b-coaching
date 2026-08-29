const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, 'public');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const file of ['index.html','styles.css','script.js','robots.txt','sitemap.xml']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(out, file));
}
console.log('static site ready in public/');
