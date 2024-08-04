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

Em ambiente de desenvolvimento, basta criar um arquivo .env na raíz do projeto.
As propriedades de exemplo estão disponíveis no arquivo .env.example, também na raíz do projeto.

## Instalação

Para rodar a aplicação localmente:

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd filmes
2. Instale as dependências:
   ```bash
   yarn install
   ```
3. Inicie o servidor:
   ```bash
   yarn dev
   ```

## Execução com Docker

Para construir e iniciar a aplicação usando Docker:

```bash
docker-compose up --build
```

## Uso

A API oferece vários endpoints para gerenciar usuários, assinaturas de pacotes, listar filmes e emitir relatórios. A documentação completa dos endpoints estará disponível em breve.

## Endpoints

Os endpoints disponíveis incluem:

- **Usuários**: Criação, verificação de e-mail, obtenção, atualização e exclusão de usuários.
- **Assinaturas**: Gerenciamento de pacotes e temas.
- **Filmes**: Listagem de filmes de acordo com temas dos pacotes e armazenamento de filmes assistidos.
- **Relatórios**: Emissão de relatórios baseados em filmes assistidos.

## Autenticação

A API utiliza autenticação JWT para garantir que apenas usuários autorizados possam acessar certas funcionalidades.

## Detalhes
Para mais detalhes de implementação, acesse as documentações disponíveis no path /docs do repositório.
