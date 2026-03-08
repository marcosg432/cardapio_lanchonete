/**
 * Configuração PM2 - Cardápio Lanchonete
 * Porta: 3004
 */
const path = require('path');
module.exports = {
  apps: [{
    name: 'cardapio-lanchonete',
    script: path.join(__dirname, 'server.js'),
    cwd: __dirname,
    watch: false,
    interpreter: 'node',
    env: { NODE_ENV: 'production' }
  }]
};
