const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), './input.txt');
const lines = fs.readFileSync(filePath).toString().split('\n').map((entry) => {
  const [direction, amount] = entry.split(' ');
  return { direction, amount: parseInt(amount, 10) }

});

let h = 0;
let v = 0;
let depth = 0;

for (let line of lines) {
  const {direction, amount} = line;
  switch(direction) {
    case 'up':
      v -= amount;
      break;
    case 'down':
      v += amount;
      break;
    case 'forward':
      h += amount;
      depth += (v * amount);
      break;
  }
}
console.log('one', h * v);
console.log('two', h * depth);
