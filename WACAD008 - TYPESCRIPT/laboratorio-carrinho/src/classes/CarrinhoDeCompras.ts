// src/classes/CarrinhoDeCompras.ts
import { Produto } from "../interfaces/Produto";

export class CarrinhoDeCompras<T extends Produto> {
    private itens: T[] = [];

    adicionarProduto(produto: T) {
        this.itens.push(produto);
        console.log(`\n✅ "${produto.modelo}" adicionado ao carrinho.`);
        this.displayCarrinho();
    }

    removerProduto(id: number) {
        const index = this.itens.findIndex(item => item.id === id);
        if (index === -1) {
            console.log(`\n❌ Erro: Produto com ID ${id} não encontrado no carrinho.`);
            return;
        }
        const itemRemovido = this.itens.splice(index, 1);
        console.log(`\n🗑️ "${itemRemovido[0].modelo}" removido do carrinho.`);
        this.displayCarrinho();
    }

    getNumeroDeItens(): number {
        return this.itens.length;
    }

    calcularTotal(): number {
        return this.itens.reduce((total, item) => total + item.valor, 0);
    }

    displayCarrinho() {
        console.log("\n--- 🛒 Conteúdo do Carrinho ---");
        if (this.itens.length === 0) {
            console.log("O carrinho está vazio.");
        } else {
            this.itens.forEach(item => item.display());
        }
        console.log("---------------------------------");
        console.log(`Total de Itens: ${this.getNumeroDeItens()}`);
        console.log(`Valor Total: R$ ${this.calcularTotal().toFixed(2)}`);
        console.log("---------------------------------");
    }
}