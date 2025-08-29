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
    // Limpa a lista atual para não duplicar itens.
    lista.innerHTML = '';
    // Passa por cada lembrete no array e cria um elemento <li> para ele.
    lembretes.forEach(lembrete => {
        const [id, titulo] = lembrete;
        const itemLista = document.createElement('li');
        // Define o conteúdo HTML do item da lista (o texto e o botão de apagar).
        itemLista.innerHTML = `
            <span>${titulo}</span>
            <button onclick="apagarLembrete(${id})">Apagar</button>
        `;
        // --- AQUI ESTÁ A LÓGICA DA EDIÇÃO ---
        // a) Encontramos o <span> que acabamos de criar dentro do item da lista.
        const span = itemLista.querySelector('span'); // O '!' diz ao TS: "confie em mim, este elemento existe".
        // b) Adicionamos um "escutador de evento" de clique a esse <span>.
        //    Quando o usuário clicar no TEXTO do lembrete, a função editarLembrete será chamada.
        span.addEventListener('click', () => editarLembrete(id));
        // Adiciona o item da lista (<li>) pronto à lista na página (<ul>).
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
    input.value = ''; // Limpa o campo de texto.
    renderizarLembretes(); // Redesenha a lista para mostrar o novo item.
}
// 3. FUNÇÃO EDITAR: Altera o título de um lembrete existente.
function editarLembrete(id) {
    // Encontra o lembrete no array pelo seu ID.
    const lembreteParaEditar = lembretes.find(lembrete => lembrete[0] === id);
    if (!lembreteParaEditar)
        return; // Se não encontrar, não faz nada.
    // Pede ao usuário um novo título usando uma caixa de diálogo (prompt).
    const novoTitulo = prompt("Editar lembrete:", lembreteParaEditar[1]);
    // Se o usuário digitou algo e não clicou em "Cancelar"...
    if (novoTitulo && novoTitulo.trim() !== '') {
        // ...atualiza o título do lembrete no array.
        lembreteParaEditar[1] = novoTitulo.trim();
        // Redesenha a lista para mostrar a alteração.
        renderizarLembretes();
    }
}
// 4. FUNÇÃO APAGAR: Remove um lembrete do array.
function apagarLembrete(id) {
    lembretes = lembretes.filter(lembrete => lembrete[0] !== id);
    renderizarLembretes();
}
// --- CONFIGURAÇÃO INICIAL ---
// Liga a função adicionarLembrete ao clique do botão.
botaoAdicionar.addEventListener('click', adicionarLembrete);
// Permite adicionar com a tecla "Enter" também.
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        adicionarLembrete();
    }
});
// IMPORTANTE: Torna a função apagarLembrete "global" para que o `onclick` no HTML a encontre.
// (Não precisamos fazer isso para a função editar, pois usamos addEventListener, que é uma técnica melhor).
window.apagarLembrete = apagarLembrete;
// Renderiza a lista pela primeira vez quando a página carrega.
renderizarLembretes();
