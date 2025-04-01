
# Naruto CRUD

## Descrição do Projeto

Este é um projeto de gerenciamento de personagens, onde é possível adicionar novos personagens personalizados, favoritar personagens existentes e salvar esses dados localmente utilizando o `localStorage`. A aplicação carrega personagens da **API Dattebayo**, que fornece dados sobre os personagens do universo Naruto, e permite que os usuários favoritem e removam personagens da lista de favoritos.

### Funcionalidades principais:
- **Adicionar Personagem**: O usuário pode adicionar personagens personalizados com nome, clã e gênero.
- **Favoritar Personagens**: Os personagens podem ser marcados como favoritos, e esses favoritos são armazenados no `localStorage` para persistência de dados.
- **Exibição de Personagens**: A aplicação carrega personagens da API Dattebayo e permite que o usuário interaja com a lista, incluindo adicionar novos personagens e favoritar.
- **Persistência de Dados**: Todos os dados (personagens e favoritos) são armazenados no `localStorage` para garantir que os dados sejam persistentes, mesmo após um refresh na página.
- **API de Naruto Dattebayo**: A aplicação consome uma API externa chamada **Dattebayo**, que retorna dados sobre os personagens do universo Naruto, como nome, clã, gênero, entre outras informações.

## Passos para Rodar Localmente

Siga os passos abaixo para rodar o projeto em sua máquina localmente:

### 1. Clonar o Repositório

Primeiro, clone o repositório para sua máquina:

```bash
git clone https://github.com/seu-usuario/my-naruto-crud.git
cd my-naruto-crud
```

### 2. Instalar Dependências

Execute o comando abaixo para instalar as dependências necessárias:

```bash
npm install
```

### 3. Rodar o Projeto

Após a instalação, inicie o servidor de desenvolvimento com:

```bash
npm start
```

Isso abrirá a aplicação no navegador com o endereço `http://localhost:3000`.

## Versões Usadas no Projeto

Aqui estão as versões das principais tecnologias usadas no projeto:

- **React**: v19.0.0
- **TypeScript**: v4.9.5
- **TailwindCSS**: v3.4.17
- **Zustand**: v5.0.3

Essas versões são as que foram usadas para o desenvolvimento da aplicação, mas você pode verificar as versões exatas no `package.json`.
