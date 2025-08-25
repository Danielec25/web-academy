// src/index.ts
import { Aluno } from "./Aluno";
import { Turma } from "./Turma";

console.log("🚀 Iniciando o sistema de gerenciamento de turmas...");

const turmaEdFisica = new Turma(1, "Educação Física 2025");

const aluno1 = new Aluno(101, "João Silva", 15, 1.75, 68);
const aluno2 = new Aluno(102, "Maria Souza", 16, 1.68, 55);
const aluno3 = new Aluno(103, "Pedro Costa", 15, 1.80, 75);

turmaEdFisica.adicionarAluno(aluno1);
turmaEdFisica.adicionarAluno(aluno2);
turmaEdFisica.adicionarAluno(aluno3);

turmaEdFisica.editarAluno(102, "Maria Souza Santos", 16, 1.70, 58);

turmaEdFisica.removerAluno(101);