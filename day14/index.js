const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const filePath = path.join(process.cwd(), './input.txt');
let [template, rules] = fs.readFileSync(filePath).toString().split('\n\n');
rules = _.fromPairs(rules.split('\n').filter(Boolean).map((rule) => rule.split(' -> ')));

let pairMap = {};
let counts = {};

for (let i = 0; i < template.length-1; i++) {
  const key = template[i] + template[i+1];
  pairMap[key] = (pairMap[key] ?? 0) + 1;
  counts[template[i]] = (counts[template[i]] ?? 0) + 1;
  counts[template[i+1]] = (counts[template[i+1]] ?? 0) + 1;
}
counts[template[template.length-1]] -= 1;

_.times(40, (i) => {
  const nextPairMap = {...pairMap};
  Object.entries(pairMap).forEach(([k, v]) => {
    const rule = rules[k];

    if (rule) {
      [l, r] = k.split('');
      const k1 = l + rule;
      const k2 = rule + r;

      nextPairMap[k] -= v;
      nextPairMap[k1] = (nextPairMap[k1] ?? 0) + v;
      nextPairMap[k2] = (nextPairMap[k2] ?? 0) + v;
      counts[rule] = (counts[rule] ?? 0) + v;
    }
  });
  if (i === 9) {
    const max = _.max(Object.values(counts));
    const min = _.min(Object.values(counts));
    console.log('one', max - min)
  }
  pairMap = nextPairMap;
});

const max = _.max(Object.values(counts));
const min = _.min(Object.values(counts));
console.log('two', max - min)
