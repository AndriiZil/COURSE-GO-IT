const myModule = require('yargs');

const users = [
    {
        id: 1,
        name: 'John',
        surname: 'J'
    },
    {
        id: 2,
        name: 'Nick',
        surname: 'N'
    }
];

const argv = myModule
    .number('id')
    .string('name')
    .string('surname')
    .alias('name', 'n')
    .alias('surname', 's').argv

const { id, name, surname } = argv;

const foundedUser = users.find((user) => {
    if (id && id !== user.id) {
        return false;
    }

    if (name && name !== user.name) {
        return false;
    }

    if (surname && surname !== user.surname) {
        return false;
    }
    return true;
});

console.log(foundedUser);
