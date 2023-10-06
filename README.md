# Superlógica
## Code Challenge Back-end

## Resumo
Desenvolvimento de uma api para controle de entrada e saída de visitantes em condomínios.

A aplicação é capaz de cadastrar, listar, atualizar e deletar um visitante no sistema.

Listar os condomínios e unidades, mostrando a relação entre eles.

Realizar o processo de liberação da entrada de um visitante em certo condomínio e unidade, lista as movimentações dos visitantes em cada unidade e realiza a baixa da saída do visitante.

![modelagem_bd](https://github.com/Tamyrescso/superlogica/blob/master/images/db_model.png)

## Especificações técnicas
  - API desenvolvida em NestJS com typescript.
  - Banco de dados PostgreSQL.
  - ORM Prisma.
  - A aplicação roda no Docker.
  - Usa o Swagger para facilitar o teste e documentação.
  - O banco de dados é randomicamente populado utilizando o Faker (exceto tabela de entrada/saída).
  - Os dados do body são validados utilizando class-validator.
  - Foram desenvolvidos testes unitários utilizando Jest.

![cobertura_testes](https://github.com/Tamyrescso/superlogica/blob/master/images/test_coverage.png)

## Utilização
  - Clonar o repositório.
  - Na pasta raiz utilizando o terminal rode `docker compose up --build` ou `docker-compose up --build` (depende do compose instalado na máquina local). O comando irá subir o PostgresSQL, rodar a migration, rodar os seeds e subir a aplicação.
    > Obs.: O arquivo `.env` já está no repositório com a variável necessária.
  - Para rodar os testes é só acessar o bash do container e rodar `yarn test`.
  - A aplicação estará disponível em `http://localhost:3000`.
  - Para utilizar o Swagger é só acessar `http://localhost:3000/api`

## Rotas

### Visitantes
**/visitors, POST**
> Cadastra um visitante no sistema.

**/visitors, GET**
> Retorna os dados de todos os visitantes cadastrados.

**/visitors/:id, GET**
> Retorna os dados de um visitante específico, procurado por id.

**/visitors/:id, PATCH**
> Atualiza o cadastro de um visitante específico.

**/visitors/:id, DELETE**
> Deleta o cadastro de um visitante específico.

### Unidades
**/units, GET**
> Retorna os dados de todas as unidades cadastradas no sistema e a qual condominio cada uma está vinculada.

**/units/:id, GET**
> Retorna os dados uma unidade específica.

### Condomínios
**/condos, GET**
> Retorna os dados de todos os condomínios cadastrados no sistema.

**/condos/:id, GET**
> Retorna os dados de um condomínio específico.

### Registro de movimentação dos visitantes
**/visitors-log/check-in, POST**
> Registra a entrada de um visitante em uma determinada unidade e condomínio. É verificada a existência desse condomínio, unidade e visitante no sistema. É verificada se a unidade apontada realmente pertence ao condomínio especificado. E, é feita uma verificação para ver se existe alguma entrada sem saída desse visitante, nessa ou em outra unidade.

**/visitors-log, GET**
> Retorna todos os registros de movimentação de visitantes, mostra todos os dados de cada visitante, condomínio e unidade, assim como a data e hora da entrada e saída (se houver).

**/visitors-log/:id, GET**
> Retorna um registro de movimentação específico, mostra todos os dados completos do visitante, condomínio e unidade, assim como a data e hora da entrada e saída (se houver).

**/visitors-log/check-out, PATCH**
> Registra a saída de um visitante em uma determinada unidade e condomínio. É verificada a existência do registro de entrada no sistema. E, é realizada uma verificação se esse registro já possui baixa no sistema.

Para maiores informações sobre dto, entity e padrões de request/response, por favor, consultar a aplicação pelo Swagger.

## Pontos a melhorar:
  - Implementar um soft delete para os registros de entrada/saída. Como é uma informação crítica para a segurança do condomínio é importante que não possa ser atualizada ou deletada definitivamente.
  - Criar um endpoint de retorno de movimentações baseada no id do visitante. Caso aconteça o erro de não ter feito checkout e quer fazer um novo checkin, facilitaria para consultar.
  - Criar testes de integração e/ou e2e.
