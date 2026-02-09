function funcA() { //cria um array com a de alunos com cada parametro pedido nome: grades: role: 
    let alunos = [


        { id: 1, name: "John", grades: [18.5, 0, 16.5, 19.2], role: "Editor" },
        { id: 2, name: "Bob", grades: [12, 17.4, 20, 17.5], role: "Admin" },
        { id: 3, name: "Lebron", grades: [9.4, 0, 16, 15], role: "Acesso limitado" },
        { id: 4, name: "", grades: [18.5, 17.4, 16.5, 19.2], role: "Acesso limitado" },
        { id: 5, name: "Samanta", grades: [], role: "Acesso limitado" },
        { id: 6, grades: [18.5, 17.4, 16.5, 19.2], role: "Acesso limitado" },
        { id: 7, name: "Emma", grades: [18.5, 17.4, 16.5, 19.2], role: "Acesso limitado" },
    ];

    return alunos; 

}


function soma(grades){                
let resultado = 0 //variavel que vai conter o resultado total de cada array                     

    for (const grade of grades){// cria uma variavel temporaria que percore o array por inteiro recebe cada valor 
        resultado += grade;// faz a soma dos valores guardados e quarda o resultado            
    } 
    return resultado     
}


function divide(divisor, dividendo){// função para fazer a divisao
    return  divisor / dividendo ;
}


function funcB(alunos){
    const novalista = []; // cria um novo array vazio onde irá alocar os dados de cima ja analisados 
    
    for (const aluno of alunos){ // cria uma variavel temporaria que percore o array por inteiro recebe cada valor 
        const nome = aluno.name && aluno.name !== "" ? aluno.name: "sem nome"; //ternario que verifica se aluno tiver nome fica como nome, se nao fica sem nome

        const notas = Array.isArray(aluno.grades) && aluno.grades.length > 0 ? aluno.grades : [0];// verifica se aluno tem notas la, se tiver notas mostra se nao estiver mostra 0

        const somaNotas = soma(notas);
        const media = divide(somaNotas, notas.length);// divide a soma das notas e divede pelo tamnha total da lista

        const status = media >= 10 ? "Aprovado" : "Reprovado"; // variavel que mostra se o aluno é aprovado ou reprovaco caso seja maior ou menor que 10
        const role = aluno.role;

        const linha = `${nome} - média: ${media.toFixed(1)} - status: ${status} ${role}`; // mostar a frmata as inforaçoes colocando-as em forma de linha e coloca-as no array de acima
        novalista.push(linha);
    }

    return novalista;
}
    function funcC(b) {
    b.forEach((linha, index) => { //corre a lista toda e sapara por linhas 
        console.log(`${index + 1}) ${linha}`); //mosta a lista 
    });
}


const alunos = funcA(); //constante da criação de base de dados 
const linhas = funcB(alunos);//trata todos os dados obtidos 
funcC(linhas); // mostra os dados obtidos ja formatados 

