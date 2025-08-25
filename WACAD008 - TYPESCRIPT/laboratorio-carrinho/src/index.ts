// src/index.ts
import { CarrinhoDeCompras } from "./classes/CarrinhoDeCompras";
import { Bicicleta } from "./classes/produtos/Bicicleta";
import { Celular } from "./classes/produtos/Celular";
import { TV } from "./classes/produtos/TV";
import { Produto } from "./interfaces/Produto";

console.log("🚀 Iniciando a aplicação de Carrinho de Compras...");

const carrinho = new CarrinhoDeCompras<Produto>();

const tvLG = new TV(1, "OLED C3", "LG", 7500, "4K", 65);
const celularSamsung = new Celular(2, "Galaxy S25", "Samsung", 5500, 256);
const bikeCaloi = new Bicicleta(3, "Explorer", "Caloi", 1800, 29);

console.log("\n--- ADICIONANDO PRODUTOS ---");
carrinho.adicionarProduto(tvLG);
carrinho.adicionarProduto(celularSamsung);
carrinho.adicionarProduto(bikeCaloi);

console.log("\n--- REMOVENDO UM PRODUTO (Desafio Opcional) ---");
carrinho.removerProduto(2); // Removendo o celular