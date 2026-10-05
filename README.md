# Catalogo de vendas

API RESTful para um sistema de catalogo de vendas. A aplicação segue a arquitetura MVC, com autenticação por credenciais, hash de senha com salt dinâmico e controle de acesso baseado em perfis (RBAC).

## Tecnologias Utilizadas

- **Frontend:** React, Vite
- **Backend:** Node.js, Express, Crypto
- **Banco de Dados:** PostgreSQL, Prisma ORM

##Pré-requisitos
Antes de iniciar o projeto, verificar se a máquina local possui os seguintes requisitos:
-**Node.js** (versao 18 pra cima)
-**npm** (gerenciador de pacotes)
-Instancia do PostgreSQL em execução

## Como Rodar o Projeto

### Backend
1. Clonar o repositorio
2. Entre na pasta `backend`: `cd backend`
3. Instale as dependências: `npm install`
4. Configure as variáveis no arquivo `.env.example` (DATABASE_URL, ORIGEM_DO_FRONTEND)
5. Executar as Migrations `npx prisma migrate dev`
6. Executar o seed inicial `npx prisma db seed`
7. Inicie a API: `npm run dev`

### Frontend
1. Entre na pasta `frontend`: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie a aplicação: `npm run dev`
