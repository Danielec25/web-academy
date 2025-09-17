    module.exports = {
      // O "parser" ensina o ESLint a ler código TypeScript
      parser: '@typescript-eslint/parser',
      extends: [
        // Usa as regras recomendadas para TypeScript
        'plugin:@typescript-eslint/recommended',
        // Ativa a integração com o Prettier
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaVersion: 'latest', // Permite usar as funcionalidades mais recentes do JavaScript
        sourceType: 'module', // Permite o uso de "imports"
      },
      rules: {
        // Aqui você pode adicionar ou modificar regras específicas.
        // Por enquanto, vamos deixar em branco.
      },
    };
    
