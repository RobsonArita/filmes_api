## Packages

### Parte 2 - Pacotes

Módulo responsável pela criação e gerenciamneot de pacotes.
Disponível cinco endpoints:

-   Criação de pacote;
-   Listagem de pacotes;
-   Adicionar usuário a um pacote;
-   Remover usuário de um pacote;
-   Atualizar pacote.

#### Usuario admininstrador
O usuário admininstrador é um usuário criado automaticamente via inicialização da API a partir da procedure `CreateUsersProcedure`

Por padrão, as credências do usuário admininstrador são:
email: 'admin_user@robsonapi.com'
password: 'mock'

A admininstração do pacote é um recurso liberado apenas pelo usuário admininstrador.