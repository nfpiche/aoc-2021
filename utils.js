exports.sleep = function(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

exports.Counter = class {
  constructor() {
    this.map = {};
  }

  increment(key) {
    const firstVal= this.map[key] ?? 0;
    const nextVal = firstVal + 1;
    this.map[key] = nextVal;
  }

  getCount(key) {
    return this.map[key] ?? 0;
  }
}
