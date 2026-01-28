const number = 15;

if (number === 5 || number === 10 || number === 15) {
  console.log('The number is either 5, 10, or 15');
  console.log('Exiting the program.');
  return;
}

// Verifica se um número está entre 10 e 20 (inclusive)
console.log(
  number > 10 && number <= 20
    ? 'The number is between 10 and 20 inclusive'
    : 'The number is outside the range'
);

console.log(
  number === 15
    ? 'The number is 15'
    : `The number is ${number}`
);
 



