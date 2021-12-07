const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const filePath = path.join(process.cwd(), './input.txt');
const nums = fs.readFileSync(filePath).toString().split(',').map(Number);
const indexes = _.range(0, nums.length);
const partOneSummer = (i) => (v) => Math.abs(i - v);
const partTwoSummer = (i) => (v) => {
  const abs = Math.abs(i - v);
  return Math.floor((abs * (abs + 1) / 2));
}


const fuel = _.min(indexes.map((i) => _.sumBy(nums, partOneSummer(i))));

const fuel2 = _.min(
  indexes.map((i) => _.sumBy(nums, partTwoSummer(i)))
);

console.log('one', fuel);
console.log('two', fuel2);
