// src/classes/produtos/Celular.ts
import { Produto } from "../../interfaces/Produto";

export class Celular implements Produto {
    constructor(
        public id: number,
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public memoria: number // em GB
    ) {}

    display(): void {
        console.log(`  - Celular: ${this.fabricante} ${this.modelo} (${this.memoria}GB) - R$ ${this.valor.toFixed(2)}`);
    }
}