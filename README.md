# Filmes API

## Descrição

A API Filmes é uma aplicação para gerenciamento de usuários e assinaturas de pacotes, consumindo a API do Movie Database para armazenar e gerenciar temas relacionados a filmes. A API permite listar filmes de acordo com os temas permitidos pelos pacotes dos usuários, armazenar filmes assistidos e emitir relatórios com base nos filmes assistidos pelos usuários.

## Tecnologias e Ferramentas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript.
- **Prisma**: ORM para PostgreSQL.
- **Docker**: Contêineres para empacotar e distribuir a aplicação.
- **Mongoose**: Biblioteca de modelagem de objetos MongoDB para Node.js.
- **Express**: Framework para construir APIs com Node.js.
- **PostgreSQL**: Banco de dados relacional.
- **MongoDB**: Banco de dados NoSQL.

## Configuração do ambiente

1. Crie um arquivo .env na raíz do projeto.
2. Adicione as configurações de exemplo (ambiente local):
   ```bash
   DATABASE_URL=postgresql://postgres:senha_do_postgres@127.0.0.1:5432/filmes
   MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
   ENVIRONMENT=dev
   IP=0.0.0.0
   PORT=3000
   JWT_SECRET=localSecret
   RUN_PROCEDURES=true
   RUN_ROUTINES=true
   ```

As configurações de exemplo também estão disponíveis em [.env.example](https://github.com/RobsonArita/filmes_api/blob/main/.env.example), também na raíz do projeto.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/RobsonArita/filmes_api
cd filmes
```

### Docker Standalone

Para rodar a aplicação em standalone com docker:

1. Instale as dependências do postgreSQL virtualmente:

   ```bash
   docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=senha_do_postgres -e POSTGRES_DB=filmes -p 5432:5432 -d postgres:15
   ```

2. Instale as dependências do mongo virtualmente:

   ```bash
   docker run --name mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=my-secret-pw -p 27017:27017 -d mongo:latest
   ```

3. Execute as migrações do Prisma:

   ```bash
   yarn prisma migrate deploy
   ```

4. Instale as dependências do projeto:

   ```bash
   yarn install
   ```

5. Inicie o servidor:
   ```bash
   yarn dev
   ```

## Execução com Docker

Para construir e iniciar a aplicação usando Docker:

```bash
docker-compose up --build
```

## Uso

A API oferece vários endpoints para gerenciar usuários, assinaturas de pacotes, listar filmes e emitir relatórios. A documentação completa dos endpoints está disponível
no path /docs do repositório.

Existem recursos que exigem a autenticação de um usuário admininstrador. Para mais informações do usuário admininstrador [clique aqui](https://github.com/RobsonArita/filmes_api/blob/main/docs/users.md).

## Endpoints

Foram adicionados ao ambiente Postman, todos os endpoints juntamente com os casos de exemplo de envio e exemplo de retorno.

Endpoints no postman:
[Filmes API.postman_collection.json](https://github.com/user-attachments/files/16488393/Filmes.API.postman_collection.json)
