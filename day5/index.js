const path = require('path');
const fs = require('fs');
const { Counter } = require('../utils');
const filePath = path.join(process.cwd(), './input.txt');

class Solution {
  constructor() {
    this.seen = new Counter();
    this.count = 0;
  }

  visit(p1, p2) {
    const [x1, y1] = p1.split(',').map(Number)
    const [x2, y2] = p2.split(',').map(Number);

    const incrementX = Math.sign(x2 - x1);
    const incrementY = Math.sign(y2 - y1);
    let x = x1;
    let y = y1;

    while (true) {
      const key = `x:${x};y:${y}`;
      this.seen.increment(key);
      if (this.seen.getCount(key) === 2) this.count++;
      if (x === x2 && y === y2) break;
      x += incrementX;
      y += incrementY;
    }
  }
}

const one = new Solution();
const two = new Solution();

fs.readFileSync(filePath).toString().split('\n').forEach((line) => {
  if (!line) return;
  const [p1, p2] = line.split(' -> ');
  const [x1, y1] = p1.split(',').map(Number)
  const [x2, y2] = p2.split(',').map(Number);

  if (x1 === x2 || y1 === y2) {
    one.visit(p1, p2);
  }

  two.visit(p1, p2);
});

console.log('one', one.count);
console.log('two', two.count);
