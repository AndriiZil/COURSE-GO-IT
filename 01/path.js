const path = require('path');
const { promises: fsPromises } = require('fs');

const filePath = path.join(__dirname, '../../example.json');

console.log(filePath)

async function main() {
    const file = await fsPromises.readFile(filePath, 'utf-8');
    console.log(file);
}

main();

const object = { name: 'Andrii' };
const json = JSON.stringify(object);
console.log(json);

console.log(JSON.parse(json));