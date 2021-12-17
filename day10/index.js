const path = require('path');
const fs = require('fs');

const filePath = path.join(process.cwd(), './input.txt');
const lines = fs.readFileSync(filePath).toString().split('\n').filter(Boolean).map((line) => line.split(''));

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const incompleteScoreMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const charMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

let scoreOne = 0;
let scoreTwo = 0;

const closingChars = new Set(Object.keys(scoreMap));

const incompleteScores = [];
for (let line of lines) {
  const stack = [];
  let corrupted = false;

  for (let char of line) {
    if (closingChars.has(char)) {
      const expected = charMap[stack.pop()];
      if (char !== expected) {
        corrupted = true;
        scoreOne += scoreMap[char];
      }
    } else {
      stack.push(char);
    }
  }
  if (!corrupted) {
    for (let char of stack.reverse()) {
      scoreTwo *= 5;
      scoreTwo += incompleteScoreMap[charMap[char]];
    }
    incompleteScores.push(scoreTwo);
    scoreTwo = 0;
  }
}
incompleteScores.sort((a, b) => a - b);

console.log('one', scoreOne)
console.log('two', incompleteScores[Math.floor(incompleteScores.length/2)]);
