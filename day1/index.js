const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), './input.txt');

let lastValue = Number.POSITIVE_INFINITY;
let count = 0;

const lines = fs.readFileSync(filePath).toString().split('\n').map(Number);
for (let line of lines) {
  if (line > lastValue) count++;
  lastValue = line;
}
console.log('first', count);

let s = 0;
let e = 2;
count = 0;
lastValue = lines[0] + lines[1] + lines[2];

while (e < lines.length - 1) {
  e++;
  const current = lastValue - lines[s] + lines[e];
  if (current > lastValue) count++;
  lastValue = current;
  s++;
}

console.log('seconds', count);
