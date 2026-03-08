#!/bin/bash
# Inicia o cardápio - garante ambiente limpo (sem node_modules antigo)
cd "$(dirname "$0")"
rm -rf node_modules
exec node server.js
