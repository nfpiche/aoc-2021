const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const filePath = path.join(process.cwd(), './input.txt');
const lines = fs.readFileSync(filePath).toString().split('\n');

const counts = [];
for (let i = 0; i < lines[0].length; i++) {
  counts[i] = { zero: 0, one: 0 };
}

for (let line of lines) {
  const entries = line.split('');

  entries.forEach((entry, i) => {
    const prop = entry === '1' ? 'one' : 'zero';
    counts[i][prop] += 1;
  });
}

let gamma = '';
let epsilon = '';

counts.forEach((entry) => {
  if (entry.zero > entry.one) {
    gamma += '0';
    epsilon += '1';
  } else {
    epsilon += '0';
    gamma += '1';
  }
});

console.log('one', parseInt(gamma, 2) * parseInt(epsilon, 2))

let oxygen = [...lines];
let co2 = [...lines];

let i = 0;
while (oxygen.length > 1) {
  const oxyProp = getMostCommonValue(oxygen, i);
  oxygen = oxygen.filter((entry) => entry[i] === oxyProp);
  i++;
}

i = 0;
while(co2.length > 1) {
  const co2Prop = getMostCommonValue(co2, i) === '1' ? '0' : '1';
  co2 = co2.filter((entry) => entry[i] === co2Prop);
  i++;
}

console.log('two', parseInt(oxygen, 2) * parseInt(co2, 2));

function getMostCommonValue(array, i) {
  const [ones, zeroes] = _.partition(array, (entry) => entry[i] === '1');
  return ones.length >= zeroes.length ? '1' : '0';
}
