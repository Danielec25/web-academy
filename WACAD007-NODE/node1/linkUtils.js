// linkUtils.js

/**
 * Cria uma string HTML para um link de um item da lista.
 * @param {string} filename - O nome do arquivo para o qual o link será criado.
 * @returns {string} A string HTML <li><a href="...">...</a></li>
 */
function createLink(filename) {
  // O link aponta para o próprio nome do arquivo.
  // ex: <a href="/commonJs.txt">commonJs.txt</a>
  return `<li><a href="/${filename}">${filename}</a></li>`;
}

// Exporta a função para que ela possa ser usada em outros arquivos (como o index.js)
module.exports = { createLink };