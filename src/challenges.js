
// ==========================================
// DESAFIO FINAL 01
// Tema: Mini-sistema de Loja + Caixa + Estoque
// ==========================================

// Objetivo
// Você vai construir um sistema completo (em memória, sem banco de dados) que:
// - mantém um catálogo de produtos e um estoque
// - cria carrinhos de compra, valida quantidades e calcula totais
// - aplica regras de preço (promoções/cupões) com prioridades e restrições
// - calcula impostos (IVA) por categoria
// - finaliza pedidos e imprime um cupom fiscal detalhado
// - gera relatórios simples de vendas

// Regras gerais
// - Não use bibliotecas externas.
// - Use apenas JavaScript (Node.js).
// - Não apague as assinaturas (nomes/params) dos métodos marcados como TODO.
// - Use estruturas de dados adequadas (Map/Array/Object).
// - Todas as validações devem lançar Error com mensagens claras.

// Como usar
// - Complete os TODOs.
// - Ao final, descomente a chamada de runDemo() no fim do arquivo.
// - O demo executa cenários que devem passar.

// ==========================================
// PARTE 0 - Dados e utilitários
// ==========================================

const CATEGORIAS = [
	"eletrodoméstico",
	"decoração",
	"materiais de construção",
	"vestuário",
	"alimentos"
];

const IVA_POR_CATEGORIA = {
	"eletrodoméstico": 0.23,
	"decoração": 0.23,
	"materiais de construção": 0.23,
	"vestuário": 0.23,
	"alimentos": 0.06
};

function round2(value) {
	return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatBRL(value) {
	// Evite Intl se quiser praticar manualmente.
	return `R$ ${round2(value).toFixed(2)}`.replace(".", ",");
}

function assertPositiveNumber(value, label) {
	if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value) || value <= 0) {
		throw new Error(`${label} deve ser um número positivo.`);
	}
}

function assertNonNegativeInt(value, label) {
	if (!Number.isInteger(value) || value < 0) {
		throw new Error(`${label} deve ser um inteiro >= 0.`);
	}
}

function assertCategoriaValida(categoria) {
	if (!CATEGORIAS.includes(categoria)) {
		throw new Error(`Categoria inválida: ${categoria}. Aceitas: ${CATEGORIAS.join(", ")}`);
	}
}

// ==========================================
// PARTE 1 - Modelos principais (classes)
// ==========================================

// 1) Crie a classe Produto
// Requisitos mínimos:
// - sku (string) único
// - nome (string)
// - preco (number > 0)
// - fabricante (string)
// - categoria (deve estar em CATEGORIAS)
// - numeroMaximoParcelas (int 1..24)
// Métodos:
// - getValorDeParcela(numeroDeParcelas) => number
//   - deve validar: numeroDeParcelas int >=1 e <= numeroMaximoParcelas 
//   - retorna preco / numeroDeParcelas (2 casas)

class Produto {
	constructor({ sku, nome, preco, fabricante, categoria, numeroMaximoParcelas }) {// determina a classe e predefine o requisitos nessesarios 
		// TODO
		if (typeof sku !== 'string') {
			throw new Error('sku deve ser uma string');
		}
		if (typeof nome !== 'string') {
			throw new Error('Nome deve ser uma string');
		}
		if (typeof preco !== 'number' || preco < 0) {
			throw new Error('Deve ser um número e positivo.');
		}
		if (typeof fabricante !== 'string') {
			throw new Error('Nome deve ser uma string');
		}
		assertCategoriaValida(categoria)

		if (typeof numeroMaximoParcelas !== 'number' || !Number.isInteger(numeroMaximoParcelas) || numeroMaximoParcelas < 1 || numeroMaximoParcelas > 24) {
			throw new Error('Número de parecelas invalido, numero de parcelas tem que ser entre 1 e 24 meses');
		}


		this.sku = sku;
		this.nome = nome;
		this.preco = preco;
		this.fabricante = fabricante;
		this.categoria = categoria;
		this.numeroMaximoParcelas = numeroMaximoParcelas;

		throw new Error("TODO: implementar Produto");

	}

	getValorDeParcela(numeroDeParcelas) {
		// TODO
		if (
			!Number.isInteger(numeroDeParcelas) ||
			numeroDeParcelas < 1 ||
			numeroDeParcelas > this.numeroMaximoParcelas
		) {
			throw new Error("Número de parcelas inválido");
		}

		const valor = this.preco / numeroDeParcelas;

		return Number(valor.toFixed(2));
	}
}

// 2) Crie a classe Cliente
// Requisitos:
// - id (string)
// - nome (string)
// - tipo: "REGULAR" | "VIP"
// - saldoPontos (int >= 0)
// Métodos:
// - adicionarPontos(pontos)
// - resgatarPontos(pontos) => diminui saldo, valida

class Cliente {
	constructor({ id, nome, tipo = "REGULAR", saldoPontos = 0 }) {
		const tiposAceitos = ["REGULAR", "VIP"];

		if (tiposAceitos.includes(tipo)) {
			throw new Error("Não é nem Regular nem VIP");
		}
		if (typeof id !== 'string') {
			throw new Error('Nome deve ser uma string');
		}
		if (typeof nome !== 'string') {
			throw new Error('Nome deve ser uma string');
		}
		if (typeof tipo !== 'string') {
			throw new Error('Nome deve ser uma string');
		}
		if (typeof saldoPontos !== 'number' || saldoPontos <= 0) {
			throw new Error('Nome deve ser uma string');
		}

		this.id = id;
		this.nome = nome;
		this.tipo = tipo;
		this.saldoPontos = saldoPontos;


		throw new Error("TODO: implementar Cliente");
	}

	adicionarPontos(pontos) {
		// TODO
		if (!Number.isInteger(pontos) || pontos <= 0) {
			throw new Error("Pontos devem ser inteiro > 0");
		}

		this.saldoPontos += pontos;
	}
	//throw new Error("TODO: implementar adicionarPontos");
}

resgatarPontos(pontos); {
	// TODO
	if (!Number.isInteger(pontos) || pontos <= 0) {
		throw new Error("Pontos devem ser inteiro > 0");
	}

	if (pontos > this.saldoPontos) {
		throw new Error("Saldo insuficiente para resgate");
	}

	this.saldoPontos -= pontos;

	//throw new Error("TODO: implementar resgatarPontos");

}

// 3) Crie a classe ItemCarrinho
// Requisitos:
// - sku (string)
// - quantidade (int >= 1)
// - precoUnitario (number > 0) *congelado no momento de adicionar*
// Observação: o carrinho usa precoUnitario do momento (para simular mudança de preço no catálogo).

class ItemCarrinho {
	constructor({ sku, quantidade, precoUnitario }) {
		// TODO
		if (!sku || typeof sku !== "string") {
			throw new Error("SKU inválido");
		}


		if (!Number.isInteger(quantidade) || quantidade < 1) {
			throw new Error("Quantidade deve ser inteiro >= 1");
		}


		if (typeof precoUnitario !== "number" || precoUnitario <= 0) {
			throw new Error("Preço unitário deve ser > 0");
		}

		this.sku = sku;
		this.quantidade = quantidade;

		Object.defineProperty(this, "precoUnitario", {
			value: precoUnitario,
			writable: false,
			enumerable: true
		});


		throw new Error("TODO: implementar ItemCarrinho");
	}

	getTotal() {
		// TODO
		const total = this.quantidade * this.precoUnitario;
		return Number(total.toFixed(2));


		//throw new Error("TODO: implementar getTotal");
	}
}

// 4) Crie a classe Estoque
// Use Map para guardar { sku -> quantidade }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// Métodos:
// - definirQuantidade(sku, quantidade)
// - adicionar(sku, quantidade)
// - remover(sku, quantidade)
// - getQuantidade(sku)
// - garantirDisponibilidade(sku, quantidade)

class Estoque {
	constructor() {
		this.items = new Map(); // criação de um mapa fazio  
	}

	definirQuantidade(sku, quantidade) {
		this.items.set(sku, quantidade); // funçao que define quantidade com parametro (sku e quantidade) sku sendo chave e quantidade valor derivada da mesma 
	}

	adicionar(sku, quantidade) {
		const atual = this.getQuantidade(sku); // cria uma variavel nova guardando o valor retornada 
		this.items.set(sku, atual + quantidade); // faz a soma da quantidade actual com a quantidade adicionda 
	}

	remover(sku, quantidade) {
		const atual = this.getQuantidade(sku);

		if (quantidade > atual) { //condição criada para verificar se a quantida pedida para remoção é inferior a quantidade actual 
			throw new Error("Quantidade insuficiente em estoque"); // mesagem que aparecque apos tal verificação caso verdadeira 
		}

		this.items.set(sku, atual - quantidade);// função que faz a subrtação do quantido pedida da quantidade actual 
	}

	getQuantidade(sku) {
		if (!this.items.has(sku)) { // condição para verificar se produto existe ou não
			throw new Error("Produto não existe no estoque");// messagem de erro caso não exista 
		}

		return this.items.get(sku);
	}

	garantirDisponibilidade(sku, quantidade) {
		if (this.getQuantidade(sku) < quantidade) { // condição que determina se prduto se encontra em estoque
			throw new Error(`Estoque insuficiente para ${sku}`);
		}
	}
}

// 5) Crie a classe Catalogo
// Use Map para guardar { sku -> Produto }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// Métodos:
// - adicionarProduto(produto)
// - getProduto(sku)
// - listarPorCategoria(categoria)
// - atualizarPreco(sku, novoPreco)

class Catalogo {
	constructor() {

		this.produtos = new Map(); // adição de novo mapa vazio 
	}

	adicionarProduto(produto) {
		if (!produto || !produto.sku) {
			throw new Error("Produto inválido");
		}

		this.produtos.set(produto.sku, produto);
	}

	getProduto(sku) {
		return this.produtos.get(sku) || null;
	}

	listarPorCategoria(categoria) {
		const resultado = [];

		for (const produto of this.produtos.values()) {
			if (produto.categoria === categoria) {
				resultado.push(produto);
			}
		}

		return resultado;
	}

	atualizarPreco(sku, novoPreco) {
		const produto = this.getProduto(sku);

		if (!produto) {
			throw new Error("Produto não existe");
		}

		produto.preco = novoPreco;
	}
}

// 6) Crie a classe CarrinhoDeCompras
// Responsabilidades:
// - adicionar itens (validando estoque)
// - remover itens
// - alterar quantidade
// - calcular subtotal
// - consolidar itens por sku (sem duplicatas)
// Sugestão: use Map sku -> ItemCarrinho
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

class CarrinhoDeCompras {
	constructor({ catalogo, estoque }) {
		if (!catalogo || !estoque) throw new Error("É necessário fornecer catalogo e estoque");
		this.catalogo = catalogo;
		this.estoque = estoque;
		this.itens = new Map(); // sku -> ItemCarrinho
	}

	adicionarItem(sku, quantidade) {
		assertPositiveNumber(quantidade, "quantidade");
		this.estoque.garantirDisponibilidade(sku, quantidade);
		const produto = this.catalogo.getProduto(sku);
		if (!produto) throw new Error("Produto não encontrado");

		if (this.itens.has(sku)) {
			const item = this.itens.get(sku);
			item.quantidade += quantidade;
		} else {
			this.itens.set(sku, new ItemCarrinho({
				sku,
				quantidade,
				precoUnitario: produto.preco
			}));
		}
	}

	removerItem(sku) {
		if (!this.itens.has(sku)) throw new Error("Produto não está no carrinho");
		this.itens.delete(sku);
	}

	alterarQuantidade(sku, novaQuantidade) {
		assertNonNegativeInt(novaQuantidade, "novaQuantidade");
		if (!this.itens.has(sku)) throw new Error("Produto não está no carrinho");

		if (novaQuantidade === 0) {
			this.removerItem(sku);
			return;
		}

		this.estoque.garantirDisponibilidade(sku, novaQuantidade);
		this.itens.get(sku).quantidade = novaQuantidade;
	}

	listarItens() {
		return Array.from(this.itens.values());
	}

	getSubtotal() {
		let total = 0;
		for (const item of this.itens.values()) {
			total += item.getTotal();
		}
		return Number(total.toFixed(2));
	}
}

// ==========================================
// PARTE 2 - Regras de preço (promoções)
// ==========================================

// Você implementará um motor de preços com as regras abaixo.
// Você deve conseguir produzir um “breakdown” (quebra) do total:
// - subtotal
// - descontos (lista com nome + valor)
// - base de imposto
// - imposto total
// - frete
// - total final

// Estrutura sugerida do breakdown (objeto):
// {
//   subtotal,
//   descontos: [{ codigo, descricao, valor }],
//   totalDescontos,
//   impostoPorCategoria: { [categoria]: valor },
//   totalImpostos,
//   frete,
//   total
// }

// 7) Regras obrigatórias (todas devem existir e ser testáveis):
// R1 - Desconto VIP:
// - Se cliente.tipo === "VIP", aplica 5% no subtotal (apenas uma vez).
// - Não pode ser aplicado se existir cupom "SEM-VIP".
//
// R2 - Cupom:
// - Cupom "ETIC10" => 10% no subtotal
// - Cupom "FRETEGRATIS" => frete zerado
// - Cupom "SEM-VIP" => bloqueia R1
// - Cupom inválido deve lançar Error
//
// R3 - Leve 3 pague 2 (vestuário):
// - Para produtos da categoria "vestuário": a cada 3 unidades (somando SKUs diferentes),
//   a unidade mais barata dentre as 3 sai grátis.
// - Ex: 3 camisetas (10), 1 calça (50), 1 meia (5) => total unidades=5 => aplica 1 grátis
//   (a mais barata dentro do grupo de 3) e sobram 2 sem promo.
//
// R4 - Desconto por valor:
// - Se subtotal >= 500, aplica desconto fixo de 30.
//
// Observação de dificuldade:
// - Você precisa decidir ordem de aplicação e documentar.
// - Você precisa impedir descontos maiores que o subtotal.
// - Deve ser determinístico.

// 8) Crie uma classe MotorDePrecos
// Método principal:
// - calcular({ cliente, itens, cupomCodigo }) => breakdown
// Onde itens é o resultado de carrinho.listarItens()

class MotorDePrecos {
	constructor({ catalogo }) {
		if (!catalogo) throw new Error("Catálogo é obrigatório"); //verifica se o catalog se enconta disponivel 
		this.catalogo = catalogo; // atribui o catalago a instacia do objecto 

		this.cuponsValidos = ["ETIC10", "FRETEGRATIS", "SEM-VIP"]; //determina o tipo de cupoes 
		this.fretePadrao = 50; // determina o valor do envio inicial 
	}

	calcular({ cliente, itens, cupomCodigo }) {
		if (!Array.isArray(itens)) throw new Error("Itens inválidos");// faz a verificação de um array 

		if (cupomCodigo && !this.cuponsValidos.includes(cupomCodigo)) {// faz a verificação para ver se o cupão é um dos predefinidos pelo sistema 
			throw new Error(`Cupom inválido: ${cupomCodigo}`);
		}

		const detalhes = itens.map(item => { // cria um novo array com os detalhes de cada item
			const produto = this.catalogo.buscarPorId(item.produtoId); // procura o produto atraves do id
			if (!produto) throw new Error(`Produto ${item.produtoId} não encontrado`);
			return { // retorna todos os detalhes do produto 
				produtoId: produto.id,
				nome: produto.nome,
				categoria: produto.categoria,
				precoUnitario: produto.preco,
				quantidade: item.quantidade,
				total: produto.preco * item.quantidade // calcula o total dos items
			};
		});

		const subtotalOriginal = detalhes.reduce((sum, i) => sum + i.total, 0); // calcula o subtotal somando o subtotal do item
		let subtotal = subtotalOriginal;
		let descontos = []; //guarda os descontos aplicados


		const roupas = detalhes.filter(i => i.categoria === "vestuário"); // filtra todos os items da categoria vestuario 
		const unidades = [];
		roupas.forEach(i => { // da um preço de cada roupa no array unidades 
			for (let q = 0; q < i.quantidade; q++) {
				unidades.push(i.precoUnitario);
			}
		});
		unidades.sort((a, b) => a - b); //orderna os prços de forma crescente 

		const numGruposDe3 = Math.floor(unidades.length / 3); // calcula os grupos de 3 
		let descontoR3 = 0;
		for (let g = 0; g < numGruposDe3; g++) {// aplicas o valor para os grupos de 3
			descontoR3 += unidades[g * 3];
		}
		if (descontoR3 > 0) { 
			subtotal -= descontoR3;
			descontos.push({
				codigo: "LEVE3PAGUE2",
				descricao: "Leve 3 Pague 2 (roupas)",
				valor: descontoR3
			});
		}

		let descontoR1 = 0; // aplica o desconto vip, se o cliente for vip 
		if (cliente?.tipo === "VIP" && cupomCodigo !== "SEM-VIP") {
			descontoR1 = subtotal * 0.05; // cria o desconto de 5% para clientes vips 
			subtotal -= descontoR1;
			descontos.push({
				codigo: "VIP",
				descricao: "Desconto VIP 5%",
				valor: descontoR1 
			});
		}

		let descontoR2Cupom = 0; //aplica desconto de cupao caso os tenha 
		let frete = this.fretePadrao;
		if (cupomCodigo === "ETIC10") {
			descontoR2Cupom = subtotal * 0.10; // cria desconto de 10% com cupom etic10
			subtotal -= descontoR2Cupom;
			descontos.push({
				codigo: "ETIC10",
				descricao: "Desconto cupom ETIC10 10%",
				valor: descontoR2Cupom
			});
		} else if (cupomCodigo === "FRETEGRATIS") {// se tiver cupom tiver frete gratis, o cliente nao paga frete 
			frete = 0;
		}

		let descontoR4 = 0;// se o valor for maior que 500 ira se aplicas um desconto adicional 
		if (subtotal >= 500) {
			descontoR4 = 30;
			subtotal -= descontoR4;
			descontos.push({
				codigo: "VALOR500",
				descricao: "Desconto por valor >= 500",
				valor: descontoR4
			});
		}

		subtotal = Math.max(0, subtotal); //assegura que subtotal nao fique negativo 


		const impostoPorCategoria = {}; // calcula impostos consoante o sector 
		detalhes.forEach(i => {
			const taxa = i.categoria === "vestuário" ? 0.12 : 0.18; // define iposto de 12% para vestuario e 18% para o resto 
			impostoPorCategoria[i.categoria] = //acumula os impostos todos 
				(impostoPorCategoria[i.categoria] || 0) + i.total * taxa;
		});
		const totalImpostos = Object.values(impostoPorCategoria).reduce((a, b) => a + b, 0); // faz o total dos impostos

		const totalDescontos = descontos.reduce((sum, d) => sum + d.valor, 0); // calacula o total dos descontos 
		const total = subtotal + totalImpostos + frete;// calcula o valor do subtotal mais impostos mais envio

		return { //retorna o subtotal, descontos, total descontos, imposto, envio...
			subtotal: subtotalOriginal,
			descontos,
			totalDescontos,
			impostoPorCategoria,
			totalImpostos,
			frete,
			total,
			itens: detalhes
		};
	}
}

// ==========================================
// PARTE 3 - Checkout / Pedido / Cupom
// ==========================================

// 9) Crie a classe Pedido
// Requisitos:
// - id (string)
// - clienteId
// - itens (array)
// - breakdown (objeto)
// - status: "ABERTO" | "PAGO" | "CANCELADO"
// - createdAt (Date)
// Métodos:
// - pagar()
// - cancelar()

class Pedido {
	constructor({ id, clienteId, itens = [], breakdown = {} }) {
		if (!id) throw new Error("id é obrigatório"); // verifica o id 
		if (!clienteId) throw new Error("clienteId é obrigatório");// verifica a existencia do cliente 
		if (!Array.isArray(itens)) throw new Error("itens deve ser um array");//garante que os items estejam num array 

		this.id = id;
		this.clienteId = clienteId;
		this.itens = itens;
		this.breakdown = breakdown;

		this.status = "ABERTO";
		this.createdAt = new Date();
	}

	pagar() {
		if (this.status === "CANCELADO") {// nao deixa fazer o pagamento caso o pediso seja cancelado 
			throw new Error("Não é possível pagar um pedido cancelado");
		}

		if (this.status === "PAGO") {//nao deixa fazer pagamentos duplicaods 
			throw new Error("Pedido já está pago");
		}

		this.status = "PAGO"; // determina como pago 
	}

	cancelar() {
		if (this.status === "PAGO") {// nao deixa cacelar produto ja pago 
			throw new Error("Não é possível cancelar um pedido já pago");
		}

		if (this.status === "CANCELADO") {//nao deixa cancela em dumplicado 
			throw new Error("Pedido já está cancelado");
		}

		this.status = "CANCELADO";//determina como cancelado 
	}
}

// 10) Crie a classe CaixaRegistradora
// Responsabilidades:
// - receber (catalogo, estoque, motorDePrecos)
// - fecharCompra({ cliente, carrinho, cupomCodigo, numeroDeParcelas }) => Pedido
// Regras:
// - Ao fechar compra, deve remover do estoque as quantidades compradas
// - Se numeroDeParcelas for informado, deve validar com base no Produto (máximo permitido)
// - Deve somar parcelas por item e imprimir um resumo no cupom (opcional, mas recomendado)

class CaixaRegistradora {
	constructor({ catalogo, estoque, motorDePrecos }) {
		// TODO
		throw new Error("TODO: implementar CaixaRegistradora");
	}

	fecharCompra({ cliente, carrinho, cupomCodigo = null, numeroDeParcelas = 1 }) {
		// TODO
		throw new Error("TODO: implementar fecharCompra");
	}
}

// 11) Crie a classe CupomFiscal
// Deve gerar texto em linhas (array de strings) contendo:
// - cabeçalho
// - itens: sku, quantidade, preço unitário, total do item
// - subtotal, descontos (linha por desconto), impostos (por categoria), frete, total
// - status do pedido

class CupomFiscal {
	constructor({ pedido, catalogo }) {
		// TODO
		throw new Error("TODO: implementar CupomFiscal");
	}

	gerarLinhas() {
		// TODO
		throw new Error("TODO: implementar gerarLinhas");
	}
}

class Impressora {
	imprimirLinhas(linhas) {
		for (const linha of linhas) {
			console.log(linha);
		}
	}
}

// ==========================================
// PARTE 4 - Relatórios (estruturas de dados + loops)
// ==========================================

// 12) Crie a classe RelatorioVendas
// - Deve armazenar pedidos pagos
// - Deve gerar:
//   - totalArrecadado()
//   - totalImpostos()
//   - totalDescontos()
//   - rankingProdutosPorQuantidade(topN)
//   - arrecadadoPorCategoria()
// Sugestão: use Map para acumular por sku/categoria.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

class RelatorioVendas {
	constructor() {
		// TODO
		throw new Error("TODO: implementar RelatorioVendas");
	}

	registrarPedido(pedido) {
		// TODO
		throw new Error("TODO: implementar registrarPedido");
	}

	totalArrecadado() {
		// TODO
		throw new Error("TODO: implementar totalArrecadado");
	}

	totalImpostos() {
		// TODO
		throw new Error("TODO: implementar totalImpostos");
	}

	totalDescontos() {
		// TODO
		throw new Error("TODO: implementar totalDescontos");
	}

	rankingProdutosPorQuantidade(topN = 5) {
		// TODO
		throw new Error("TODO: implementar rankingProdutosPorQuantidade");
	}

	arrecadadoPorCategoria() {
		// TODO
		throw new Error("TODO: implementar arrecadadoPorCategoria");
	}
}

// ==========================================
// DADOS DE TESTE (para o demo)
// ==========================================

function seedCatalogoEEstoque() {
	const catalogo = new Catalogo();
	const estoque = new Estoque();

	const produtos = [
		// alimentos
		{ sku: "ARROZ", nome: "Arroz 1kg", preco: 6.0, fabricante: "Marca A", categoria: "alimentos", numeroMaximoParcelas: 1 },
		{ sku: "FEIJAO", nome: "Feijão 1kg", preco: 7.5, fabricante: "Marca B", categoria: "alimentos", numeroMaximoParcelas: 1 },
		{ sku: "OLEO", nome: "Óleo 900ml", preco: 8.0, fabricante: "Marca C", categoria: "alimentos", numeroMaximoParcelas: 1 },
		// vestuário
		{ sku: "CAMISETA", nome: "Camiseta", preco: 30.0, fabricante: "Hering", categoria: "vestuário", numeroMaximoParcelas: 6 },
		{ sku: "CALCA", nome: "Calça Jeans", preco: 120.0, fabricante: "Levis", categoria: "vestuário", numeroMaximoParcelas: 6 },
		{ sku: "MEIA", nome: "Meia", preco: 10.0, fabricante: "Puket", categoria: "vestuário", numeroMaximoParcelas: 6 },
		// eletrodoméstico
		{ sku: "MICRO", nome: "Micro-ondas", preco: 499.9, fabricante: "LG", categoria: "eletrodoméstico", numeroMaximoParcelas: 12 },
		{ sku: "LIQUID", nome: "Liquidificador", preco: 199.9, fabricante: "Philco", categoria: "eletrodoméstico", numeroMaximoParcelas: 10 },
		// decoração
		{ sku: "VASO", nome: "Vaso Decorativo", preco: 89.9, fabricante: "Tok&Stok", categoria: "decoração", numeroMaximoParcelas: 5 },
		// materiais de construção
		{ sku: "CIMENTO", nome: "Cimento 25kg", preco: 35.0, fabricante: "Holcim", categoria: "materiais de construção", numeroMaximoParcelas: 3 }
	];

	for (const p of produtos) {
		const produto = new Produto(p);
		catalogo.adicionarProduto(produto);
	}

	// Estoque inicial
	estoque.definirQuantidade("ARROZ", 50);
	estoque.definirQuantidade("FEIJAO", 50);
	estoque.definirQuantidade("OLEO", 50);
	estoque.definirQuantidade("CAMISETA", 20);
	estoque.definirQuantidade("CALCA", 10);
	estoque.definirQuantidade("MEIA", 30);
	estoque.definirQuantidade("MICRO", 5);
	estoque.definirQuantidade("LIQUID", 8);
	estoque.definirQuantidade("VASO", 10);
	estoque.definirQuantidade("CIMENTO", 100);

	return { catalogo, estoque };
}

// ==========================================
// DEMO (cenários obrigatórios)
// ==========================================

// Critérios de aceite (quando você terminar):
// - Cenário A: cliente VIP, sem cupom, compra vestuário com regra leve-3-pague-2
// - Cenário B: cliente REGULAR com cupom ETIC10
// - Cenário C: cupom inválido deve gerar erro
// - Cenário D: tentar comprar acima do estoque deve gerar erro
// - Cenário E: relatório deve refletir pedidos pagos

function runDemo() {
	const { catalogo, estoque } = seedCatalogoEEstoque();
	const motor = new MotorDePrecos({ catalogo });
	const caixa = new CaixaRegistradora({ catalogo, estoque, motorDePrecos: motor });
	const relatorio = new RelatorioVendas();
	const impressora = new Impressora();

	const clienteVip = new Cliente({ id: "C1", nome: "Ana", tipo: "VIP", saldoPontos: 0 });
	const clienteRegular = new Cliente({ id: "C2", nome: "Bruno", tipo: "REGULAR", saldoPontos: 0 });

	// Cenário A
	{
		const carrinho = new CarrinhoDeCompras({ catalogo, estoque });
		carrinho.adicionarItem("CAMISETA", 2);
		carrinho.adicionarItem("MEIA", 1);
		carrinho.adicionarItem("CALCA", 1);

		const pedido = caixa.fecharCompra({
			cliente: clienteVip,
			carrinho,
			cupomCodigo: null,
			numeroDeParcelas: 3
		});

		pedido.pagar();
		relatorio.registrarPedido(pedido);

		const cupom = new CupomFiscal({ pedido, catalogo });
		impressora.imprimirLinhas(cupom.gerarLinhas());
	}

	// Cenário B
	{
		const carrinho = new CarrinhoDeCompras({ catalogo, estoque });
		carrinho.adicionarItem("MICRO", 1);
		carrinho.adicionarItem("VASO", 1);

		const pedido = caixa.fecharCompra({
			cliente: clienteRegular,
			carrinho,
			cupomCodigo: "ETIC10",
			numeroDeParcelas: 10
		});

		pedido.pagar();
		relatorio.registrarPedido(pedido);

		const cupom = new CupomFiscal({ pedido, catalogo });
		impressora.imprimirLinhas(cupom.gerarLinhas());
	}

	// Cenário C (cupom inválido)
	{
		const carrinho = new CarrinhoDeCompras({ catalogo, estoque });
		carrinho.adicionarItem("ARROZ", 1);

		try {
			caixa.fecharCompra({ cliente: clienteRegular, carrinho, cupomCodigo: "INVALIDO" });
		} catch (err) {
			console.log("(OK) Cupom inválido gerou erro:");
			console.log(String(err.message || err));
		}
	}

	// Cenário D (estoque insuficiente)
	{
		const carrinho = new CarrinhoDeCompras({ catalogo, estoque });
		try {
			carrinho.adicionarItem("MICRO", 999);
		} catch (err) {
			console.log("(OK) Estoque insuficiente gerou erro:");
			console.log(String(err.message || err));
		}
	}

	// Cenário E (relatório)
	{
		console.log("==============================");
		console.log("Relatório");
		console.log("==============================");
		console.log("Total arrecadado:", formatBRL(relatorio.totalArrecadado()));
		console.log("Total impostos:", formatBRL(relatorio.totalImpostos()));
		console.log("Total descontos:", formatBRL(relatorio.totalDescontos()));
		console.log("Top produtos:", relatorio.rankingProdutosPorQuantidade(3));
		console.log("Por categoria:", relatorio.arrecadadoPorCategoria());
	}
}

// Quando terminar tudo, descomente:
// runDemo();


