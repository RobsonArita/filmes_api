## Movies

### Parte 4 - Serviço Externo Filmes
### Parte 5 - Filmes assistidos

Módulo responsável pelo gerenciamento dos filmes.
Disponível quatro endpoints:

-   Listagem de filmes;
-   Marcar assistido ao filme;
-   Desmarcar assistido ao filme;
-   Relatórios;

#### Listagem de filmes
O endpoint listagem de filmes retorna apenas os filmes em que o usuário (autenticado) tem acesso, baseado nos temas dos pacotes liberados.

#### Marcar/Desmarcar assistido ao filme
Apenas os filmes com os temas liberados nos pacotes do usuário (autenticado) podem ser marcados/desmarcados.

O endpoint realiza a marcação na collection (mongo) `UserMovies`.
Nela existe a relação entre o usuário e os filmes assistidos.
Com essa relação, é possível gerar os relatórios.

#### Relatórios
Endpoint liberado apenas pelo usuário admininstrador.
É gerado uma listagem de relatórios dos usuários a partir da collection (mongo) `UserMovies`

#### Usuario admininstrador
O usuário admininstrador é um usuário criado automaticamente via inicialização da API a partir da procedure `CreateUsersProcedure`

Por padrão, as credências do usuário admininstrador são:
email: 'admin_user@robsonapi.com'
password: 'mock'

A admininstração do pacote é um recurso liberado apenas pelo usuário admininstrador.
