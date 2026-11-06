# Pensário — Biblioteca Digital de Filosofia

O **Pensário** é uma biblioteca digital contemplativa e editorial para explorar ideias, conceitos e resumos de filósofos clássicos e modernos, com acesso protegido por autenticação e identidade visual inspirada em paisagens naturais ao pôr do sol.

---

## 🏛️ Tecnologias Utilizadas

### Frontend (`src/frontend`)
- **React 18** com **TypeScript** em modo estrito (`strict: true`)
- **Vite** para build e desenvolvimento rápido
- **React Router DOM 6** para roteamento de SPA com proteção de rotas públicas e privadas
- **Sass Modules (`*.module.scss`)** para estilização modular e isolamento de estilos
- **@phosphor-icons/react** para iconografia elegante
- **Lora** (serif) & **DM Sans** (sans-serif) para tipografia editorial

### Backend (`src/backend`)
- **Node.js** com **Express**
- **Sequelize ORM** com **PostgreSQL** (compatível com **Neon**)
- Autenticação com **JWT** (access token de 15 min em memória) e **Refresh Token** (7 dias em cookie HTTP-only)
- **Nodemailer** para envio de e-mails de ativação e recuperação de senha
- **CORS** com suporte a credenciais e múltiplas origens configuráveis

---

## 📁 Estrutura do Projeto

```text
pensario/
├── src/
│   ├── backend/                # Lógica e regras do backend existente
│   │   ├── controller/         # Controllers de autenticação e perfil
│   │   ├── models/             # Modelos Sequelize (User e Token)
│   │   ├── routes/             # Rotas da API REST
│   │   ├── services/           # Serviços de token, JWT, e-mail e regras de negócio
│   │   └── utils/              # Conexão Sequelize (db.js) com suporte a Neon SSL
│   ├── frontend/               # Aplicação React independente
│   │   ├── public/             # Assets públicos (imagens dos filósofos, hero, ícones)
│   │   ├── src/
│   │   │   ├── components/     # Componentes comuns e de layout (Navbar, AuthLayout, etc.)
│   │   │   ├── context/        # AuthContext (sessão, tokens em memória)
│   │   │   ├── data/           # Conteúdo estático dos filósofos
│   │   │   ├── pages/          # As 9 páginas da especificação
│   │   │   ├── routes/         # ProtectedRoute e PublicOnlyRoute
│   │   │   ├── services/       # Cliente HTTP centralizado com interceptor de refresh
│   │   │   ├── styles/         # Variáveis SCSS, tokens e estilos globais
│   │   │   └── types/          # Tipagens TypeScript
│   │   ├── vercel.json         # Configuração de SPA rewrites para deploy na Vercel
│   │   └── vite.config.ts
│   ├── index.js                # Ponto de entrada do backend
│   └── setup.js                # Inicialização e sincronização do banco de dados
├── docs/
│   └── design/                 # Imagens de referência das 9 telas do layout
├── .env.example                # Exemplo de variáveis de ambiente do backend
└── package.json                # Gerenciador do backend
```

---

## 🗺️ Rotas da Aplicação

| Rota | Tela | Acesso | Descrição |
|---|---|---|---|
| `/` | 01 — Início | Público | Hero contemplativo, proposta e botões de chamada |
| `/login` | 02 — Entrar | Público | Login com e-mail e senha, link de recuperação |
| `/register` | 03 — Cadastro | Público | Criação de conta com validações |
| `/verify-email` | 04 — Confirme seu e-mail | Público | Orientação para conferir e-mail de ativação |
| `/activate/:token` | 04 — Ativação | Público | Ativa a conta com o token enviado por e-mail |
| `/password-reset` | 05 — Recuperar senha | Público | Solicitação de e-mail de redefinição |
| `/password-reset/:token` | 06 — Nova senha | Público | Formulário para definir nova senha |
| `/biblioteca` | 07 — Biblioteca | Protegido | Lista e busca dinâmica de filósofos |
| `/filosofos/:slug` | 08 — Detalhe do filósofo | Protegido | Visão aprofundada com biografia e ideias |
| `/perfil` | 09 — Perfil | Protegido | Edição do nome e alteração de senha |

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Node.js 18+ instalado
- Instância PostgreSQL local ou conta gratuita no [Neon](https://neon.tech)

### 2. Configurar o Backend

Crie o arquivo `.env` na raiz do projeto a partir do `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis necessárias no `.env`:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://usuario:senha@ep-exemplo.us-east-2.aws.neon.tech/pensario?sslmode=require
JWT_ACCESS_SECRET=sua_chave_secreta_jwt_access
JWT_REFRESH_SECRET=sua_chave_secreta_jwt_refresh
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_do_gmail
EMAIL_FROM="Pensário" <contato@pensario.com>
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

Sincronize as tabelas no banco de dados:
```bash
node src/setup.js
```

Inicie o servidor backend:
```bash
npm start
```
O servidor estará rodando em `http://localhost:3000`.

---

### 3. Configurar e Executar o Frontend

Acesse a pasta do frontend e configure o `.env`:
```bash
cd src/frontend
cp .env.example .env
```

Instale as dependências e inicie o servidor de desenvolvimento:
```bash
npm install
npm run dev
```

Acesse a aplicação no navegador em `http://localhost:5173`.

Para gerar o build de produção do frontend:
```bash
npm run build
```

---

## ☁️ Deploy

### Frontend (Vercel)
1. Conecte o repositório na **Vercel**.
2. Configure o **Root Directory** como `src/frontend`.
3. Framework Preset: **Vite**.
4. Configure a variável de ambiente:
   - `VITE_API_URL`: URL pública do seu backend (ex: `https://pensario-api.seu-dominio.com`).
5. O arquivo `vercel.json` já inclui as regras de fallback para rotas SPA.

### Backend (Render, Railway, Fly.io ou similar)
1. Configure o deploy com Root Directory na raiz do projeto.
2. Build command: `npm install`.
3. Start command: `node src/index.js` (ou `npm start`).
4. Configure as variáveis de ambiente (`DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `FRONTEND_URL`, `CORS_ORIGIN`, `NODE_ENV=production`).

---

## 🔒 Segurança e Sessão
- **Tokens**: O Access Token fica estritamente na memória da aplicação e expira em 15 minutos.
- **Refresh Token**: Armazenado em cookie `httpOnly`, transmitido com segurança e renovado transparentemente pelo cliente HTTP quando necessário.
- **Proteção Cross-Site**: `credentials: 'include'` em todas as requisições autenticadas e CORS configurado estritamente para as origens permitidas.
