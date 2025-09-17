    const express = require('express');
    
    const app = express();
    
    const PORT = 3333;
    
    app.get('/', (request, response) => {
        response.send('Hello World!');
    });
    
    app.listen(PORT, () => {
        console.log(`Express app iniciada na porta ${PORT}`);
    });