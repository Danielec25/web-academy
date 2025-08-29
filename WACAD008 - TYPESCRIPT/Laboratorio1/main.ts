// Laboratório 01: Lembretes com TypeScript

// TIPO: Define a estrutura de um lembrete usando uma tupla.
type Lembrete = [number, string, Date, Date?, string?];

// DADOS: Array para guardar os lembretes e uma variável para o próximo ID.
let lembretes: Lembrete[] = [];
let proximoId: number = 1;

// SELETORES HTML: Pegando os elementos da página para poder manipulá-los.
const input = document.getElementById('lembreteInput') as HTMLInputElement;
const botaoAdicionar = document.getElementById('addLembreteBtn') as HTMLButtonElement;
const lista = document.getElementById('listaLembretes') as HTMLUListElement;

// --- FUNÇÕES PRINCIPAIS ---

// 1. FUNÇÃO RENDERIZAR: Desenha os lembretes na tela.
function renderizarLembretes() {
    lista.innerHTML = '';
    lembretes.forEach(lembrete => {
        const [id, titulo] = lembrete;
        const itemLista = document.createElement('li');
        
        // >>>>>>>>>>>> DEIXE A LINHA EXATAMENTE ASSIM <<<<<<<<<<<<
        itemLista.innerHTML = `
            <span>${titulo}</span>
            <button onclick="apagarLembrete(${id})">🗑️</button>
        `;

        const span = itemLista.querySelector('span')!;
        span.addEventListener('click', () => editarLembrete(id));

        lista.appendChild(itemLista);
    });
}

// 2. FUNÇÃO ADICIONAR: Cria e adiciona um novo lembrete.
function adicionarLembrete() {
    const titulo = input.value.trim();
    if (titulo === '') {
        alert('Por favor, digite um título para o lembrete.');
        return;
    }

    const novoLembrete: Lembrete = [proximoId, titulo, new Date()];
    lembretes.push(novoLembrete);
    proximoId++;

    input.value = '';
    renderizarLembretes();
}

// 3. FUNÇÃO EDITAR: Altera o título de um lembrete existente.
function editarLembrete(id: number) {
    const lembreteParaEditar = lembretes.find(lembrete => lembrete[0] === id);
    if (!lembreteParaEditar) return;

    const novoTitulo = prompt("Editar lembrete:", lembreteParaEditar[1]);

    if (novoTitulo && novoTitulo.trim() !== '') {
        lembreteParaEditar[1] = novoTitulo.trim();
        renderizarLembretes();
    }
}

// 4. FUNÇÃO APAGAR: Remove um lembrete do array.
function apagarLembrete(id: number) {
    lembretes = lembretes.filter(lembrete => lembrete[0] !== id);
    renderizarLembretes();
}

// --- CONFIGURAÇÃO INICIAL ---

botaoAdicionar.addEventListener('click', adicionarLembrete);

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        adicionarLembrete();
    }
});

(window as any).apagarLembrete = apagarLembrete;

renderizarLembretes();