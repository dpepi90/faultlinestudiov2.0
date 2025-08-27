# Faultline Studio — Onda 3

## Novidades
- Layout premium (cards arredondados, header com avatar e Logout)
- Ideas Hub → Titles Lab (Promote to Titles)
- Titles Lab CRUD real (approve)
- Thumbnail Lab inicial (conceito + prompt mock)
- Seed atualizado (3 ideias + 2 titles)
- Script `npm run clean` para limpar cache

## Como rodar
```
cd apps/web
npm install
npx prisma migrate dev --name onda3
node prisma/seed.cjs
npm run dev
```
Login: user `diego`, pass `senha123` (ou defina no `.env.local`)
