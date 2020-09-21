const [operator, ...numbers] = process.argv.slice(2);


switch (operator) {
    case 'add': 
        console.log(numbers.reduce((acc, cur) => acc + parseFloat(cur), 0));
    case 'sub':
        console.log(numbers.reduce((acc, cur) => parseFloat(acc) - parseFloat(cur)));
}