/**
 * Configuração PM2 - Cardápio Lanchonete
 * Porta: 3004
 * 
 * Uso: pm2 start ecosystem.config.js
 */
module.exports = {
  apps: [{
    name: 'cardapio-lanchonete',
    script: 'node_modules/.bin/serve',
    args: '-l 3004',
    cwd: __dirname,
    watch: false,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
