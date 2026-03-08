/**
 * Servidor estático para Cardápio Lanchonete - Porta 3004
 * Compatível com PM2 - não usa dependências externas
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Remove node_modules que causa ERR_REQUIRE_ESM (projeto não tem dependências)
try {
  const nm = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nm)) {
    fs.rmSync(nm, { recursive: true });
  }
} catch (_) {}

const PORT = 3004;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, path.normalize(filePath.split('?')[0]));
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Página não encontrada</h1>');
      } else {
        res.writeHead(500);
        res.end('Erro interno do servidor');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Cardápio rodando em http://0.0.0.0:${PORT}`);
});
