"use strict";
class Produto {
    constructor(nome, fabricante, valor) {
        this.nome = nome;
        this.fabricante = fabricante;
        this.valor = valor;
        this.id = Produto.proximoId++;
    }
}
Produto.proximoId = 1;
class TV extends Produto {
    constructor(nome, fabricante, valor, resolucao, polegadas) {
        super(nome, fabricante, valor);
        this.resolucao = resolucao;
        this.polegadas = polegadas;
    }
    exibirDetalhes() {
        return `${this.nome} (${this.fabricante}) - ${this.polegadas}" ${this.resolucao}`;
    }
}
class Celular extends Produto {
    constructor(nome, fabricante, valor, memoria) {
        super(nome, fabricante, valor);
        this.memoria = memoria;
    }
    exibirDetalhes() {
        return `${this.nome} (${this.fabricante}) - ${this.memoria}GB`;
    }
}
class Bicicleta extends Produto {
    constructor(nome, fabricante, valor, tamanhoAro) {
        super(nome, fabricante, valor);
        this.tamanhoAro = tamanhoAro;
    }
    exibirDetalhes() {
        return `${this.nome} (${this.fabricante}) - Aro ${this.tamanhoAro}`;
    }
}
class Carrinho {
    constructor() {
        this.itens = [];
    }
    adicionarItem(item) { this.itens.push(item); }
    removerItem(id) { this.itens = this.itens.filter(item => item.id !== id); }
    getItens() { return this.itens; }
    calcularTotal() { return this.itens.reduce((total, item) => total + item.valor, 0); }
}
const meuCarrinho = new Carrinho();
const catalogoProdutos = {
    tv: [
        { nome: 'Smart TV Crystal UHD', fabricante: 'Samsung', valor: 2100.50, resolucao: '4K', polegadas: 50 },
        { nome: 'Neo QLED', fabricante: 'Samsung', valor: 5500.00, resolucao: '8K', polegadas: 60 },
        { nome: 'OLED evo C3', fabricante: 'LG', valor: 4850.00, resolucao: '4K', polegadas: 55 },
        { nome: 'BRAVIA XR', fabricante: 'Sony', valor: 6200.00, resolucao: '8K', polegadas: 65 }
    ],
    celular: [
        { nome: 'Galaxy S23', fabricante: 'Samsung', valor: 4500.00, memoria: 256 },
        { nome: 'iPhone 15 Pro', fabricante: 'Apple', valor: 7200.00, memoria: 256 },
        { nome: 'Edge 40', fabricante: 'Motorola', valor: 2800.00, memoria: 128 }
    ],
    bicicleta: []
};
const seletorTipoProduto = document.getElementById('tipoProduto');
const seletorFabricante = document.getElementById('seletorFabricante');
const seletorModelo = document.getElementById('seletorModelo');
const formProduto = document.getElementById('formProduto');
const filtrosPredefinidos = document.getElementById('filtrosPredefinidos');
const camposManuais = document.getElementById('camposManuais');
const camposBicicleta = document.getElementById('camposBicicleta');
function renderizarCarrinho() {
    const divCarrinho = document.getElementById('carrinhoItens');
    const spanTotal = document.getElementById('valorTotal');
    divCarrinho.innerHTML = '';
    const itens = meuCarrinho.getItens();
    if (itens.length === 0) {
        divCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
    }
    else {
        itens.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `<div class="item-detalhes"><strong>${item.exibirDetalhes()}</strong></div><strong class="item-valor">R$ ${item.valor.toFixed(2)}</strong><button class="remover-btn" onclick="removerItemDoCarrinho(${item.id})">X</button>`;
            divCarrinho.appendChild(itemDiv);
        });
    }
    spanTotal.textContent = `R$ ${meuCarrinho.calcularTotal().toFixed(2)}`;
}
// Substitua a função inteira por esta no seu script.ts
seletorTipoProduto.addEventListener('change', () => {
    const tipo = seletorTipoProduto.value;
    // --- INÍCIO DA CORREÇÃO ---
    // Pegando os inputs manuais para podermos alterar a propriedade 'required'
    const nomeInput = document.getElementById('nome');
    const fabricanteInput = document.getElementById('fabricante');
    const valorInput = document.getElementById('valor');
    const aroInput = document.getElementById('aro');
    // --- FIM DA CORREÇÃO ---
    filtrosPredefinidos.classList.add('hidden');
    camposManuais.classList.add('hidden');
    camposBicicleta.classList.add('hidden');
    seletorFabricante.innerHTML = '';
    seletorModelo.innerHTML = '';
    // Tornando os campos NÃO obrigatórios por padrão
    nomeInput.required = false;
    fabricanteInput.required = false;
    valorInput.required = false;
    aroInput.required = false;
    if (tipo === 'tv' || tipo === 'celular') {
        filtrosPredefinidos.classList.remove('hidden');
        const fabricantes = [...new Set(catalogoProdutos[tipo].map(p => p.fabricante))];
        seletorFabricante.innerHTML = '<option value="">-- Todos --</option>';
        fabricantes.forEach(f => {
            const option = document.createElement('option');
            option.value = f;
            option.textContent = f;
            seletorFabricante.appendChild(option);
        });
        seletorFabricante.dispatchEvent(new Event('change'));
    }
    else if (tipo === 'bicicleta') {
        camposManuais.classList.remove('hidden');
        camposBicicleta.classList.remove('hidden');
        // Tornando os campos obrigatórios NOVAMENTE para o modo manual
        nomeInput.required = true;
        fabricanteInput.required = true;
        valorInput.required = true;
        aroInput.required = true;
    }
});
seletorFabricante.addEventListener('change', () => {
    const tipo = seletorTipoProduto.value;
    const fabricante = seletorFabricante.value;
    seletorModelo.innerHTML = '<option value="">-- Escolha um modelo --</option>';
    if (tipo === 'tv') {
        let produtosFiltrados = catalogoProdutos.tv;
        if (fabricante) {
            produtosFiltrados = produtosFiltrados.filter(p => p.fabricante === fabricante);
        }
        produtosFiltrados.forEach((produto) => {
            const option = document.createElement('option');
            option.value = `tv-${catalogoProdutos.tv.indexOf(produto)}`;
            option.textContent = `${produto.nome} - R$ ${produto.valor.toFixed(2)}`;
            seletorModelo.appendChild(option);
        });
    }
    else if (tipo === 'celular') {
        let produtosFiltrados = catalogoProdutos.celular;
        if (fabricante) {
            produtosFiltrados = produtosFiltrados.filter(p => p.fabricante === fabricante);
        }
        produtosFiltrados.forEach((produto) => {
            const option = document.createElement('option');
            option.value = `celular-${catalogoProdutos.celular.indexOf(produto)}`;
            option.textContent = `${produto.nome} - R$ ${produto.valor.toFixed(2)}`;
            seletorModelo.appendChild(option);
        });
    }
});
formProduto.addEventListener('submit', (event) => {
    event.preventDefault();
    const tipo = seletorTipoProduto.value;
    let novoProduto = null;
    if (tipo === 'tv' || tipo === 'celular') {
        const selectedModelId = seletorModelo.value;
        if (!selectedModelId) {
            alert('Por favor, escolha um modelo.');
            return;
        }
        const [tipoCatalogo, indexStr] = selectedModelId.split('-');
        const index = parseInt(indexStr);
        if (tipoCatalogo === 'tv') {
            const tvData = catalogoProdutos.tv[index];
            novoProduto = new TV(tvData.nome, tvData.fabricante, tvData.valor, tvData.resolucao, tvData.polegadas);
        }
        else if (tipoCatalogo === 'celular') {
            const celularData = catalogoProdutos.celular[index];
            novoProduto = new Celular(celularData.nome, celularData.fabricante, celularData.valor, celularData.memoria);
        }
    }
    else if (tipo === 'bicicleta') {
        const nome = document.getElementById('nome').value;
        const fabricante = document.getElementById('fabricante').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const aro = parseInt(document.getElementById('aro').value);
        novoProduto = new Bicicleta(nome, fabricante, valor, aro);
    }
    if (novoProduto) {
        meuCarrinho.adicionarItem(novoProduto);
        renderizarCarrinho();
        formProduto.reset();
        seletorTipoProduto.value = '';
        filtrosPredefinidos.classList.add('hidden');
        camposManuais.classList.add('hidden');
    }
});
function removerItemDoCarrinho(id) {
    meuCarrinho.removerItem(id);
    renderizarCarrinho();
}
window.removerItemDoCarrinho = removerItemDoCarrinho;
renderizarCarrinho();
