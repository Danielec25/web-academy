// src/index.ts
import { adicionarLembrete, listarLembretes, editarLembrete, apagarLembrete } from "./service";

console.log("🚀 Iniciando a aplicação de Lembretes...");

adicionarLembrete({ titulo: "Estudar TypeScript", descricao: "Focar em tipos, interfaces e tuplas." });
adicionarLembrete({ titulo: "Comprar café", descricao: "Café especial da região.", dataLimite: new Date("2025-09-30") });
adicionarLembrete({ titulo: "Ir à academia" });

listarLembretes();

editarLembrete(3, "Ir à academia de manhã", "Treino de pernas", new Date("2025-09-19"));

listarLembretes();

apagarLembrete(2);

listarLembretes();