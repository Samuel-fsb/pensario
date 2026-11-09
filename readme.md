<h1 align="center">Pensário</h1>

<p align="center">
  Biblioteca digital de filosofia para explorar ideias, conceitos e grandes pensadores.
</p>

# Descrição do Projeto

O Pensário é uma biblioteca digital de filosofia desenvolvida para reunir conteúdos sobre pensadores clássicos e modernos em uma experiência visual acolhedora e intuitiva. A plataforma permite explorar resumos, biografias e principais ideias filosóficas, com acesso às áreas de conteúdo protegido por autenticação.

<img width="1897" height="1078" alt="projeto-pensario" src="https://github.com/user-attachments/assets/d9862964-42f1-4a19-afa0-d15ebbea8203" />

# Funcionalidades do Projeto

- **Cadastro de usuários:** Criação de conta com nome, e-mail e senha, seguida de confirmação por e-mail.
- **Ativação de conta:** Envio de link de ativação para confirmar o endereço de e-mail antes do primeiro acesso.
- **Autenticação e sessão:** Login e logout com JWT, token de acesso e renovação automática da sessão.
- **Recuperação de senha:** Solicitação de redefinição por e-mail e criação de uma nova senha por meio de um link seguro.
- **Rotas protegidas:** A biblioteca, as páginas dos filósofos e o perfil ficam disponíveis apenas para usuários autenticados.
- **Biblioteca de filósofos:** Exibição de conteúdos sobre Sócrates, Platão, Aristóteles e Nietzsche.
- **Busca por conteúdo:** Pesquisa de filósofos e conceitos presentes nos textos da biblioteca.
- **Páginas de conteúdo:** Apresentação de biografia, principais ideias e relevância do pensamento de cada filósofo.
- **Gerenciamento de perfil:** Edição do nome, alteração de senha e encerramento da sessão.
- **Interface responsiva:** Layout adaptável a diferentes tamanhos de tela, com identidade visual inspirada em paisagens naturais.

# Rotas da Aplicação

| Rota | Tela | Acesso | Descrição |
|---|---|---|---|
| `/` | Início | Público | Apresentação do Pensário e acesso à biblioteca. |
| `/login` | Entrar | Público | Autenticação com e-mail e senha. |
| `/register` | Cadastro | Público | Criação de uma nova conta. |
| `/verify-email` | Verificação de e-mail | Público | Orientações após solicitar a ativação da conta. |
| `/activate/:token` | Ativação | Público | Confirma o endereço de e-mail e ativa a conta. |
| `/password-reset` | Recuperar senha | Público | Solicita o envio do link de redefinição. |
| `/password-reset/:token` | Nova senha | Público | Permite cadastrar uma nova senha usando o token recebido. |
| `/biblioteca` | Biblioteca | Protegido | Exibe e permite pesquisar os filósofos disponíveis. |
| `/filosofos/:slug` | Detalhe do filósofo | Protegido | Apresenta biografia, ideias e relevância do pensador. |
| `/perfil` | Perfil | Protegido | Permite atualizar nome, senha e encerrar a sessão. |

# Links do Projeto

- [Acesse o Pensário](https://pensario-alpha.vercel.app/)
- [Repositório no GitHub](https://github.com/Samuel-fsb/pensario)

# Como Rodar Localmente

Siga os passos abaixo para executar o projeto no seu computador.

### 1. Pré-requisitos

- Node.js instalado.
- PostgreSQL local ou uma instância de banco de dados no [Neon](https://neon.tech).
- Conta de e-mail com credenciais SMTP para testar o envio de mensagens de ativação e recuperação de senha.

### 2. Clone o repositório

```bash
git clone https://github.com/Samuel-fsb/pensario.git
```

Acesse a pasta do projeto:

```bash
cd pensario
```

### 3. Configure o Backend

Instale as dependências na raiz do projeto:

```bash
npm install
```

Crie o arquivo `.env` com base no modelo disponível:

```bash
cp .env.example .env
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_local
DB_DATABASE=pensario

JWT_ACCESS_SECRET=sua_chave_secreta_de_acesso
JWT_REFRESH_SECRET=sua_chave_secreta_de_renovacao

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_aplicativo
EMAIL_FROM="Pensário" <seu_email@gmail.com>

FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
COOKIE_SAME_SITE=strict
```

Sincronize as tabelas do banco de dados:

```bash
node src/setup.js
```

Inicie o servidor:

```bash
npm start
```

O backend ficará disponível em `http://localhost:3000`.

### 4. Configure e Execute o Frontend

Abra outro terminal e acesse a pasta do frontend:

```bash
cd src/frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

A variável `VITE_API_URL` deve apontar para o backend local:

```env
VITE_API_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

Para gerar o build de produção do frontend:

```bash
npm run build
```

# Deploy

O projeto utiliza dois projetos independentes na **Vercel**, conectados ao mesmo repositório GitHub.

### Frontend

- Root Directory: `src/frontend`.
- Framework Preset: `Vite`.
- Variável de ambiente: `VITE_API_URL`, apontando para a URL pública do backend.
- O arquivo `src/frontend/vercel.json` configura o redirecionamento das rotas da aplicação para `index.html`, permitindo o funcionamento do React Router.

### Backend

- Root Directory: raiz do repositório (`./`).
- Framework: `Express`.
- Configure as variáveis de ambiente do backend na Vercel, incluindo `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `FRONTEND_URL`, `CORS_ORIGIN` e `NODE_ENV`.
- O banco de dados de produção utiliza PostgreSQL hospedado no [Neon](https://neon.tech).

# Técnicas e Tecnologias Utilizadas

### Linguagens e Ferramentas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/sass-%23CC6699.svg?style=for-the-badge&logo=sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%234169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-%2352B0E7.svg?style=for-the-badge&logo=sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Conceitos e Técnicas

- **React e TypeScript:** Construção de uma interface componentizada, com tipagem estática e organização por páginas, componentes e serviços.
- **React Router:** Navegação entre páginas públicas e privadas, com controle de acesso por rotas protegidas.
- **Sass Modules:** Estilização modular, reutilização de variáveis e isolamento dos estilos dos componentes.
- **API REST:** Organização do backend em rotas, controllers, services e models.
- **Sequelize ORM:** Mapeamento dos modelos de usuários e tokens e integração com o PostgreSQL.
- **Autenticação JWT:** Uso de access token com duração de 15 minutos e refresh token com duração de 7 dias, armazenado em cookie `httpOnly`.
- **Renovação de sessão:** Cliente HTTP centralizado com renovação automática do access token quando necessário.
- **Nodemailer:** Envio de mensagens de ativação de conta e redefinição de senha.
- **CORS e cookies:** Configuração de comunicação entre frontend e backend com envio de credenciais.
- **Deploy:** Publicação separada do frontend e da API na Vercel, com banco de dados PostgreSQL no Neon.

# Desenvolvedor

<img width="120" alt="Foto de Samuel Bezerra" src="https://github.com/user-attachments/assets/6af9da35-0b7f-4034-89ad-e247e1140f8c" />

[Samuel Bezerra](https://github.com/Samuel-fsb)

# Licença

Este projeto é licenciado por [GNU GENERAL PUBLIC LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html)
