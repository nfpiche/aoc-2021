const path = require('path');
const fs = require('fs');
const filePath = path.join(process.cwd(), './input.txt');

class BingoBoard {
  constructor(board, size = 5) {
    this.rawBoard = board;
    this.size = size;
    this.won = false;

    this.buildMatrix();
    this.buildCountingContainers()
  }

  buildMatrix() {
    this.matrix = this.rawBoard.reduce((acc, row, columnVal) => {
      row.forEach((v, rowVal) => {
        acc[v] = { rowVal, columnVal, used: false };
      });
      return acc;
    }, {});
  }

  buildCountingContainers() {
    const emptyArray = new Array(this.size).fill(0);
    this.rowContainer = [...emptyArray];
    this.columnContainer = [...emptyArray];
    this.descendingDiagonalContainer = [...emptyArray];
    this.ascendingDiagonalContainer = [...emptyArray];
  }

  checkVal(val) {
    const entry = this.matrix[val];
    if (!entry) return;
    const { rowVal, columnVal } = entry;

    this.matrix[val].used = true;
    this.rowContainer[rowVal]++;
    this.columnContainer[columnVal]++;

    if (rowVal === columnVal) {
      this.descendingDiagonalContainer[rowVal]++;
    }

    if (rowVal + columnVal + 1 === this.size) {
      this.ascendingDiagonalContainer[rowVal]++;
    }

    this.checkVictory(rowVal, columnVal, val);
  }

  count(arr) {
    return arr.filter((a) => a === 1).length;
  }

  checkVictory(r, c, val) {
    const lengths = [
      this.rowContainer[r],
      this.columnContainer[c],
      this.count(this.descendingDiagonalContainer),
      this.count(this.ascendingDiagonalContainer)
    ];

    this.won = lengths.some((a) => a === this.size);

    if (this.won) {
      this.winningVal = val;
    }
  }

  getScore() {
    const unusedVals = Object.entries(this.matrix)
      .filter(([, value]) => !value.used)
      .map(([key]) => parseInt(key, 10))
      .reduce((acc, v) => acc + v);

    return unusedVals * this.winningVal;
  }
}

const parseBoard = (board) => board.split(/\s+/).map(Number);

let [numbers, ...boards] = fs.readFileSync(filePath).toString().replace(/.*\n$/, '').split('\n\n');

numbers = numbers.split(',').map(Number)
boards = boards
  .map((board) => board.split('\n'))
  .map((board) => board.map(parseBoard))
  .map((board) => new BingoBoard(board));

const winningBoards = [];

numbers.forEach((number) => {
  boards.forEach((board) => {
    if (!board.won) {
      board.checkVal(number);
      if (board.won) winningBoards.push(board);
    }
  });
});

console.log('one', winningBoards.at(0).getScore());
console.log('two', winningBoards.at(-1).getScore());
