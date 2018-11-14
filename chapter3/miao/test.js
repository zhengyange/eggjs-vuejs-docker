const R = require('ramda');

const func = R.curry((a, b) => [a, b]);

console.log(func(1, 2));
console.log(func(1)(2));
console.log(func(R.__, 2)(1));