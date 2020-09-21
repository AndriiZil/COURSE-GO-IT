const fs = require('fs');
const { promises: fsPromises } = fs;

fs.writeFile('test.txt', 'Hello World', err => {
    if (err) {
        console.log(err);
    }

    fs.readFile('test.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('DATA', data);

        fs.appendFile('test.txt', ' String', (err) => {
            if (err) {
                console.log(err);
            }
        })
    });


});

console.log(__dirname)
console.log(__filename)
