# Desafio Back-end | API
## API REST - Sistema Bancário

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joaowatanabe/desafio-RESTful-API?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/joaowatanabe/desafio-RESTful-API">
  
  <a href="https://github.com/joaowatanabe/desafio-RESTful-API/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/joaowatanabe/desafio-RESTful-API">
  </a>
  
  <!-- <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"> -->
  
</p>
<h4 align="center"> 
	🚧 Cubos Bank - API REST 🚧
</h4>

<p align="center">
	<img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o projeto

📄 Desenvolvimento de uma API no padrao Rest para um sistema bancário, que permita:

Projeto desenvolvido durante o curso que ao finalizar o módulo 3 foi passado o desafio de criar uma API para um banco digital ficticio, onde precisava atendender a todos requisitos do padrao REST, utilizando express, nodemon, bcrypt, jsonwebtoken, e pg, junto com o JavaScript e o Node.js e a persistencia do banco de dados utilizando o postgreSQL e o beekeeper e também o insomnia para realização dos testes.

---

## ⚙️ Funcionalidades

- [x] Cadastrar Usuário
- [x] Fazer Login
- [x] Detalhar Perfil do Usuário Logado
- [x] Editar Perfil do Usuário Logado
- [x] Listar categorias
- [x] Listar transações
- [x] Detalhar transação
- [x] Cadastrar transação
- [x] Editar transação
- [x] Remover transação
- [x] Obter extrato de transações

---
## **Banco de dados**

Banco de Dados PostgreSQL chamado `dindin` contendo as seguintes tabelas e colunas:

- A API a ser criada deverá acessar o banco de dados a ser criado "dindin" para persistir e manipular os dados de usuários, categorias e transações utilizados pela aplicação.

- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao
- transacoes
  - id
  - descricao
  - valor
  - data
  - categoria_id
  - usuario_id
  - tipo

---
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Nodemon](https://nodemon.io/), [Bcrypt](https://www.npmjs.com/package/bcrypt), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [pg](https://www.npmjs.com/package/pg), [Insomnia](https://insomnia.rest/download), 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---
## **Requisitos obrigatórios**

- A API a ser criada deverá acessar o banco de dados a ser criado "dindin" para persistir e manipular os dados de usuários, categorias e transações utilizados pela aplicação.
- O campo `id` das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- Seu código deverá estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
  - Um arquivo index.js
  - Um arquivo conexao.js
  - Um arquivo de rotas
  - Um pasta com controladores
- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)

---

## 🛣️ Como executar o projeto

Este projeto é divido em :
1. Backend


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Nodemon](https://nodemon.io/), [Insomnia](https://insomnia.rest/download).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:joaowatanabe/apirest-bank-system.git

# Acesse a pasta do projeto no terminal/cmd
$ cd apirest-bank-system

# Vá para a pasta src
$ cd src

# Instale as dependências
$ npm install express
$ npm install -D nodemon

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 a seguir das rotas desejadas (todas estão na pasta /routes) através do insomnia. 

```
<p align="center">
  <a href="https://github.com/joaowatanabe/desafio-RESTful-API" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:


#### [](https://github.com/joaowatanabe/desafio-RESTful-API#server-nodejs--typescript)**Server**  ([Node.js](https://nodejs.org/en)  +  [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript))

-   **[Express](https://expressjs.com/)**
-   **[Nodemon](https://expressjs.com/)**
-   **[Nodemon](https://expressjs.com/)**
-   **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
-   **[pg](https://www.npmjs.com/package/pg)**

> Veja o arquivo  [package.json](https://github.com/joaowatanabe/desafio-RESTful-API/package.json)

#### [](https://github.com/cubos-academy/academy-template-readme-projects#utilit%C3%A1rios)**Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Markdown:  **[StackEdit](https://stackedit.io/)**,  **[Markdown Emoji](https://gist.github.com/rxaviers/7360908)**
-   Commit Conventional:  **[Commitlint](https://github.com/conventional-changelog/commitlint)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**
-   Beekeeper: **[Beekeeper](https://www.beekeeperstudio.io/)**

---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---

## 🧙‍♂️ Autor

 <sub><b>João Vicente Watanabe</b></sub></a>
 <br />

---

## 📝 Licença

<!-- Este projeto esta sobe a licença [MIT](./LICENSE). -->

Feito por João Vicente [Entre em contato!](https://www.linkedin.com/in/joaowatanabe/)


