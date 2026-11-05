<h1 align="center">Pensário</h1>

<p align="center">
  Uma biblioteca digital de filosofia com acesso autenticado, que reúne resumos, ideias e pensamentos dos filósofos mais relevantes da história.
</p>

# Descrição do Projeto

O **Pensário** é uma plataforma digital desenvolvida para facilitar o acesso ao conhecimento filosófico. Seu objetivo é reunir e organizar conteúdos sobre grandes filósofos e suas ideias, apresentando resumos introdutórios de forma clara, acessível e organizada.

A plataforma busca tornar o estudo da filosofia mais simples e interessante, permitindo que os usuários explorem diferentes pensadores, conheçam suas principais contribuições e aprofundem seus conhecimentos.

O projeto é uma aplicação full-stack que integra um frontend desenvolvido com React e TypeScript a um backend desenvolvido com Node.js e Express, utilizando autenticação JWT e banco de dados PostgreSQL.

**Status:** Em desenvolvimento.

# Funcionalidades do Projeto

- **Cadastro de usuários:** Criação de conta com nome, e-mail e senha, seguida de ativação por e-mail.
- **Autenticação de usuários:** Login e logout com validação das credenciais e proteção das páginas privadas.
- **Renovação de sessão:** Renovação automática da sessão utilizando tokens JWT e cookies HTTP-only.
- **Recuperação de senha:** Envio de instruções por e-mail para redefinição de senha por meio de um link exclusivo.
- **Biblioteca de filósofos:** Coleção inicial com Sócrates, Platão, Aristóteles e Friedrich Nietzsche.
- **Busca de filósofos e conceitos:** Pesquisa local para encontrar pensadores e suas principais ideias.
- **Páginas individuais dos filósofos:** Apresentação de informações biográficas, principais ideias e relevância de cada pensador.
- **Gerenciamento de perfil:** Visualização dos dados da conta, atualização do nome e alteração de senha.
- **Interface responsiva:** Adaptação das páginas para celulares, tablets, computadores e telas maiores.

O acesso à biblioteca, às páginas individuais dos filósofos e ao perfil é restrito a usuários autenticados.

# Links do Projeto

- [Acesse o repositório Pensário no GitHub](https://github.com/Samuel-fsb/pensario)
- **Demonstração:** Em desenvolvimento.
- **Vídeo de apresentação:** A definir.

# Como rodar localmente

Siga os passos abaixo para executar o projeto no seu computador.

### Pré-requisitos

- Node.js e npm instalados.
- PostgreSQL ou uma instância PostgreSQL hospedada no Neon.
- Git.

### 1. Clone este repositório

```bash
git clone https://github.com/Samuel-fsb/pensario.git
```

### 2. Entre na pasta do projeto

```bash
cd pensario
```

### 3. Configure e execute o backend

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do `.env.example` e configure as variáveis de ambiente necessárias:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=

FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

Configure a conexão com o PostgreSQL e inicialize o banco de dados utilizando o procedimento definido em `src/setup.js`.

Em seguida, inicie o servidor:

```bash
npm start
```

O backend ficará disponível em:

```text
http://localhost:3000
```

### 4. Configure e execute o frontend

Abra outro terminal e acesse a pasta do frontend:

```bash
cd src/frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir de `.env.example` e configure a URL da API:

```env
VITE_API_URL=http://localhost:3000
```

Inicie a aplicação:

```bash
npm run dev
```

O Vite disponibilizará o endereço local da aplicação no terminal, normalmente:

```text
http://localhost:5173
```

**Importante:** Nunca compartilhe ou versione arquivos `.env` contendo credenciais, senhas ou tokens.

# Técnicas e Tecnologias Utilizadas

### Linguagens e Ferramentas

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-hotpink.svg?style=for-the-badge&logo=Sass&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Conceitos e Técnicas

- **React e TypeScript:** Desenvolvimento de uma interface baseada em componentes reutilizáveis, com tipagem estática e organização do código.
- **Vite:** Ferramenta de desenvolvimento e build da aplicação frontend.
- **Sass Modules:** Organização e isolamento dos estilos de componentes e páginas.
- **React Router:** Gerenciamento da navegação entre as páginas públicas e protegidas.
- **Node.js e Express:** Desenvolvimento da API REST responsável pelos serviços de autenticação e gerenciamento de usuários.
- **JWT (JSON Web Token):** Autenticação com access tokens e refresh tokens para controle de sessões.
- **Cookies HTTP-only:** Armazenamento seguro do refresh token, impedindo seu acesso direto por JavaScript.
- **Sequelize:** ORM utilizado para mapeamento e comunicação entre a aplicação e o banco de dados.
- **PostgreSQL:** Banco de dados relacional utilizado para armazenar informações dos usuários e tokens.
- **Nodemailer:** Envio de e-mails para ativação de contas e recuperação de senhas.
- **Phosphor Icons:** Biblioteca de ícones utilizada na interface.
- **Responsividade e acessibilidade:** Adaptação dos componentes a diferentes tamanhos de tela e atenção à navegação por teclado.

### Hospedagem e Deploy

- **Neon:** Serviço de hospedagem do banco de dados PostgreSQL.
- **Vercel:** Hospedagem da aplicação frontend.
- **Hospedagem Node.js:** Execução independente do backend Express.

# Desenvolvedor

<a href="https://github.com/Samuel-fsb">
  <img width="120" alt="Foto do desenvolvedor" src="https://github.com/user-attachments/assets/6af9da35-0b7f-4034-89ad-e247e1140f8c" />
</a>

[Samuel Bezerra](https://github.com/Samuel-fsb)

# Licença

Este projeto está licenciado sob os termos descritos no arquivo [LICENSE](LICENSE).


