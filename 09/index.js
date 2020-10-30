const os = require('os');
const url = require('url');



console.log(os.arch());

console.log(os.platform())

console.log(os.uptime())

console.log(os.cpus())


const myURL = 'https://nodejs.org/dist/latest-v14.x/docs/api/querystring.html';

console.log(url.parse(myURL));

console.time();

for (let i = 0; i < 1000000; i++) {}

console.timeEnd();

const arr = [{ a: 1}, {b: 2}]

console.table(arr);