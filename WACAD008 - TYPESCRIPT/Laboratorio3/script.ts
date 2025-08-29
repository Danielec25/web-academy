interface ItemCompra {
    id: number;
    nome: string;
    valor: number;
    exibirDetalhes(): string;
}

abstract class Produto implements ItemCompra {
    private static proximoId = 1;
    public id: number;
    constructor(public nome: string, public fabricante: string, public valor: number) {
        this.id = Produto.proximoId++;
    }
    abstract exibirDetalhes(): string;
}

class TV extends Produto {
    constructor(nome: string, fabricante: string, valor: number, public resolucao: string, public polegadas: number) {
        super(nome, fabricante, valor);
    }
    exibirDetalhes(): string {
        return `${this.nome} (${this.fabricante}) - ${this.polegadas}" ${this.resolucao}`;
    }
}

class Celular extends Produto {
    constructor(nome: string, fabricante: string, valor: number, public memoria: number) {
        super(nome, fabricante, valor);
    }
    exibirDetalhes(): string {
        return `${this.nome} (${this.fabricante}) - ${this.memoria}GB`;
    }
}

class Bicicleta extends Produto {
    constructor(nome: string, fabricante: string, valor: number, public tamanhoAro: number) {
        super(nome, fabricante, valor);
    }
    exibirDetalhes(): string {
        return `${this.nome} (${this.fabricante}) - Aro ${this.tamanhoAro}`;
    }
}

class Carrinho<T extends ItemCompra> {
    private itens: T[] = [];
    adicionarItem(item: T) { this.itens.push(item); }
    removerItem(id: number) { this.itens = this.itens.filter(item => item.id !== id); }
    getItens(): T[] { return this.itens; }
    calcularTotal(): number { return this.itens.reduce((total, item) => total + item.valor, 0); }
}

const meuCarrinho = new Carrinho<Produto>();

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

const seletorTipoProduto = document.getElementById('tipoProduto') as HTMLSelectElement;
const seletorFabricante = document.getElementById('seletorFabricante') as HTMLSelectElement;
const seletorModelo = document.getElementById('seletorModelo') as HTMLSelectElement;
const formProduto = document.getElementById('formProduto') as HTMLFormElement;
const filtrosPredefinidos = document.getElementById('filtrosPredefinidos')!;
const camposManuais = document.getElementById('camposManuais')!;
const camposBicicleta = document.getElementById('camposBicicleta')!;

function renderizarCarrinho() {
    const divCarrinho = document.getElementById('carrinhoItens')!;
    const spanTotal = document.getElementById('valorTotal')!;
    divCarrinho.innerHTML = '';
    const itens = meuCarrinho.getItens();
    if (itens.length === 0) {
        divCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
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
    const tipo = seletorTipoProduto.value as keyof typeof catalogoProdutos | 'bicicleta';

    // --- INÍCIO DA CORREÇÃO ---
    // Pegando os inputs manuais para podermos alterar a propriedade 'required'
    const nomeInput = document.getElementById('nome') as HTMLInputElement;
    const fabricanteInput = document.getElementById('fabricante') as HTMLInputElement;
    const valorInput = document.getElementById('valor') as HTMLInputElement;
    const aroInput = document.getElementById('aro') as HTMLInputElement;
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

    } else if (tipo === 'bicicleta') {
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
    const tipo = seletorTipoProduto.value as 'tv' | 'celular';
    const fabricante = seletorFabricante.value;
    seletorModelo.innerHTML = '<option value="">-- Escolha um modelo --</option>';

    if (tipo === 'tv') {
        let produtosFiltrados = catalogoProdutos.tv;
        if (fabricante) { produtosFiltrados = produtosFiltrados.filter(p => p.fabricante === fabricante); }
        produtosFiltrados.forEach((produto) => {
            const option = document.createElement('option');
            option.value = `tv-${catalogoProdutos.tv.indexOf(produto)}`;
            option.textContent = `${produto.nome} - R$ ${produto.valor.toFixed(2)}`;
            seletorModelo.appendChild(option);
        });
    } else if (tipo === 'celular') {
        let produtosFiltrados = catalogoProdutos.celular;
        if (fabricante) { produtosFiltrados = produtosFiltrados.filter(p => p.fabricante === fabricante); }
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
    let novoProduto: Produto | null = null;
    if (tipo === 'tv' || tipo === 'celular') {
        const selectedModelId = seletorModelo.value;
        if (!selectedModelId) { alert('Por favor, escolha um modelo.'); return; }
        const [tipoCatalogo, indexStr] = selectedModelId.split('-');
        const index = parseInt(indexStr);
        if (tipoCatalogo === 'tv') {
            const tvData = catalogoProdutos.tv[index];
            novoProduto = new TV(tvData.nome, tvData.fabricante, tvData.valor, tvData.resolucao, tvData.polegadas);
        } else if (tipoCatalogo === 'celular') {
            const celularData = catalogoProdutos.celular[index];
            novoProduto = new Celular(celularData.nome, celularData.fabricante, celularData.valor, celularData.memoria);
        }
    } else if (tipo === 'bicicleta') {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value;
        const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);
        const aro = parseInt((document.getElementById('aro') as HTMLInputElement).value);
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

function removerItemDoCarrinho(id: number) {
    meuCarrinho.removerItem(id);
    renderizarCarrinho();
}

(window as any).removerItemDoCarrinho = removerItemDoCarrinho;

renderizarCarrinho();