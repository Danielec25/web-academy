// src/service.ts
import { Lembrete } from "./types";

let lembretes: Lembrete[] = [];
let proximoId = 1;

export function adicionarLembrete({ titulo, descricao, dataLimite }: { titulo: string; descricao?: string; dataLimite?: Date; }): Lembrete {
    const novoLembrete: Lembrete = [
        proximoId,
        titulo,
        new Date(),
        dataLimite,
        descricao
    ];
    lembretes.push(novoLembrete);
    proximoId++;
    console.log(`\n✅ Lembrete "${titulo}" adicionado com sucesso!`);
    return novoLembrete;
}

export function listarLembretes() {
    console.log("\n--- 📝 Lista de Lembretes ---");
    if (lembretes.length === 0) {
        console.log("Nenhum lembrete encontrado.");
    } else {
        lembretes.forEach(lembrete => {
            const [id, titulo, dataCriacao, dataLimite, descricao] = lembrete;
            console.log(`
            ID: ${id}
            Título: ${titulo}
            Criado em: ${dataCriacao.toLocaleDateString()}
            ${dataLimite ? `Data Limite: ${dataLimite.toLocaleDateString()}` : ''}
            ${descricao ? `Descrição: ${descricao}` : ''}
            --------------------------------`);
        });
    }
}

export function editarLembrete(id: number, novoTitulo: string, novaDescricao?: string, novaDataLimite?: Date) {
    const index = lembretes.findIndex(lembrete => lembrete[0] === id);
    if (index === -1) {
        console.log(`\n❌ Erro: Lembrete com ID ${id} não encontrado.`);
        return;
    }
    lembretes[index][1] = novoTitulo;
    lembretes[index][3] = novaDataLimite;
    lembretes[index][4] = novaDescricao;
    console.log(`\n🔄 Lembrete ID ${id} atualizado para "${novoTitulo}".`);
}

export function apagarLembrete(id: number) {
    const index = lembretes.findIndex(lembrete => lembrete[0] === id);
    if (index === -1) {
        console.log(`\n❌ Erro: Lembrete com ID ${id} não encontrado.`);
        return;
    }
    const lembreteRemovido = lembretes.splice(index, 1);
    console.log(`\n🗑️ Lembrete "${lembreteRemovido[0][1]}" (ID: ${id}) foi removido.`);
}