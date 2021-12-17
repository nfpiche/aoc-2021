const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const { Counter } = require('../utils');

const filePath = path.join(process.cwd(), './input.txt');
const lines = fs.readFileSync(filePath).toString().split('\n').filter(Boolean);

const counts = {one: 0, four: 0, seven: 0, eight: 0}
for (let line of lines) {
  const [, digits] = line.split(' | ');
  digits.split(' ').forEach((digit) => {
    switch(digit.length) {
      case 2:
        counts.one++;
        break;
      case 3:
        counts.seven++;
        break;
      case 4:
        counts.four++;
        break;
      case 7:
        counts.seven++;
        break;
      default:
        break;
    }
  });
}

console.log('one', _.sum(Object.values(counts)));

const countToNumberMap = {
  42: 0,
  17: 1,
  34: 2,
  39: 3,
  30: 4,
  37: 5,
  41: 6,
  25: 7,
  49: 8,
  45: 9,
}

console.time('two');
const two = _.sumBy(lines, (line) => {
  const [segments, digits] = line.split(' | ');

  const charCounts = segments.split(' ').reduce((acc, segment) => {
    segment.split('').forEach((char) => {
      acc.increment(char);
    });
    return acc;
  }, new Counter());

  return Number(digits.split(' ').map((n) => {
    const chars = n.split('');
    const total = _.sumBy(chars, (char) => charCounts.getCount(char));
    return String(countToNumberMap[total])
  }).join(''));
});
console.timeEnd('two')
console.log('answer two: ', two);
