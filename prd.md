# PRD — Pensário

> **Produto:** Pensário
>
> **Tipo:** biblioteca digital de filosofia, com acesso autenticado
>
> **Objetivo deste documento:** orientar o Google Antigravity na construção do novo frontend e na integração com o backend de autenticação já existente.
> **Status:** especificação de design e implementação. Não há código novo definido neste documento.

---

## 1. Visão do produto

O **Pensário** é uma biblioteca digital simples para explorar ideias, conceitos e resumos de filósofos. A experiência deve ser acolhedora, contemplativa e editorial, com uma identidade visual inspirada em paisagens naturais ao pôr do sol.

O projeto será um produto full-stack para portfólio. Seu principal objetivo técnico é reaproveitar o backend de autenticação já concluído e conectá-lo a um frontend novo, bem acabado, responsivo e publicado na Vercel.

### 1.1 Objetivos

- Apresentar a proposta do Pensário em uma página inicial visualmente marcante.
- Permitir criar uma conta, ativá-la por e-mail, entrar, sair e recuperar a senha.
- Restringir a biblioteca, as páginas dos filósofos e o perfil a usuários autenticados.
- Exibir uma coleção pequena de filósofos e resumos introdutórios.
- Permitir que o usuário visualize e atualize o próprio nome e altere a senha.
- Demonstrar integração real entre React, TypeScript, API REST, JWT, cookies HTTP-only, Node.js, PostgreSQL e deploy.

### 1.2 Fora do escopo

Não adicionar funcionalidades que não foram solicitadas. A primeira versão **não terá**:

- Favoritos ou listas salvas.
- Anotações pessoais.
- Histórico ou acompanhamento de progresso de leitura.
- Comentários, avaliações ou comunidade.
- Recomendações personalizadas.
- Painel administrativo ou CMS.
- Cadastro/edição de filósofos pelo usuário.
- Integração com IA ou chat.
- Login social (Google, Facebook, GitHub).
- Alteração de e-mail no perfil. O professor confirmou que essa funcionalidade não precisa ser implementada.

Os dados dos filósofos serão estáticos e mantidos no frontend, em arquivos TypeScript. **Não criar tabelas nem endpoints de conteúdo nesta versão.**

---

## 2. Fontes de verdade e materiais de referência

O agente deve analisar e utilizar os materiais fornecidos junto deste PRD:

1. **Painel geral das nove telas:** `Painel Ideário_ Jornada Filosófica(2).png`.
2. **Referências individuais:** arquivos `01-inicio.png` até `09-perfil.png`, enviados em `telas_pensario.zip`.
3. **Backend existente:** projeto enviado em `node-auth-app.zip`.

### Regra de fidelidade visual

As nove imagens individuais são a **referência visual principal**. Reproduzir suas proporções, composição, hierarquia, espaçamentos, cores, posição dos elementos, navegação, formulários, cartões e tratamento das imagens. Não reinterpretar o projeto com outro estilo e não substituir a direção visual por um template genérico.

Os arquivos PNG são referências visuais rasterizadas, não arquivos de design editáveis. Não há metadados de fonte ou tokens de design embutidos neles. Portanto:

- Manter o desenho tipográfico o mais próximo possível da referência.
- Usar a combinação sugerida neste PRD como ponto de partida e ajustar visualmente comparando com os PNGs.
- Não usar os próprios screenshots completos como imagens de fundo, pois eles já contêm textos, botões e navegação. Extrair/preparar imagens limpas para os fundos, mantendo a mesma cena e composição visual.
- Não usar imagens aleatórias de bancos de imagens que mudem a paisagem ou a atmosfera da referência.
- Não utilizar a segunda proposta escura/cósmica enviada anteriormente. Ela foi descartada.

### Nome e marca

O nome definitivo é **Pensário**. Substituir todas as ocorrências de “Ideário” nos mockups pela marca “Pensário”. Preservar a ideia do símbolo de livro aberto com sol nascente; criar uma versão vetorial simples e consistente para a marca, sem usar um ícone genérico como logotipo.

---

## 3. Identidade visual obrigatória

### 3.1 Direção de arte

- Acolhedora, natural, contemplativa, elegante e editorial.
- Paisagem ilustrada com pôr do sol, montanhas, floresta, lago e reflexos na água.
- Verde escuro na navegação e em áreas de contraste.
- Superfícies creme e bege claro nas páginas e painéis.
- Dourado/amarelo quente para botões e destaques.
- Laranja terroso como cor complementar presente na paisagem.
- Ilustrações clássicas de bustos/estátuas para os filósofos.
- Bordas suaves, discretas e quentes; cantos levemente arredondados.

### 3.2 Paleta inicial

Os valores abaixo são aproximações coerentes com os pixels das referências. O agente pode fazer pequenos ajustes para obter maior fidelidade visual, mas não deve mudar a família de cores.

| Token | Cor sugerida | Uso |
|---|---|---|
| `forest-900` | `#1D3B30` | Navbar, cabeçalhos e áreas verdes profundas |
| `forest-800` | `#254A3B` | Estados alternativos, fundos e detalhes |
| `cream-50` | `#FFF8EA` | Fundo principal e painéis de formulários |
| `cream-100` | `#F8EEDB` | Superfícies secundárias |
| `sand-300` | `#DCCBAA` | Bordas e separadores |
| `gold-500` | `#E7AA32` | Botões primários, destaques e ícones de ação |
| `gold-600` | `#D99322` | Hover/active dos botões |
| `orange-500` | `#D9782B` | Pequenos detalhes e acentos da paisagem |
| `text-900` | `#20372C` | Texto principal em superfícies claras |
| `text-700` | `#5B5142` | Texto secundário |

Definir esses tokens em variáveis CSS globais. Evitar cores saturadas ou frias que não estejam na referência.

### 3.3 Tipografia

A referência mostra títulos serifados de caráter editorial e textos auxiliares em uma fonte sem serifa limpa.

Sugestão para reproduzir esse desenho:

- **Títulos, chamadas e marca:** `Lora` (serifada).
- **Textos, navegação, labels, botões e formulários:** `DM Sans` (sans-serif).

Carregar as fontes com fallback adequado. Usar pesos coerentes com os screenshots, sem deixar títulos excessivamente finos ou geométricos. Se os assets originais de fonte forem fornecidos posteriormente, priorizá-los.

### 3.4 Ícones

- **Não utilizar `react-icons` / `react-icons` packages.**
- Utilizar `@phosphor-icons/react`, escolhendo ícones discretos e consistentes com a estética editorial.
- Preferir traço/weight regular ou light; usar weight fill apenas em estados selecionados quando fizer sentido.
- O símbolo do Pensário deve ser um SVG próprio/reutilizável (livro aberto + sol), não um ícone pronto da biblioteca.

### 3.5 Imagens

- A arte da página inicial deve reproduzir a paisagem ilustrada da referência: lago, reflexo, sol baixo, montanhas, pinheiros e cervo à direita.
- Preparar um asset de fundo limpo, sem títulos, botões, navbar ou outros elementos da interface.
- Na página de início, a imagem deve ocupar toda a área principal do hero, com `background-size: cover`/equivalente e posicionamento ajustado para preservar a composição.
- Aplicar overlay/gradiente escuro muito sutil atrás do texto somente quando necessário para legibilidade; não escurecer a imagem a ponto de descaracterizar as cores.
- Para os filósofos, usar retratos/ilustrações de bustos clássicos em tons sépia/monocromáticos, com tratamento visual uniforme.
- Não reutilizar uma captura inteira de tela como background. Isso duplicaria texto e controles.

---

## 4. Arquitetura e tecnologias

### 4.1 Estrutura geral

O repositório já foi organizado com as pastas `backend` e `frontend` dentro de `src/`. **O agente deve seguir esta estrutura existente, conectar corretamente os dois lados e não criar uma segunda estrutura paralela.** Não mover arquivos para fora dessas pastas nem alterar a separação definida abaixo.

```text
pensario/
├── src/
│   ├── backend/                # implementação do backend existente
│   │   ├── controller/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── frontend/               # aplicação React independente
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── context/        # estado de autenticação
│   │   │   ├── data/           # conteúdo estático dos filósofos
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   ├── routes/
│   │   │   ├── services/       # cliente HTTP e chamadas da API
│   │   │   ├── styles/
│   │   │   ├── types/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── vercel.json
│   │   └── .env.example
│   ├── index.js                # ponto de entrada do backend
│   └── setup.js                # inicialização/sincronização do banco
├── package.json                # package.json do backend; preservar scripts/dependências
├── .env                        # somente local; nunca versionar
├── .env.example                # variáveis do backend, sem segredos
└── docs/
    └── design/                 # cópias das nove imagens de referência
```

**Regras obrigatórias de organização e integração:**

- `src/backend/` contém os controllers, models, routes, services e utils do backend. `src/index.js` e `src/setup.js` permanecem na raiz de `src/`, conforme a estrutura existente.
- `src/frontend/` é a raiz independente da aplicação React/Vite. O código da aplicação fica em `src/frontend/src/`.
- O `package.json` da raiz continua sendo o do backend. O frontend utiliza seu próprio `src/frontend/package.json` e seu próprio lockfile.
- Ajustar todos os `require`/imports e caminhos necessários após a separação, para que `src/index.js` carregue corretamente as rotas e dependências de `src/backend/`, e para que o setup do banco continue funcionando. Não deixar módulos desconectados nem duplicar implementações.
- Conectar o frontend à API real do backend por meio do cliente HTTP centralizado e de `VITE_API_URL`, respeitando os endpoints, os métodos, os corpos, os cookies e os cabeçalhos definidos neste PRD. Não criar uma API simulada nem substituir a autenticação existente por dados mockados.
- Executar e validar backend e frontend separadamente, confirmando que ambos iniciam e que os fluxos de autenticação realmente se comunicam entre si.
- Para o deploy do frontend, usar `src/frontend/` como Root Directory da Vercel. O backend continua sendo executado a partir da raiz do repositório, usando o `package.json` principal.

A estrutura interna do frontend pode ser ajustada pelo agente, desde que permaneça organizada dentro de `src/frontend/` e não altere a separação entre frontend e backend.

### 4.2 Frontend

- React.
- TypeScript em modo estrito (`strict: true`).
- Vite.
- React Router para navegação entre páginas.
- Sass Modules (`*.module.scss`) para estilos isolados por componente/página.
- `@phosphor-icons/react` para ícones; não instalar React Icons.
- `fetch` nativo ou um cliente HTTP pequeno e centralizado. Não espalhar chamadas HTTP diretamente pelos componentes.
- Componentes reutilizáveis para navbar, logo, botão, campo, formulário, cartão de filósofo, layout de autenticação, feedback de erro/sucesso e estado de carregamento.

Não usar Next.js, Tailwind ou outra stack no lugar da solicitada. Não adicionar bibliotecas grandes sem necessidade.

### 4.3 Backend

O backend atual é Node.js + Express + Sequelize + PostgreSQL, CommonJS. Ele já implementa o fluxo de autenticação. O frontend deve consumir a API existente.

**Regra prioritária:** preservar o backend e a lógica aprovada. Não fazer refatoração, renomeação de endpoints, troca de JWT, mudança de modelo, alteração de regras de senha ou reestruturação de serviços. Mudanças permitidas devem ser estritamente de integração, configuração de ambiente e deploy, conforme a seção 8.

### 4.4 Conteúdo dos filósofos

O conteúdo desta versão será estático no frontend, por exemplo em `src/frontend/src/data/philosophers.ts`.

Incluir inicialmente os quatro nomes mostrados nas referências:

- Sócrates — ética, autoconhecimento e maiêutica.
- Platão — teoria das ideias e conhecimento.
- Aristóteles — lógica, ética e virtude.
- Friedrich Nietzsche — vontade de poder e além-do-homem.

Cada registro deve conter, no mínimo: `slug`, `name`, `shortDescription`, `portrait`, `whoWas`, `mainIdeas` e `whyItMatters`. Escrever resumos introdutórios em português, claros e concisos; evitar atribuir frases ou ideias sem fonte. Os dados não devem ser gravados no PostgreSQL nesta versão.

---

## 5. Páginas e rotas do frontend

Implementar as nove telas do painel de referência. As telas de autenticação são públicas; a biblioteca, o detalhe do filósofo e o perfil são protegidos.

### 5.1 Mapa de rotas

| Rota frontend | Tela | Acesso |
|---|---|---|
| `/` | 01 — Início | Público |
| `/login` | 02 — Entrar | Público |
| `/register` | 03 — Cadastro | Público |
| `/verify-email` | 04 — Confirme seu e-mail | Público |
| `/activate/:token` | Ativação do token (estado da tela 04) | Público |
| `/password-reset` | 05 — Recuperar senha | Público |
| `/password-reset/:token` | 06 — Nova senha | Público |
| `/biblioteca` | 07 — Biblioteca | Autenticado |
| `/filosofos/:slug` | 08 — Detalhe do filósofo | Autenticado |
| `/perfil` | 09 — Perfil | Autenticado |

Não é necessário criar uma página adicional para “Sobre”. O item “Sobre” da navegação da página inicial pode apontar para uma seção curta da própria home ou para informações institucionais já presentes no rodapé, sem criar outra tela principal.

### 5.2 Tela 01 — Início (`/`)

**Referência:** `01-inicio.png`.

- Navbar horizontal em verde escuro, sobreposta ao topo do hero.
- Logo Pensário à esquerda.
- Navegação enxuta: Início, Biblioteca, Sobre.
- Botão dourado “Entrar” à direita.
- Hero panorâmico ocupando a largura da tela e a maior parte da primeira dobra.
- Paisagem ilustrada do lago com pôr do sol, montanhas, pinheiros e cervo à direita.
- Título em destaque: **“Grandes ideias. Novas perspectivas.”**
- Subtítulo: **“Explore a filosofia através de resumos claros e histórias de grandes pensadores.”**
- CTA primário: **“Explorar biblioteca →”**.
- CTA secundário: **“Entrar”**.
- Visitante que clicar em “Explorar biblioteca” deve ser encaminhado ao login; usuário autenticado pode ir diretamente para `/biblioteca`.
- Não inserir dashboard, gráficos ou elementos de outras páginas na home.

### 5.3 Tela 02 — Entrar (`/login`)

**Referência:** `02-entrar.png`.

- Layout dividido: área ilustrada à esquerda e formulário em painel creme à direita.
- Marca Pensário no topo do painel/área visual, conforme composição da referência.
- Frase de apoio na área ilustrada: **“A filosofia nos convida a pensar melhor sobre o mundo e sobre nós mesmos.”**
- Título do formulário: **“Bem-vindo de volta”**.
- Texto auxiliar: “Acesse sua conta para continuar sua jornada.”
- Campos: E-mail e Senha.
- Controle para mostrar/ocultar senha.
- Link “Esqueceu sua senha?”.
- Botão primário “Entrar”.
- Link inferior para cadastro: “Não tem uma conta? Criar conta”.
- Exibir mensagens claras para credenciais inválidas e conta ainda não ativada.
- Login concluído com sucesso encaminha para `/biblioteca`.

### 5.4 Tela 03 — Cadastro (`/register`)

**Referência:** `03-cadastro.png`.

- Mesmo sistema visual dividido da tela de login.
- Área ilustrada à esquerda com a frase: **“Conhecimento começa com uma boa pergunta.”**
- Painel creme à direita.
- Título: **“Crie sua conta”**.
- Texto auxiliar: “Junte-se ao Pensário e explore o mundo da filosofia.”
- Campos: Nome, E-mail e Senha.
- Controle para mostrar/ocultar senha.
- Informar junto ao campo/regra que a senha deve ter no mínimo 6 caracteres (regra atualmente aplicada pelo backend).
- Botão “Criar conta”.
- Link “Já tem uma conta? Entrar”.
- Após resposta HTTP 201, encaminhar para `/verify-email` e mostrar instrução para conferir o e-mail.
- Tratar e-mail já cadastrado (HTTP 409) e demais erros sem expor stack trace.

### 5.5 Tela 04 — Confirme seu e-mail (`/verify-email` e estado de `/activate/:token`)

**Referência:** `04-ativacao.png`.

- Tela centralizada, fundo creme.
- Cabeçalho verde escuro com marca Pensário.
- Símbolo vetorial próprio de livro aberto com sol no centro.
- Ilustração de montanhas suaves e vegetação na parte inferior.
- Título: **“Confirme seu e-mail”**.
- Mensagem inicial: “Enviamos um link de ativação para o seu e-mail. Clique no link para ativar sua conta.”
- Botão “Voltar ao início”.
- Link “Ir para entrar”.

**Comportamento do link recebido por e-mail:**

- O e-mail deve abrir a rota frontend `/activate/:token`, não uma página JSON do backend.
- A página lê o token da URL e chama `GET /activate/:token` no backend.
- Enquanto aguarda, mostrar estado de carregamento mantendo o mesmo layout.
- Em HTTP 200, mostrar confirmação de conta ativada e CTA “Ir para entrar”.
- Em HTTP 400/500, mostrar mensagem amigável para link inválido/expirado ou erro temporário e oferecer retorno ao login/início.
- Como o endpoint atual apenas ativa a conta e não cria uma sessão JWT, não fingir login automático nem abrir o perfil sem autenticação. Após ativar, o usuário deve entrar pela tela de login.

### 5.6 Tela 05 — Recuperar senha (`/password-reset`)

**Referência:** `05-recuperar-senha.png`.

- Cabeçalho verde escuro com logo Pensário.
- Fundo creme, com ilustração de montanhas e vegetação na parte inferior.
- Título: **“Recuperar senha”**.
- Texto: “Informe seu e-mail para receber as instruções de redefinição de senha.”
- Campo E-mail.
- Botão “Enviar instruções”.
- Link “Voltar ao login”.
- Após HTTP 200, informar que, se o endereço estiver cadastrado, as instruções serão enviadas.
- Manter a mensagem genérica do backend para não revelar se um e-mail está cadastrado.

### 5.7 Tela 06 — Nova senha (`/password-reset/:token`)

**Referência:** `06-nova-senha.png`.

- Mesmo cabeçalho, fundo creme e ilustração inferior da tela 05.
- Título: **“Crie uma nova senha”**.
- Texto auxiliar: “Digite sua nova senha para continuar.”
- Campos: Nova senha e Confirmar nova senha.
- Controle para mostrar/ocultar cada senha.
- Informar a regra mínima de 6 caracteres.
- Botão “Salvar nova senha”.
- O token vem da rota e deve ser enviado no corpo da requisição.
- Enviar `{ token, password, confirmation }` para `POST /password-reset/confirm`.
- Em sucesso, mostrar confirmação de senha alterada e CTA para login (pode ser um estado de sucesso dentro do mesmo layout, sem criar nova tela de referência).
- Tratar token inválido/expirado, senha curta e confirmação divergente.

### 5.8 Tela 07 — Biblioteca (`/biblioteca`)

**Referência:** `07-biblioteca.png`.

- Rota protegida.
- Navbar verde escuro com logo Pensário e links Início, Biblioteca, Perfil e Sair.
- Título centralizado: **“Sua biblioteca de ideias”**.
- Subtítulo: “Escolha um pensador para começar a explorar.”
- Campo de busca com placeholder “Buscar filósofos ou conceitos”.
- Grade de cartões com retratos de bustos clássicos.
- Cartões iniciais: Sócrates, Platão, Aristóteles e Nietzsche.
- Cada cartão contém nome, pequeno tema/descritor e botão “Ver resumo →”.
- A busca deve filtrar os registros estáticos por nome e termos/conceitos disponíveis, no próprio frontend.
- Clique no cartão ou em “Ver resumo” navega para `/filosofos/:slug`.
- Não criar favoritos, categorias dinâmicas ou gestão de conteúdo.

### 5.9 Tela 08 — Filósofo (`/filosofos/:slug`)

**Referência:** `08-filosofo.png`.

- Rota protegida.
- Navbar verde escuro igual à biblioteca.
- Breadcrumb: Início/Biblioteca > nome do filósofo.
- Link/botão “Voltar à biblioteca”.
- Composição em duas colunas: busto/ilustração em destaque à esquerda; conteúdo à direita.
- Nome do filósofo como título principal.
- Seções de conteúdo: “Quem foi?”, “Principais ideias” e “Por que ainda importa?”.
- Texto em português, introdutório, legível e organizado em parágrafos curtos.
- Conteúdo selecionado pelo `slug` no arquivo estático do frontend.
- Se o `slug` não existir, apresentar estado de não encontrado e link para a biblioteca.

### 5.10 Tela 09 — Perfil (`/perfil`)

**Referência:** `09-perfil.png`.

- Rota protegida.
- Navbar verde escuro com logo, links Biblioteca e Perfil, e ação Sair.
- Título: **“Meu perfil”**.
- Avatar simples/ilustrado, nome e e-mail retornados pela API.
- Ação “Editar nome” que habilita edição do nome e salva via API.
- Seção “Alterar senha” com campos: Senha atual, Nova senha e Confirmar nova senha.
- Botão “Salvar alterações”/“Salvar senha”, conforme o formulário ativo.
- Ação “Sair da conta”.
- Não exibir nem permitir alteração de e-mail nesta versão.
- Mostrar feedback de sucesso/erro e atualizar a informação local do nome após salvar.

---

## 6. Fluxos de navegação e autenticação

### 6.1 Visitante

- Pode acessar `/`, `/login`, `/register`, `/verify-email`, `/activate/:token`, `/password-reset` e `/password-reset/:token`.
- Não pode acessar `/biblioteca`, `/filosofos/:slug` ou `/perfil` sem autenticação.
- Ao tentar abrir uma rota protegida sem sessão válida, encaminhar para `/login`.

### 6.2 Usuário autenticado

- Pode acessar biblioteca, detalhes de filósofos e perfil.
- Acesso a `/login` e `/register` pode redirecionar para `/biblioteca`.
- Ao sair, chamar o endpoint de logout e limpar o estado de autenticação do frontend.
- Após logout, navegar para `/login`.

### 6.3 Armazenamento e renovação da sessão

O backend emite access token JWT com expiração de 15 minutos e refresh token com expiração de 7 dias, armazenado no cookie `refreshToken` com atributo `httpOnly`.

Implementar no frontend:

- Guardar o access token apenas em memória (por exemplo, no contexto de autenticação). Não salvar access token ou refresh token em `localStorage` ou `sessionStorage`.
- O cookie HTTP-only não pode nem deve ser lido por JavaScript.
- No carregamento inicial da aplicação, tentar restaurar a sessão chamando `POST /refresh` com credenciais/cookies incluídos.
- Se a resposta for 200, guardar o novo access token em memória e o usuário retornado.
- Se receber 401, tratar como visitante e limpar estado local.
- Em chamadas protegidas, enviar `Authorization: Bearer <accessToken>`.
- Se uma chamada retornar 401 por expiração do access token, tentar `POST /refresh` uma vez e repetir a chamada original uma única vez. Evitar loops infinitos de refresh.
- Em falha definitiva de refresh, limpar a sessão e encaminhar para `/login`.
- Para login, refresh e logout, incluir credenciais/cookies na requisição (`credentials: 'include'` no `fetch`).

O endpoint `/logout` atualmente exige tanto o access token no cabeçalho quanto o cookie de refresh token. O frontend deve enviar ambos.

---

## 7. Contrato da API existente

O backend não utiliza atualmente um prefixo `/api`. Consumir os caminhos abaixo sem renomeá-los.

Configurar a URL base no frontend através da variável `VITE_API_URL`, por exemplo `http://localhost:3000` durante desenvolvimento. Não colocar segredos no frontend.

| Método | Endpoint | Público/protegido | Corpo da requisição | Resposta de sucesso |
|---|---|---|---|---|
| `POST` | `/register` | Público | `{ name, email, password }` | `201 { name, email }` |
| `GET` | `/activate/:token` | Público | Sem corpo | `200 { message }` |
| `POST` | `/login` | Público | `{ email, password }` | `200 { accessToken, user: { id, name, email } }` + cookie HTTP-only `refreshToken` |
| `POST` | `/logout` | Protegido: Bearer + cookie | Sem corpo | `200 { message }` e cookie removido |
| `GET` | `/profile` | Protegido: Bearer | Sem corpo | `200 { id, name, email }` |
| `PATCH` | `/profile` | Protegido: Bearer | `{ name }` | `200 { id, name, email }` |
| `PATCH` | `/profile/password` | Protegido: Bearer | `{ currentPassword, newPassword, confirmation }` | `200 { message }` |
| `POST` | `/refresh` | Cookie HTTP-only | Sem corpo | `200 { accessToken, user: { id, name, email } }` |
| `POST` | `/password-reset` | Público | `{ email }` | `200 { message }` genérica |
| `POST` | `/password-reset/confirm` | Público | `{ token, password, confirmation }` | `200 { message }` |

### 7.1 Respostas de erro relevantes para a interface

O frontend deve considerar, no mínimo:

- Cadastro: HTTP 400 para campos obrigatórios/tipo inválido/senha menor que 6; HTTP 409 para e-mail duplicado.
- Login: HTTP 401 para credenciais inválidas e `code: "CONTA_NAO_ATIVADA"` para conta não ativada.
- Ativação: HTTP 400 para token inválido, expirado ou já utilizado.
- Rotas protegidas: HTTP 401 para sessão ausente/inválida/expirada; HTTP 404 quando usuário não encontrado.
- Alteração de nome: HTTP 400 para nome inválido.
- Alteração de senha: HTTP 400 para campos ausentes, senha curta, confirmação divergente ou senha atual incorreta.
- Refresh: HTTP 401 quando cookie/token não existe, expirou ou não está registrado no banco.
- Reset: HTTP 400 para token inválido/expirado, senha curta ou confirmação divergente.
- Erros HTTP 500 devem gerar mensagem amigável e não exibir detalhes internos.

Os nomes/códigos de erro existentes não devem ser renomeados. Como alguns handlers retornam corpo vazio em determinados erros, o frontend também deve funcionar quando não houver JSON no corpo.

---

## 8. Alterações permitidas no backend — somente integração

A atividade de autenticação já foi aceita. Portanto, tratar o backend como concluído e aprovado. Não implementar a funcionalidade de alteração de e-mail e não reescrever o sistema de autenticação.

São permitidas somente as mudanças abaixo, estritamente para que a aplicação funcione no ambiente local e em produção:

### 8.1 CORS e origem do frontend

Atualmente `src/index.js` permite apenas `http://localhost:5173` e `credentials: true`.

- Preservar `credentials: true`.
- Tornar a origem configurável por variável de ambiente (`FRONTEND_URL` ou `CORS_ORIGIN`).
- Permitir o endereço local de desenvolvimento e a origem de produção da Vercel.
- Não usar `origin: '*'` junto com credenciais.
- Se houver múltiplas origens, validar explicitamente uma lista configurada.

### 8.2 Porta do servidor

O servidor usa atualmente a porta fixa `3000`.

- Permitir `process.env.PORT || 3000`, para funcionar no provedor de hospedagem do backend.
- Manter a porta 3000 como fallback local.

### 8.3 Links dos e-mails

Atualmente `src/backend/services/mail-service.js` usa URLs `http://localhost:3000/activate/:token` e `http://localhost:3000/password-reset/:token`.

- Introduzir uma variável de ambiente `FRONTEND_URL`.
- O link de ativação deve apontar para `${FRONTEND_URL}/activate/:token`.
- O link de redefinição deve apontar para `${FRONTEND_URL}/password-reset/:token`.
- A página frontend receberá o token e chamará o endpoint backend já existente.
- Mover também o endereço remetente atualmente hardcoded para variável `EMAIL_FROM` (sem mudar o mecanismo Nodemailer).
- Não expor tokens em logs, analytics ou mensagens de erro.

### 8.4 Cookies em produção

O cookie atual utiliza `httpOnly`, `secure` condicionado a `NODE_ENV === 'production'`, `sameSite: 'strict'` e `path: '/'`.

- Preservar `httpOnly` e `path: '/'`.
- Avaliar a topologia real dos domínios da Vercel e do backend antes de ajustar `sameSite`.
- Garantir `secure: true` em produção HTTPS.
- A configuração de `sameSite` deve ser compatível com o cenário de deploy e testada em navegadores reais. Não mudar para `None` sem também usar `Secure` e sem verificar o comportamento dos cookies.
- Preferir, quando possível, frontend e API em subdomínios do mesmo domínio próprio ou uma estratégia de proxy/rewrite da Vercel para evitar problemas com cookies cross-site.
- O frontend deve sempre enviar credenciais/cookies nas chamadas pertinentes.

### 8.5 Conexão PostgreSQL com Neon

O usuário criará um projeto novo no **Neon** para hospedar o PostgreSQL do Pensário.

O `src/backend/utils/db.js` atual usa variáveis separadas (`DB_DATABASE`, `DB_USER`, `DB_HOST`, `DB_PORT`, `DB_PASSWORD`) e não contém configuração explícita de SSL nem suporte à connection string do Neon.

- Adaptar minimamente `src/backend/utils/db.js` para aceitar a variável `DATABASE_URL` do Neon.
- Configurar a conexão PostgreSQL com TLS/SSL conforme os parâmetros recomendados pelo Neon para Node.js/Sequelize.
- Se for útil preservar compatibilidade local, manter suporte aos campos separados `DB_DATABASE`, `DB_USER`, `DB_HOST`, `DB_PORT` e `DB_PASSWORD` como fallback.
- A connection string do Neon deve existir somente no ambiente do backend, nunca no frontend ou em variáveis `VITE_*`.
- Configurar pool/timeout apenas se necessário para a hospedagem escolhida; não introduzir dependências sem motivo.
- Inicializar o banco novo usando os modelos Sequelize existentes (`User` e `Token`).
- Revisar o procedimento atual de `src/setup.js` e garantir que a sincronização seja aguardada e tenha tratamento de erro. Executar o setup de forma explícita/única no banco novo.
- Não usar `sequelize.sync({ force: true })`; não apagar tabelas nem dados.
- Não criar tabelas de filósofos ou de conteúdo.

### 8.6 Variáveis de ambiente esperadas

**Backend (servidor de produção):**

```env
NODE_ENV=production
PORT=
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=
FRONTEND_URL=
CORS_ORIGIN=
```

**Frontend (Vercel):**

```env
VITE_API_URL=
```

As variáveis `JWT_*`, `DATABASE_URL`, `EMAIL_PASS` e demais segredos nunca podem receber prefixo `VITE_`, pois variáveis Vite são incorporadas ao bundle público.

Criar `.env.example` apenas com nomes e exemplos fictícios/valores vazios. Nunca copiar valores reais do `.env` enviado.

---

## 9. Neon — banco de dados

- Criar um projeto PostgreSQL separado no Neon para o Pensário.
- Criar/usar um database dedicado para este projeto.
- Copiar a connection string do Neon somente para a variável `DATABASE_URL` no ambiente do backend.
- Não apontar o Pensário para o banco usado na atividade anterior.
- Não alterar os modelos `User` e `Token` sem necessidade de integração.
- Executar o setup inicial para criar as tabelas com os modelos Sequelize atuais.
- Confirmar conexão, criação das tabelas e relacionamento `User`–`Token` antes de testar cadastro/login.
- Não colocar credenciais em commits, screenshots, logs ou documentação pública.

---

## 10. Deploy na Vercel e ambientes

### 10.1 Frontend

- O frontend deve estar preparado para deploy na Vercel.
- Configurar o projeto Vercel com **Root Directory = `src/frontend`**.
- Framework preset: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.
- Install command: `npm install` (ou o gerenciador escolhido, mantendo lockfile consistente).
- Criar `src/frontend/vercel.json` com fallback SPA para que rotas como `/login`, `/biblioteca`, `/perfil`, `/activate/:token` e `/password-reset/:token` funcionem quando abertas diretamente ou recarregadas.
- Configurar `VITE_API_URL` nas variáveis de ambiente da Vercel para Preview e Production, cada uma apontando para a API correspondente.
- Não incluir credenciais do Neon, SMTP ou JWT no projeto Vercel/frontend.

### 10.2 Backend

- O backend deve continuar como serviço Node.js independente, hospedado em um provedor compatível com Express.
- Usar `npm install` e o comando de inicialização `npm start` ou o comando indicado pelo provedor.
- Respeitar `process.env.PORT`.
- Configurar as variáveis do backend no painel do provedor.
- Configurar o endereço público do backend em `VITE_API_URL` e o domínio frontend em `FRONTEND_URL`/`CORS_ORIGIN`.
- Não tentar hospedar o servidor Express como se fosse uma aplicação estática Vite na Vercel.

### 10.3 Local, Preview e Production

Documentar no README do projeto os passos para executar backend e frontend localmente, configurar `.env`, inicializar o Neon e testar o fluxo de autenticação. Não misturar variáveis de ambiente locais com as da Vercel/provedor.

---

## 11. Responsividade — celular, tablet, computador e TV

A referência é desktop em proporção horizontal. A interface deve preservar a composição e a identidade em todos os tamanhos, adaptando o layout sem simplesmente reduzir a tela desktop.

### Celulares (aprox. 320–767 px)

- Navbar compacta com menu mobile acessível.
- Hero ocupa a largura disponível; ajustar o enquadramento da paisagem para manter título e sujeito principal visíveis.
- Título quebra em linhas equilibradas e não encobre totalmente o sol/cervo.
- Botões podem empilhar se necessário, com área de toque confortável.
- Páginas de login/cadastro deixam de ser divididas lado a lado: ilustração pode virar faixa superior/fundo parcial e painel de formulário ocupa a largura.
- Formulários usam largura total disponível, sem overflow horizontal.
- Biblioteca usa uma coluna em telas estreitas e duas colunas em celulares largos somente se os cartões continuarem legíveis.
- Página do filósofo empilha retrato e texto.
- Perfil organiza informações e formulário em coluna.

### Tablets (aprox. 768–1023 px)

- Manter a identidade e, quando houver espaço, o layout dividido das páginas de autenticação.
- Biblioteca em duas colunas.
- Página do filósofo pode manter duas colunas compactas se a leitura não ficar comprimida; caso contrário, empilhar.
- Navegação não deve sobrepor logo ou botões.

### Computadores (aprox. 1024–1919 px)

- Reproduzir prioritariamente a composição dos screenshots.
- Biblioteca em quatro cartões por linha quando houver espaço suficiente.
- Páginas de autenticação em layout dividido.
- Limitar larguras de leitura e formulários para evitar linhas excessivamente longas.

### TVs e telas muito largas (1920 px ou mais)

- Utilizar container central com largura máxima definida (aprox. 1440–1600 px) para preservar proporções.
- Usar escalas fluidas com `clamp()` para tipografia, espaçamento e botões, sem exagerar tamanhos.
- Manter legibilidade a distância e contraste adequado.
- Não esticar os cartões ou parágrafos por toda a largura da TV.
- Hero pode preencher a tela, mas conteúdo principal permanece alinhado ao container.

### Requisitos gerais de responsividade

- Breakpoints devem ser definidos conforme o conteúdo, não apenas por modelo de aparelho.
- Testar pelo menos 360 px, 390 px, 768 px, 1024 px, 1440 px e 1920 px.
- Sem scroll horizontal indevido.
- Imagens com `object-fit`/`background-position` ajustados por viewport.
- Navegação por teclado, foco visível, labels associados e contraste legível.
- Respeitar `prefers-reduced-motion`; evitar animações decorativas pesadas.

---

## 12. UX, acessibilidade e estados de interface

Todas as telas devem prever:

- Estado de carregamento nos envios de formulários e chamadas de autenticação.
- Botões desabilitados durante submissão para evitar envios duplicados.
- Mensagens de validação próximas ao campo correspondente.
- Feedback geral de sucesso/erro com linguagem simples em português.
- Estados de token inválido/expirado e sessão expirada.
- Estado vazio para busca sem resultados e filósofo inexistente.
- Foco visível e navegação por teclado.
- `label` real para cada input; placeholder não substitui label.
- Botões com type explícito; formulários com prevenção de envio duplicado.
- Controle de mostrar/ocultar senha acessível.
- Não revelar se um e-mail existe no fluxo de recuperação de senha.
- Não exibir stack trace, segredo, token de sessão ou dados técnicos internos ao usuário.

Idioma de toda a interface: **português do Brasil**.

---

## 13. Segurança e proteção de dados

- Nunca salvar access token ou refresh token em `localStorage`/`sessionStorage`.
- O refresh token continua restrito ao cookie HTTP-only do backend.
- Não expor `DATABASE_URL`, segredos JWT, senha SMTP ou qualquer credencial no frontend.
- Não incluir dados sensíveis em logs do browser ou servidor.
- Não expor tokens de ativação/reset em logs ou telemetria.
- Validar dados no frontend para UX, mas respeitar o backend como autoridade das validações.
- Não usar CORS wildcard com cookies/credentials.
- Assegurar HTTPS em produção.
- Manter `.env` e arquivos de credenciais fora do Git.

**Aviso sobre o arquivo enviado:** o ZIP do backend contém um arquivo `.env`. O agente não deve copiá-lo para outro ambiente, mostrá-lo, incluí-lo em commits ou reproduzir seus valores. Se ele contiver credenciais reais, considerar esses valores potencialmente expostos e substituí-los (senha do banco, senha de app SMTP e segredos JWT) antes do deploy. Criar novas credenciais específicas para o Pensário.

---

## 14. Qualidade e critérios de aceite

O projeto será considerado concluído quando todos os itens abaixo forem atendidos.

### Design

- [ ] A marca aparece como **Pensário** em todas as telas.
- [ ] As nove telas seguem os PNGs de referência, sem mudar a direção visual.
- [ ] A paleta verde escuro/creme/dourado/laranja está consistente.
- [ ] A paisagem da home mantém lago, pôr do sol, montanhas, pinheiros e cervo, sem texto embutido no asset.
- [ ] Tipografia serifada nos títulos e sans-serif nos textos está consistente.
- [ ] Não existe uso da biblioteca `react-icons`.
- [ ] A identidade visual não foi substituída pela proposta cósmica escura.

### Frontend e rotas

- [ ] As nove telas foram implementadas.
- [ ] As rotas públicas e protegidas funcionam.
- [ ] A biblioteca lista os quatro filósofos iniciais.
- [ ] A busca local filtra os filósofos/conceitos.
- [ ] Cada cartão abre sua página de detalhe.
- [ ] O perfil permite alterar nome e senha usando os endpoints existentes.
- [ ] Não foram adicionados favoritos, notas, progresso ou outras funcionalidades fora do escopo.

### Autenticação e integração

- [ ] Cadastro cria usuário e apresenta instrução de ativação.
- [ ] Link de ativação abre o frontend e aciona `GET /activate/:token`.
- [ ] Login cria sessão e encaminha para biblioteca.
- [ ] Conta inativa recebe mensagem apropriada.
- [ ] Refresh restaura a sessão após recarregar a página.
- [ ] Rotas protegidas não ficam acessíveis sem sessão válida.
- [ ] Logout envia Bearer + cookie, encerra sessão e encaminha para login.
- [ ] Recuperação envia instruções e mantém mensagem genérica.
- [ ] Link de reset abre a página frontend com token e permite redefinir senha.
- [ ] Alterar nome e senha reflete no backend.
- [ ] O access token permanece em memória e refresh token não é acessível por JavaScript.

### Banco e deploy

- [ ] O backend conecta ao novo PostgreSQL no Neon via TLS/SSL.
- [ ] As tabelas `users` e `tokens` foram criadas a partir dos modelos atuais.
- [ ] A associação `User`–`Token` funciona.
- [ ] Nenhuma informação do banco antigo foi reutilizada indevidamente.
- [ ] O frontend compila com `npm run build`.
- [ ] Rotas SPA abrem diretamente na Vercel sem 404.
- [ ] Variáveis de ambiente de Preview e Production estão configuradas.
- [ ] Cookies, CORS e refresh funcionam no domínio de produção.
- [ ] A aplicação funciona em celular, tablet, desktop e TV/tela muito larga.
- [ ] Não há segredos no Git ou no bundle do frontend.

---

## 15. Ordem recomendada de implementação

Para reduzir retrabalho, seguir esta sequência:

1. **Inspecionar e preservar o backend:** mapear os arquivos atuais, confirmar o contrato descrito na seção 7 e identificar somente os ajustes de integração permitidos.
2. **Preparar o repositório:** criar `src/frontend/` sem mover o backend; preparar TypeScript, Vite, Sass Modules, React Router e a biblioteca de ícones Phosphor.
3. **Preparar os assets e tokens visuais:** organizar referências em `docs/design/`, definir cores, fontes, componentes base e preparar a imagem limpa do hero.
4. **Construir as telas públicas:** início, login, cadastro, confirmação de e-mail, recuperação e nova senha.
5. **Conectar a autenticação:** cliente HTTP, contexto de sessão, refresh, proteção de rotas, ativação e recuperação.
6. **Construir as telas privadas:** biblioteca, detalhe do filósofo e perfil.
7. **Integrar o Neon:** configurar connection string/SSL e inicializar as tabelas atuais sem recriar a modelagem.
8. **Configurar deploy:** Vercel para frontend e um host Node para backend; configurar cookies, CORS, URLs e variáveis.
9. **Executar testes de ponta a ponta e responsividade:** validar os fluxos da seção 14 em ambiente local e produção.

---

## 16. Instrução final ao agente

Trate este documento e os nove PNGs como especificação do produto. O objetivo é **construir o frontend do Pensário e conectá-lo ao backend já aprovado**, não recomeçar o backend.

Antes de alterar qualquer arquivo backend, comparar a necessidade com a seção 8. Se uma mudança não for indispensável para CORS, URL de produção, cookies, e-mails, porta, conexão Neon ou inicialização do banco, não a faça. Não implementar alteração de e-mail nem qualquer funcionalidade fora do escopo.

Prioridades, nesta ordem:

1. Fidelidade visual às nove telas escolhidas.
2. Reutilização correta do backend e de seus endpoints atuais.
3. Fluxos de autenticação realmente funcionais, inclusive cookies/refresh em produção.
4. Responsividade e acessibilidade.
5. Simplicidade: entregar somente o que está descrito aqui.
