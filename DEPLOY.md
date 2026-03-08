# Deploy - Hostinger VPS

## Deploy inicial ou correção

```bash
cd ~/cardapio_lanchonete
pm2 delete cardapio-lanchonete 2>/dev/null
rm -rf node_modules
git pull origin main
pm2 start ecosystem.config.js
pm2 save
```

## Abrir porta 3004 no firewall (se necessário)

```bash
ufw allow 3004
ufw reload
```

## Testar localmente (antes do PM2)

```bash
node server.js
```

Acesse: http://SEU_IP:3004
