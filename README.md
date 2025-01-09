# 🚀 Desafio Luizalabs

Este projeto é uma API para cadastro de clientes e lista de produtos favoritos, desenvolvida com NestJS e Prisma.

## 📋 Pré-requisitos

- Node.js (versão 22)
- Docker e Docker Compose

## 🛠️ Configuração do Ambiente

1. Clone o repositório:

    ```sh
    git clone https://github.com/fazedordecodigo/desafio-tecnico-luizalabs.git
    cd seu-repositorio
    ```

2. Crie um arquivo  na raiz do projeto com as seguintes variáveis de ambiente:

    ```env
    DATABASE_URL='postgresql://user:xxx@postgres:5432/favorites_db?schema=public'
    POSTGRES_PASSWORD=xxxx
    POSTGRES_USER=user
    POSTGRES_DB=favorites_db
    URL='http://localhost:3000'
    JWT_SECRET=xxx // Preencha com UUID
    ID_PRODUCT_TO_GET_TEST_E2E=xxx  // Preencha com UUID
    ID_PRODUCT_TO_POST_TEST_E2E=xxx  // Preencha com UUID
    ID_CUSTOMER_TO_GET_TEST_E2E=xxxx  // Preencha com UUID
    EMAIL_FAKE='johndoe@email.com'
    PASSWORD_FAKE=xxx
    ```

## 🐳 Executando com Docker Compose

1. Suba os containers:

    ```sh
    docker-compose up --build
    ```

2. Acesse a aplicação em `http://localhost:3000/swagger`.

## 🧪 Executando os Testes

1. Para rodar os testes unitários:

    ```sh
    npm run test
    ```

2. Para rodar os testes de integração:

    ```sh
    npm run test:e2e
    ```

## 🚀 Executando o Projeto

1. Instale as dependências:

    ```sh
    npm install
    ```

2. Gere os arquivos do Prisma:

    ```sh
    npx prisma generate
    ```

3. Rode as migrações do banco de dados:

    ```sh
    npx prisma migrate deploy
    ```

4. Execute o projeto:

    ```sh
    npm run start:dev
    ```

5. Acesse a aplicação em `http://localhost:3000`.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Feito com ❤️ por [Emerson Delatorre](https://github.com/fazedordecodigo)
