const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const deltas = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, -1]]

function getNeighbors(matrix, row, col) {
  return _.compact(deltas.map(([dr, dc]) => {
    const access = `[${row+dr}][${col+dc}]`;

    return _.get(matrix, access);
  }));
}

const filePath = path.join(process.cwd(), './input.txt');
const lines = fs.readFileSync(filePath).toString().split('\n').filter(Boolean).map((line) => line.split(''))
let flashes = 0;

function handle(row, col, seen) {
  if (!lines[row]) return;
  if (lines[row][col] === undefined) return;

  if (!seen.has(`${row};${col}`)) {
    lines[row][col]++;

    if (lines[row][col] > 9) {
      lines[row][col] = 0;
      flashes++;
      seen.add(`${row};${col}`);

      for (let dr = -1; dr < 2; dr++) {
        for (let dc = -1; dc < 2; dc++) {
          if (!dr && !dc) continue;
          handle(row+dr, col+dc, seen);
        }
      }
    }
  }
}
let i = 0;
while (true) {
  const seen = new Set();
  const lastFlashes = flashes;
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
      handle(row, col, seen);
    }
  }
  if (i === 99) {
    console.log('one', flashes);
  }
  i++;
  if (lastFlashes + (lines.length * lines[0].length) === flashes) {
    console.log('two', i);
    break;
  }
}
