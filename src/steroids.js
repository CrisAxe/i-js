prompt = require('prompt-sync')();

function my_function(number) {
  if (number % 5 === 0) {
    console.log('No rest has been identified!');
    console.log('Exiting the program.');
    return;
  }

  console.log(
    number > 10 && number <= 20
      ? 'The number is between 10 and 20 inclusive'
      : 'The number is outside the range'
  );

  console.log(
    !number === 15
      ? 'The number is not 15'
      : `The number is ${number}`
  );

  console.log(number % 2 === 0 ? 'The number is even' : 'The number is odd');
}

let number = parseInt(prompt('Enter a number: '));
my_function(number);