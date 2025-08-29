// script.ts COMPLETO E CORRETO

// --- CLASSE ALUNO ---
class Aluno {
    constructor(
        public id: number,
        public nome: string,
        public idade: number,
        public altura: number, // em metros, ex: 1.75
        public peso: number    // em kg, ex: 70
    ) {}
}

// --- CLASSE TURMA ---
class Turma {
    private alunos: Aluno[] = [];
    private proximoId = 1;

    constructor(
        public id: number,
        public nome: string
    ) {}

    adicionarAluno(nome: string, idade: number, altura: number, peso: number) {
        const novoAluno = new Aluno(this.proximoId, nome, idade, altura, peso);
        this.alunos.push(novoAluno);
        this.proximoId++;
    }

    removerAluno(id: number) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    }
    
    encontrarAlunoPorId(id: number): Aluno | undefined {
        return this.alunos.find(aluno => aluno.id === id);
    }

    getNumAlunos(): number {
        return this.alunos.length;
    }

    private calcularMedia(propriedade: 'idade' | 'altura' | 'peso'): number {
        if (this.alunos.length === 0) return 0;
        const soma = this.alunos.reduce((total, aluno) => total + aluno[propriedade], 0);
        return soma / this.alunos.length;
    }

    getIdadeMedia(): number {
        return this.calcularMedia('idade');
    }

    getAlturaMedia(): number {
        return this.calcularMedia('altura');
    }

    getMediaPesos(): number {
        return this.calcularMedia('peso');
    }

    getAlunos(): Aluno[] {
        return this.alunos;
    }
}


// --- LÓGICA DA APLICAÇÃO (VIEW E CONTROLLER) ---

const turma = new Turma(1, "Turma de Educação Física");

const form = document.getElementById('alunoForm') as HTMLFormElement;
const nomeInput = document.getElementById('nomeInput') as HTMLInputElement;
const idadeInput = document.getElementById('idadeInput') as HTMLInputElement;
const alturaInput = document.getElementById('alturaInput') as HTMLInputElement;
const pesoInput = document.getElementById('pesoInput') as HTMLInputElement;
const alunoIdInput = document.getElementById('alunoId') as HTMLInputElement;
const gerarAlunoBtn = document.getElementById('gerarAlunoBtn') as HTMLButtonElement;
const cancelarEdicaoBtn = document.getElementById('cancelarEdicaoBtn') as HTMLButtonElement;

function renderizarEstatisticas() {
    document.getElementById('numAlunos')!.textContent = turma.getNumAlunos().toString();
    document.getElementById('idadeMedia')!.textContent = turma.getIdadeMedia().toFixed(1);
    document.getElementById('alturaMedia')!.textContent = turma.getAlturaMedia().toFixed(2) + ' m';
    document.getElementById('pesoMedia')!.textContent = turma.getMediaPesos().toFixed(1) + ' kg';
}

function renderizarAlunos() {
    const listaAlunos = document.getElementById('listaAlunos')!;
    listaAlunos.innerHTML = '';
    
    turma.getAlunos().forEach(aluno => {
        const item = document.createElement('li');
        item.className = 'aluno-item';
        item.innerHTML = `
            <span>${aluno.nome}</span>
            <span>${aluno.idade} anos</span>
            <span>${aluno.altura.toFixed(2)} m</span>
            <span>${aluno.peso.toFixed(1)} kg</span>
            <span class="aluno-actions">
                <button class="edit-btn" onclick="prepararEdicao(${aluno.id})">Editar</button>
                <button class="delete-btn" onclick="deletarAluno(${aluno.id})">Excluir</button>
            </span>
        `;
        listaAlunos.appendChild(item);
    });
}

function atualizarTudo() {
    renderizarEstatisticas();
    renderizarAlunos();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = parseInt(alunoIdInput.value);
    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value);
    const altura = parseFloat(alturaInput.value);
    const peso = parseFloat(pesoInput.value);

    if (id) {
        const aluno = turma.encontrarAlunoPorId(id);
        if (aluno) {
            aluno.nome = nome;
            aluno.idade = idade;
            aluno.altura = altura;
            aluno.peso = peso;
        }
    } else {
        turma.adicionarAluno(nome, idade, altura, peso);
    }
    form.reset();
    alunoIdInput.value = '';
    cancelarEdicaoBtn.classList.add('hidden');
    atualizarTudo();
});

function prepararEdicao(id: number) {
    const aluno = turma.encontrarAlunoPorId(id);
    if (aluno) {
        alunoIdInput.value = aluno.id.toString();
        nomeInput.value = aluno.nome;
        idadeInput.value = aluno.idade.toString();
        alturaInput.value = aluno.altura.toString();
        pesoInput.value = aluno.peso.toString();
        cancelarEdicaoBtn.classList.remove('hidden');
        nomeInput.focus();
    }
}

cancelarEdicaoBtn.addEventListener('click', () => {
    form.reset();
    alunoIdInput.value = '';
    cancelarEdicaoBtn.classList.add('hidden');
});

function deletarAluno(id: number) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        turma.removerAluno(id);
        atualizarTudo();
    }
}

(window as any).prepararEdicao = prepararEdicao;
(window as any).deletarAluno = deletarAluno;

gerarAlunoBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?nat=br');
        const data = await response.json();
        const user = data.results[0];
        const nome = `${user.name.first} ${user.name.last}`;
        const idade = Math.floor(Math.random() * (25 - 18 + 1)) + 18;
        const altura = parseFloat((Math.random() * (1.90 - 1.60) + 1.60).toFixed(2));
        const peso = parseFloat((Math.random() * (90 - 55) + 55).toFixed(1));
        turma.adicionarAluno(nome, idade, altura, peso);
        atualizarTudo();
    } catch (error) {
        console.error('Erro ao gerar aluno aleatório:', error);
        alert('Não foi possível gerar um aluno aleatório. Verifique sua conexão com a internet.');
    }
});

atualizarTudo();