# Webstore Food Studio AI — DEMO

Versão para testar a qualidade das fotos antes de ativar cadastro, créditos e Mercado Pago.

## O que funciona
- Upload de foto
- Preservar prato
- Melhorar foto
- Foto Delivery
- Abrir o apetite
- Trocar cenário
- Criar variação
- Geração real via API de imagens

## O que foi removido desta DEMO
- Cadastro/login
- Mercado Pago
- Créditos
- Banco de dados

## Para a geração funcionar
É necessário rodar o backend Node.js com uma chave de API da OpenAI configurada somente no servidor.

1. Instale Node.js 20+
2. Rode `npm install`
3. Copie `.env.example` para `.env`
4. Preencha `OPENAI_API_KEY` no `.env`
5. Rode `node --env-file=.env server.js`
6. Abra http://localhost:3000

IMPORTANTE: abrir apenas `public/index.html` não gera imagens. O servidor precisa estar rodando.
Não coloque a API key no HTML.
