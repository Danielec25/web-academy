"use strict";
// Laboratório 01: Lembretes com TypeScript
// DADOS: Array para guardar os lembretes e uma variável para o próximo ID.
let lembretes = [];
let proximoId = 1;
// SELETORES HTML: Pegando os elementos da página para poder manipulá-los.
const input = document.getElementById('lembreteInput');
const botaoAdicionar = document.getElementById('addLembreteBtn');
const lista = document.getElementById('listaLembretes');
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
        const span = itemLista.querySelector('span');
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
    const novoLembrete = [proximoId, titulo, new Date()];
    lembretes.push(novoLembrete);
    proximoId++;
    input.value = '';
    renderizarLembretes();
}
// 3. FUNÇÃO EDITAR: Altera o título de um lembrete existente.
function editarLembrete(id) {
    const lembreteParaEditar = lembretes.find(lembrete => lembrete[0] === id);
    if (!lembreteParaEditar)
        return;
    const novoTitulo = prompt("Editar lembrete:", lembreteParaEditar[1]);
    if (novoTitulo && novoTitulo.trim() !== '') {
        lembreteParaEditar[1] = novoTitulo.trim();
        renderizarLembretes();
    }
}
// 4. FUNÇÃO APAGAR: Remove um lembrete do array.
function apagarLembrete(id) {
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
window.apagarLembrete = apagarLembrete;
renderizarLembretes();
