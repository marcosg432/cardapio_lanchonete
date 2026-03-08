# Deploy - Hostinger VPS

## Correção do erro ERR_REQUIRE_ESM

Se o app falhar com esse erro, siga estes passos:

```bash
# 1. Entre na pasta do projeto
cd ~/cardapio_lanchonete

# 2. Pare e remova o processo antigo (qualquer variação do nome)
pm2 delete cardapio-lanchonete 2>/dev/null
pm2 delete cardapio-lanhonete 2>/dev/null

# 3. Atualize o código
git pull origin main

# 4. Remova node_modules antigo (contém serve que causa o erro)
rm -rf node_modules

# 5. Inicie com o servidor Node nativo (sem dependências)
pm2 start ecosystem.config.js

# 6. Salve
pm2 save

# 7. Verifique os logs
pm2 logs cardapio-lanchonete
```

Deve aparecer: `Cardápio rodando em http://0.0.0.0:3004`

Acesse: http://SEU_IP:3004
