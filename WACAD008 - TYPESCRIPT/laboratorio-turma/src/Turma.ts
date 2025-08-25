// src/Turma.ts
import { Aluno } from "./Aluno";

export class Turma {
    private alunos: Aluno[] = [];

    constructor(public id: number, public nome: string) {}

    adicionarAluno(aluno: Aluno) {
        if (this.alunos.some(a => a.id === aluno.id)) {
            console.log(`\n❌ Erro: Aluno com ID ${aluno.id} já existe.`);
            return;
        }
        this.alunos.push(aluno);
        console.log(`\n✅ Aluno "${aluno.nomeCompleto}" adicionado à turma "${this.nome}".`);
        this.displayEstatisticas();
    }

    removerAluno(id: number) {
        const index = this.alunos.findIndex(a => a.id === id);
        if (index === -1) {
            console.log(`\n❌ Erro: Aluno com ID ${id} não encontrado.`);
            return;
        }
        const alunoRemovido = this.alunos.splice(index, 1);
        console.log(`\n🗑️ Aluno "${alunoRemovido[0].nomeCompleto}" removido da turma.`);
        this.displayEstatisticas();
    }

    editarAluno(id: number, nome: string, idade: number, altura: number, peso: number) {
        const aluno = this.alunos.find(a => a.id === id);
        if (!aluno) {
            console.log(`\n❌ Erro: Aluno com ID ${id} não encontrado.`);
            return;
        }
        aluno.nomeCompleto = nome;
        aluno.idade = idade;
        aluno.altura = altura;
        aluno.peso = peso;
        console.log(`\n🔄 Dados do aluno "${aluno.nomeCompleto}" atualizados.`);
        this.displayEstatisticas();
    }

    private _calcularMedia(propriedade: 'idade' | 'altura' | 'peso'): number {
        if (this.alunos.length === 0) return 0;
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno[propriedade], 0);
        return soma / this.alunos.length;
    }
    
    getNumAlunos(): number {
        return this.alunos.length;
    }

    getMediaIdades(): number {
        return this._calcularMedia('idade');
    }

    getMediaAlturas(): number {
        return this._calcularMedia('altura');
    }

    getMediaPesos(): number {
        return this._calcularMedia('peso');
    }

    displayEstatisticas() {
        console.log(`\n--- 📊 Estatísticas da Turma: ${this.nome} ---`);
        console.log(`Número de Alunos: ${this.getNumAlunos()}`);
        console.log(`Média de Idade: ${this.getMediaIdades().toFixed(2)} anos`);
        console.log(`Média de Altura: ${this.getMediaAlturas().toFixed(2)} m`);
        console.log(`Média de Peso: ${this.getMediaPesos().toFixed(2)} kg`);
        console.log(`----------------------------------------`);
    }
}