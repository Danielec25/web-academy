// src/interfaces/Produto.ts
export interface Produto {
    id: number; 
    modelo: string;
    fabricante: string;
    valor: number;
    
    display(): void;
}