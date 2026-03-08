/**
 * Servidor estático - Cardápio Lanchonete
 * Porta: variável PORT (padrão 3004)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3004;
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  file = path.join(__dirname, path.normalize(file));
  if (!file.startsWith(__dirname)) return res.writeHead(403).end();
  const ext = path.extname(file);
  const type = MIME[ext] || 'application/octet-stream';
  fs.readFile(file, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') return res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end('<h1>404</h1>');
      return res.writeHead(500).end();
    }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log('Cardápio rodando em http://0.0.0.0:' + PORT));
