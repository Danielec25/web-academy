require('dotenv').config();
const http = require('http');
const fs = require('fs/promises'); // Usando a versão de Promises do 'fs'
const path = require('path');
const url = require('url');

const port = process.env.PORT || 3000;

// Função para gerar o texto personalizado com lendas amazônicas
function gerarLoremIpsum(paragrafos) {
    const lendas = [
        'Nas profundezas dos rios, dizem que o Boto se transforma em um belo rapaz para encantar as moças nas festas. Ele veste branco, usa um chapéu para esconder o buraco em sua cabeça e, antes do amanhecer, retorna às águas para se tornar boto novamente.',
        'A Iara, mãe das águas, com seu canto hipnótico, atrai os homens para o fundo do rio, de onde nunca mais retornam. Seus cabelos longos enfeitam as pedras e sua beleza é tão perigosa quanto a correnteza.',
        'O Curupira, protetor da fauna e da flora, tem cabelos de fogo e seus pés virados para trás, feitos para confundir os caçadores e lenhadores mal-intencionados que ousam destruir a mata. Seus assovios ecoam pela floresta, enganando quem não a respeita.',
        'Mandioca, uma indiazinha de pele branca, nasceu para alimentar seu povo. Após sua morte misteriosa, foi enterrada em sua oca e de sua cova brotou uma planta com uma raiz saborosa, que foi batizada em sua homenagem: a mandioca, o pão da Amazônia.'
    ];

    let resultado = '';
    for (let i = 0; i < paragrafos; i++) {
        const paragrafoAleatorio = lendas[Math.floor(Math.random() * lendas.length)];
        resultado += `<p>${paragrafoAleatorio}</p>`;
    }
    return resultado;
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    try {
        // Rota para servir o arquivo CSS. Corrigido para "estilo.css"
        if (pathname === '/estilo.css') {
            const cssPath = path.join(__dirname, 'public', 'estilo.css');
            const cssContent = await fs.readFile(cssPath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
            return;
        }

        // Rota principal "/"
        if (pathname === '/') {
            const indexPath = path.join(__dirname, 'public', 'index.html');
            let htmlContent = await fs.readFile(indexPath, 'utf-8');

            let conteudoGerado = '';
            
            // Verifica se um título foi enviado
            if (query.titulo) {
                conteudoGerado += `<h2>${query.titulo}</h2>`;
            }

            // Verifica se o parâmetro 'paragrafos' foi enviado
            if (query.paragrafos && query.paragrafos > 0) {
                // CORRIGIDO AQUI: A chamada da função estava errada
                conteudoGerado += gerarLoremIpsum(parseInt(query.paragrafos));
            }

            // CORRIGIDO AQUI: Havia um bloco duplicado, agora só há um
            htmlContent = htmlContent.replace(
                '',
                conteudoGerado
            );

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(htmlContent);
            return;
        }

        // Se nenhuma rota corresponder, retorna erro 404
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Página Não Encontrada</h1>');

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>500 - Erro Interno do Servidor</h1>');
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});