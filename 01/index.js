const { add, sub } = require('./app');

console.log(add(2, 5));
console.log(sub(8, 2));

require('./test');
require('./test');

console.log(process.argv);
