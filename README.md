# 🎬 CineFlix

<p align="center">
  <img src="https://github.com/user-attachments/assets/SEU-BANNER-AQUI" alt="CineFlix Banner" width="100%">
</p>

<p align="center">
  Um catálogo moderno de filmes e séries desenvolvido com Next.js, TypeScript e TMDB API.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/TMDB-API-01D277?style=for-the-badge" />
</p>

## 🚀 Funcionalidades

### 🎥 Filmes e Séries

- Listagem de filmes em alta
- Listagem de séries em alta
- Busca por título
- Paginação dinâmica
- Banner principal com destaque automático
- Informações detalhadas dos títulos

### ⭐ Favoritos

- Adicionar filmes aos favoritos
- Remover filmes da lista
- Persistência local
- Página exclusiva de favoritos

### 📄 Página de Detalhes

- Poster em alta qualidade
- Sinopse completa
- Nota TMDB
- Duração do filme
- Data de lançamento
- Gêneros
- Elenco principal
- Recomendações relacionadas

### 📱 Responsividade

- Interface Desktop
- Interface Tablet
- Interface Mobile
- Navegação inferior para dispositivos móveis

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### API

- TMDB API

### Gerenciamento

- Context API
- React Hooks

---

## 📂 Estrutura do Projeto

```bash
src
├── app
│   ├── movie
│   │   └── [id]
│   ├── minha-lista
│   └── page.tsx
│
├── components
│   ├── BarNavigation.tsx
│   ├── HeroBanner.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── Pagination.tsx
│   ├── TopBar.tsx
│   └── FavoriteButton.tsx
│
├── context
│   └── FavoritesContext.tsx
│
├── lib
│   └── tmdb.ts
│
└── styles
```

---

## ⚙️ Instalação

### Clone o projeto

```bash
git clone https://github.com/joaosilvateixeira33/cine-flix.git
```

### Entre na pasta

```bash
cd cine-flix
```

### Instale as dependências

```bash
npm install
```

### Configure as variáveis de ambiente

Crie um arquivo:

```env
.env.local
```

Adicione sua chave da TMDB:

```env
TMDB_API_TOKEN=SEU_TOKEN_AQUI
```

---

## 🔑 Obtendo a chave da TMDB

1. Acesse:

https://www.themoviedb.org

2. Crie uma conta

3. Vá em:

```txt
Configurações
→ API
→ Solicitar Chave
```

4. Copie o Bearer Token

5. Adicione ao arquivo:

```env
TMDB_API_TOKEN=SEU_TOKEN
```

---

## ▶️ Executando o Projeto

Modo desenvolvimento:

```bash
npm run dev
```

Aplicação disponível em:

```txt
http://localhost:3000
```

---

## 🏗️ Build de Produção

```bash
npm run build
```

```bash
npm start
```

---

## 🎯 Aprendizados

Durante o desenvolvimento deste projeto foram aplicados conceitos como:

- Server Components
- Client Components
- Context API
- Consumo de APIs REST
- SSR
- Responsividade
- Gerenciamento de estado
- Componentização
- Navegação dinâmica
- Performance com Next.js

---

## 📈 Melhorias Futuras

- Login de usuários
- Autenticação JWT
- Integração com conta TMDB
- Avaliações dos usuários
- Trailer dos filmes
- Infinite Scroll
- Dark/Light Theme
- Histórico de visualização
- Watchlist sincronizada

---

## 👨‍💻 Autor

### João Silva Teixeira

Desenvolvedor Full Stack apaixonado por tecnologia, interfaces modernas e desenvolvimento web.

<p align="left">
  <a href="https://github.com/joaosilvateixeira33">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github">
  </a>
</p>

---

## 📜 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Desenvolvido com ❤️ utilizando Next.js, TypeScript e TMDB API.
</p>
