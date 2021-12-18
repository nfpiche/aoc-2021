const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const filePath = path.join(process.cwd(), './input.txt');
let [dots, instructions] = fs.readFileSync(filePath).toString().split('\n\n')

dots = dots.split('\n').map((coordinate) => coordinate.split(',').map(Number));
instructions = instructions.split('\n').map((instruction) => instruction.split(' ').at(-1).split('=')).filter((i) => i.length > 1);

const maxX = _.maxBy(dots, (dot) => dot[0]).at(0) + 1;
const maxY = _.maxBy(dots, (dot) => dot[1]).at(1) + 1;

const matrix = [];
for (let y = 0; y <= maxY; y++) {
  matrix[y] = new Array(maxX).fill(null);
}

for (let [x, y] of dots) {
  matrix[y][x] = '#'
}

function count() {
  console.log(_.sumBy(matrix, (row) => _.sumBy(row, (entry) => entry === '#')));
}

function foldX(amount) {
  const currentMax = matrix[0].length;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < amount; x++) {
      matrix[y][x] = matrix[y][x] ?? matrix[y][currentMax - 1 - x];
    }
  }

  for (let row of matrix) {
    row.length = amount;
  }
}

function foldY(amount) {
  for (let y = 0; y < amount; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      matrix[y][x] = matrix[y][x] || matrix[matrix.length - 1 - y][x];
    }
  }
  matrix.length = amount;
}

function fold(instruction) {
  const [dir, amount] = instruction;

  dir === 'x' ? foldX(amount) : foldY(amount);
}

instructions.forEach((instruction, i) => {
  fold(instruction);
  if (i === 0) count();
});

for (let row of matrix) {
  let str = '';
  for (let col of row) {
    str += col ?? ' ';
  }
  console.log(str);
}
