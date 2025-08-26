const dotenv = require('dotenv');


const envFile = process.env.NODE_ENV === 'production' 
                ? '.env.production' 
                : '.env.development';


dotenv.config({ path: envFile });



const http = require('http');
const fs = require('fs');
const path = require('path');

const { createLink } = require('./linkUtils');



const port = process.env.PORT || 3000;

const directoryPath = process.argv[2];

if (!directoryPath) {
    console.log('Erro: Por favor, forneça o caminho de um diretório como argumento.');
    process.exit(1);
}


const server = http.createServer((req, res) => {
    const url = req.url;

    
    if (url === '/') {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Erro ao ler o diretório:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>Erro interno do servidor. Não foi possível ler o diretório.</h1>');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<!DOCTYPE html><html lang="pt-br"><head><title>Lista de Arquivos</title></head><body>');
            res.write(`<h1>Arquivos em: ${directoryPath}</h1>`);
            res.write('<ul>');
            
            
            files.forEach(file => {
                res.write(createLink(file));
            });

            res.write('</ul>');
            res.write('</body></html>');
            res.end();
        });
    } 

    else {
        const fileName = decodeURIComponent(url.substring(1));
        const filePath = path.join(directoryPath, fileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Arquivo Não Encontrado</h1><a href="/">Voltar</a>');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<a href="/"><h1>Voltar</h1></a><hr>');
            res.write(`<h2>Conteúdo de: ${fileName}</h2>`);
            res.write(`<pre>${data}</pre>`);
            res.end();
        });
    }
});


server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Acesse esta URL no seu navegador para ver o resultado.');
});