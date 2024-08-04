## Genres

### Parte 3 - Serviçõ Externo Temas

Módulo responsável pela adminstração dos gêneros de filmes.
Disponível um endpoints:

-   Listagem de temas;

Na criação de pacotes, existe uma verificação se os temas inseridos existem na base (mongo), sendo possível apenas criar pacotes com temas existentes.

#### Procedure
A procedure `CreateGenresProcedure` é responsável pela criação e atualização dos temas sincronizados com a API externa Filmes.

### Routine
A routine `SyncGenresRoutines` é responsável pela sincronização dos gêneros com a API externa Filmes.
A função executa é a mesma da procedure, tendo a única diferença, o cron job programado para realizar a verificação a cada duas horas.
