const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const filePath = path.join(process.cwd(), './input.txt');
const lines = fs.readFileSync(filePath).toString().split('\n').filter(Boolean).map((line) => line.split('').map(Number));

const numbers = [];
const basins = [];

const changes = [[-1, 0], [1, 0], [0, 1], [0, -1]];
function isLowest(matrix, row, col) {
  const val = matrix[row][col];

  if (val === 9) return false;

  return changes.every(([dr, dc]) => {
    const comp = _.get(matrix, `[${row+dr}][${col+dc}]`, Number.POSITIVE_INFINITY);
    return val < comp;
  });
}

function getNeighbors(row, col) {
  return changes.map(([dr, dc]) => {
    return [row+dr, col+dc];
  });
}

for (let row = 0; row < lines.length; row++) {
  for (let col = 0; col < lines[row].length; col++) {
    if (isLowest(lines, row, col)) {
      numbers.push(lines[row][col] + 1);
      basins.push([row, col]);
    }
  }
}

console.log('one', _.sum(numbers));

const basinCounts = [];
console.log(basinCounts);

for (let [row, col] of basins) {
  const q = [[row, col]];
  const seen = new Set();
  let n = 0;

  while (q.length) {
    const [cr, cc] = q.shift();
    const neighbors = getNeighbors(cr, cc);

    neighbors.forEach(([dr, dc]) => {
      const comp = _.get(lines, `[${dr}][${dc}]`);
      if (comp !== undefined && comp !== 9 && !seen.has(`${dr};${dc}`)) {
        n++;
        q.push([dr, dc]);
        seen.add(`${dr};${dc}`)
      }
    });
  }
  basinCounts.push(n);
}

console.log(basinCounts)
console.log(basinCounts.sort((a, b) => a-b).slice(-3).reduce((acc, v) => acc *= v, 1));
