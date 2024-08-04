## Users

### Parte 1 - Usuários

Módulo responsável pela criação e autenticação do usuário da API.
Disponível cinco endpoints:

-   Criação de usuário;
-   Signin;
-   Enviar token para troca de senha;
-   Trocar senha;
-   Listagem de usuários.

#### Troca de senha
O endpoint de troca de senha envia um email com a url contendo a token para a troca de senha, necessária na alteração de senha.
Em ambiente de desenvolvimento, a própria token de troca de senha é retornada pelo endpoint.

#### Usuario admininstrador
O usuário admininstrador é um usuário criado automaticamente via inicialização da API a partir da procedure `CreateUsersProcedure`

Por padrão, as credências do usuário admininstrador são:
email: 'admin_user@robsonapi.com'
password: 'mock'

A listagem de usuários é um recurso liberado apenas pelo usuário admininstrador.