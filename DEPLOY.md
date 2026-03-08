# Deploy - Hostinger VPS

## Correção do erro ERR_REQUIRE_ESM

O erro acontece porque a pasta `node_modules` antiga (com o pacote `serve`) ainda existe.  
O projeto usa apenas Node.js nativo e **não precisa de npm install**.

### Comandos (copie e cole tudo de uma vez):

```bash
cd ~/cardapio_lanchonete && \
pm2 delete cardapio-lanchonete 2>/dev/null; \
pm2 delete cardapio-lanhonete 2>/dev/null; \
rm -rf node_modules && \
git pull origin main && \
pm2 start ecosystem.config.js && \
pm2 save && \
echo "--- LOGS ---" && \
pm2 logs cardapio-lanchonete --lines 5
```

### Ou execute um por um:

```bash
cd ~/cardapio_lanchonete
pm2 delete cardapio-lanchonete
rm -rf node_modules
git pull origin main
pm2 start ecosystem.config.js
pm2 save
pm2 logs cardapio-lanchonete
```

### Testar antes do PM2 (opcional):

```bash
cd ~/cardapio_lanchonete
node server.js
```

Se aparecer "Cardápio rodando em http://0.0.0.0:3004", está correto. Pressione Ctrl+C e use o PM2.

---

Acesse: http://SEU_IP:3004
