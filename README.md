# 📚 Minha Biblioteca — MVP de Desenvolvimento Front-end Avançado

Este projeto foi desenvolvido como parte do MVP da disciplina **Desenvolvimento Front-end Avançado** ministrada pelos professores Dieinison Braga e Marisa Silva. O objetivo principal foi consolidar o conhecimento em **componentização com React**, criando uma aplicação com múltiplas páginas, reutilização de componentes, consumo de API externa e usabilidade.

## 🚀 Funcionalidade

A aplicação consiste em uma biblioteca de livros onde é possível:
- Visualizar livros buscados pela API do Google Books (via back-end).
- Cadastrar livros manualmente via formulário com validação e persistência no localStorage.
- Navegar entre páginas e visualizar detalhes dos livros em modal.
- Receber feedbacks visuais com mensagens de sucesso, erro, loaders, tooltips e mensagens condicionais.

## Estrutura
mvp-frontend/
├── db.json
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── FeedbackMessage.js
│   │   ├── Header.jsx
│   │   ├── LivroModal.jsx
│   │   └── Loader.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Cadastro.jsx
│   │   ├── Home.jsx
│   │   ├── Livros.jsx
│   │   └── NotFound.jsx
│   └── services/
│       ├── api.js
│       └── livrosApi.js


## 🔗 API Externa

- **API:** [Google Books API](https://developers.google.com/books/docs/v1/using)
- **Função:** Buscar livros com base em termos de pesquisa.
- **Acesso:** Indiretamente, por meio do back-end `mvp-frontend-avancadoApi` (evitando chamadas diretas no front).
- **Licença:** Pública e gratuita.
- **Cadastro/API Key:** A API funciona sem autenticação básica para buscas simples (em modo demo).
- **Exemplo de uso no back-end:**  
  `https://www.googleapis.com/books/v1/volumes?q=harry+potter`

> ❗ O front-end **não acessa diretamente** a API do Google Books. Toda a comunicação é feita com o back-end, que então busca os dados e devolve ao front.

## ▶️ Instruções de Execução

```bash
npm install
npm start


## 📦 Alternativa com JSON Server (opcional)

Caso você queira rodar o projeto sem configurar o back-end em Python, você pode usar o `db.json` incluído neste projeto com o `json-server`.

### Como executar com `json-server`:

```bash
# Instale o json-server globalmente (caso ainda não tenha)
npm install -g json-server

# Inicie o servidor local apontando para db.json
json-server --watch db.json --port 3001
