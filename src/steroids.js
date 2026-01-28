prompt = require('prompt-sync')();
let number = parseInt(prompt('Enter a number: '));

if (number !== 15) {
  console.log('The number is not 15');
}

if (number > 10 && number < 20) {
  console.log('The number is between 10 and 20');
}

console.log(number % 2 === 0 ? 'The number is even' : 'The number is odd');
