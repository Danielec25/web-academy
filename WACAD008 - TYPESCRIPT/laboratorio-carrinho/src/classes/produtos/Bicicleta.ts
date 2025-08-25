// src/classes/produtos/Bicicleta.ts
import { Produto } from "../../interfaces/Produto";

export class Bicicleta implements Produto {
    constructor(
        public id: number,
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public tamanhoAro: number
    ) {}

    display(): void {
        console.log(`  - Bicicleta: ${this.fabricante} ${this.modelo} (Aro ${this.tamanhoAro}) - R$ ${this.valor.toFixed(2)}`);
    }
}