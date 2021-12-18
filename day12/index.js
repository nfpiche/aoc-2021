const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const filePath = path.join(process.cwd(), './input.txt');

function isLower(c) {
  return c.length === 2 && c.charCodeAt() >= 'a'.charCodeAt() && c.charCodeAt() <= 'z'.charCodeAt();
}
const graph = fs.readFileSync(filePath).toString().split('\n').filter(Boolean).map((line) => line.split('-')).reduce((acc, pair) => {
  const [from, to] = pair;
  if (!acc[from]) acc[from] = [];
  if (!acc[to]) acc[to] = [];

  acc[from].push(to);
  acc[to].push(from);
  return acc;
}, {});

let q = [{v: 'start', path: ['start']}];
let paths = 0;

function visited(node, path) {
  return path.includes(node);
}

while (q.length) {
  const curr = q.shift();

  if (curr.v === 'end') {
    paths++;
    continue;
  }

  for (const neighbor of graph[curr.v]) {
    if (!visited(neighbor, curr.path)) {
      const nextPath = [...curr.path];
      if (_.lowerCase(neighbor) === neighbor) {
        nextPath.push(neighbor);
      }
      q.push({ v: neighbor, path: nextPath })
    }
  }
}
console.log(paths)
paths = 0;
q = [{v: 'start', path: ['start'], seenTwice: false}];

while (q.length) {
  const curr = q.shift();

  if (curr.v === 'end') {
    paths++;
    continue;
  }

  for (const neighbor of graph[curr.v]) {
    const hasVisited = visited(neighbor, curr.path);

    if (!hasVisited) {
      const nextPath = [...curr.path];
      if (_.lowerCase(neighbor) === neighbor) {
        nextPath.push(neighbor);
      }
      q.push({ v: neighbor, path: nextPath, seenTwice: curr.seenTwice })
    } else if (!curr.seenTwice && !visited(neighbor, ['start', 'end'])) {
      q.push({ v: neighbor, path: curr.path, seenTwice: true });
    }
  }
}

console.log(paths)
