const number = [3,6,9,12,15,18,21,24,27,30 ]

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


function getFullName(firstName,lastName){
    console.log("Creating user...");
    console.log('o primeiro nome é ${first}')

}

function verficacao(number){
    if (number === 15){
      return 
    }

    if (number % 5 === 0){
      return 
    }

    if(number >= 10 && number <=20) { 
      return 
    } 

    else (number <= 10 && number >=20); {
      return
    }

}


// codigo Dinis
const prompt = require("prompt-sync")();


function tudo(numeroInserido){

    if(numeroInserido === 15){    //se numero É 15
        console.log("O Número é igual a 15")
        return
    }
    
    if (numeroInserido % 5 === 0){    // SENAO FOR 15, MAS FOR MULTIPLO DE 5
        console.log("PARE, o seu número é múltiplo de 5 menor que 20, bueda fixe")
        return
    }

    numeroInserido > 20 || numeroInserido < 10
        ? console.log("Não está entre 10 e 20")
        : console.log("Está entre 10 e 20");
}

function multiplosTres(){
    let multiploParaAdicionar = 3
    const array = [multiploParaAdicionar]
    let contador= 0
    while (contador < 10){
        multiploParaAdicionar += 3
        array.push(multiploParaAdicionar)
        console.log(contador+1 , " X 3 = "  , array[contador])
        contador+= 1
    } 
    return array
}
let numeroInserido = Number(prompt("Insere um número: "));
tudo(numeroInserido)
array = multiplosTres()

