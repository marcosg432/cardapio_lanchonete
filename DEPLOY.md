# Deploy - Hostinger VPS

## IMPORTANTE: use `rm -rf` (com a letra F), não `rm -rt`

## Correção do ERR_REQUIRE_ESM

```bash
cd ~/cardapio_lanchonete
pm2 delete cardapio-lanchonete 2>/dev/null
git fetch origin
git reset --hard origin/main
rm -rf node_modules
pm2 start server.js --name cardapio-lanchonete
pm2 save
pm2 logs cardapio-lanchonete
```

## Abrir porta 3004 (se necessário)

```bash
ufw allow 3004
ufw reload
```

Acesse: http://SEU_IP:3004
