// src/classes/produtos/TV.ts
import { Produto } from "../../interfaces/Produto";

export class TV implements Produto {
    constructor(
        public id: number,
        public modelo: string,
        public fabricante: string,
        public valor: number,
        public resolucao: string,
        public polegadas: number
    ) {}

    display(): void {
        console.log(`  - TV: ${this.fabricante} ${this.modelo} (${this.polegadas}", ${this.resolucao}) - R$ ${this.valor.toFixed(2)}`);
    }
}