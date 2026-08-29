const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, 'public');
const downloads = path.join(out, 'downloads');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(downloads, { recursive: true });
for (const file of ['index.html','styles.css','script.js']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(out, file));
}
const downloadFiles = [
  ['files/proposal-template.pptx', 'nahr-proposal-template.pptx'],
  ['files/pricing-calculator.xlsx', 'nahr-pricing-calculator.xlsx'],
  ['docs/proposal-template.md', 'nahr-proposal-template.md'],
];
for (const [src, dest] of downloadFiles) {
  fs.copyFileSync(path.join(__dirname, src), path.join(downloads, dest));
}
console.log('static site ready in public/');
