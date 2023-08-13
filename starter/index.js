const fs = require('fs');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log("🚀 ~ file: index.js:3 ~ textIn:", textIn)
const textOut = `this is what we know about avocado ${textIn}\nCreated at ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);

console.log('File written');
