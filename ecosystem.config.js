/**
 * Configuração PM2 - Cardápio Lanchonete
 * Porta: 3004
 * Uso: pm2 start ecosystem.config.js
 */
const path = require('path');
module.exports = {
  apps: [{
    name: 'cardapio-lanchonete',
    script: path.join(__dirname, 'start.sh'),
    interpreter: 'bash',
    cwd: __dirname,
    watch: false,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
