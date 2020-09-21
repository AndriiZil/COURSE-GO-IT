const { promises: fsPromises } = require('fs');

async function main() {
    await fsPromises.writeFile('example.txt', 'Example');
    await fsPromises.readFile('example.txt', 'utf-8');
    await fsPromises.appendFile('example.txt', ' Some Text');
}

try {
    main();
} catch (err) {
    console.log(err);
}