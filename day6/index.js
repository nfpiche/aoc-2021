const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const filePath = path.join(process.cwd(), './input.txt');
const counter = fs.readFileSync(filePath).toString().split(',').reduce((acc, v) => {
  acc[Number(v)]++;
  return acc;
}, new Array(9).fill(0));

for (let day = 0; day < 256; day++) {
  const atZero = counter[0];
  if (day === 80) console.log('one', _.sum(counter));

  for (let i = 0; i < counter.length-1; i++) {
    counter[i] = counter[i + 1];
  }

  counter[8] = atZero;
  counter[6] += atZero;
}
console.log('two', _.sum(counter));
