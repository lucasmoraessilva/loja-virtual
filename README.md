# API loja-virtual

Uma API desenvolvida em Node.js e MongoDB para gerenciar uma loja virtual e ter a representação online do seu negócio.

# Sumaŕio

* [Objetivo](https://github.com/lucasmoraessilva/loja-virtual#Objetivo)
* [Visão de negócio](https://github.com/lucasmoraessilva/loja-virtual#Visão-de-negócios)
* [Detalhes técnicos](https://github.com/lucasmoraessilva/loja-virtual#Detalhes-técnicos)
  * [Tecnologias](https://github.com/lucasmoraessilva/loja-virtual#Tecnologias)
  * [Dependências](https://github.com/lucasmoraessilva/loja-virtual#Dependências)
  * [Árvore de diretórios](https://github.com/lucasmoraessilva/loja-virtual#Árvore-de-diretórios)
  * [Rotas e requisições](https://github.com/lucasmoraessilva/loja-virtual#Rotas-e-requisições)

# Objetivo

Com a alta demanda pela aquisição e prestação de serviços online, possuir uma representação digital dos negócios tornou-se importante, podendo dividir os que permanecem no mercado e os que ficam para trás.

Tendo isso em mente, o projeto oferece uma forma de gerenciar produtos de uma forma simples e ágil, permitindo ao seus consumidores verificarem os produtos disponíveis e seus detalhes.

# Visão de negócios

A ideia central é administrar os produtos disponíveis para o cliente.

No sistema, há um usuário com o perfil de administrador (Vendedor) que é capaz de gerenciar os produtos que são exibidos no site, podendo listar, inserir, alterar e deletar produtos de sua loja.

Há outras funcionalidades que serão adicionadas ao projeto, porém esta é a função principal e que está disponível no momento.

# Detalhes técnicos

Nas seções anteriores são apresentadas informaçẽos que motivaram a criação do projeto e quais necessidades ele busca suprir.

Aqui você encontra os detalhes sobre a forma que o projeto foi implementado e informações muito __interessantes para desenvolvedores de software__.

## Tecnologias

A principais tecnologias usadas no projeto são:

* Node.js (18.12)
* TypeScript (4.9)
* MongoDB Atlas Database

## Dependências

As principais dependências do projeto são:

* Express (4.18)
* Express-validator (6.14)
* Dotenv (16.0)
* Mongoose (6.8)

As tecnologias e dependências acima formam os requisitos básicos para a execução do projeto. Sem qualquer um desses itens, o projeto pode apresentar falhas de execução.

## Árvore de diretórios
```
loja-virtual
|
|  .gitignore
|  config.env
|
|--dist
|  | *.js
|
|--node_modules
|  | Node.js libs
|
|--package.json
|--package-lock.json
|--README.md
|
|--src
|  |  app.ts
|  |  server.ts
|  |
|  |--controllers
|  |  |  ProdutoController.ts
|  |  |  UsuarioController.ts
|  |
|  |--database
|  |  |  ProdutoDatabase.ts
|  |  |  UsuarioDatabase.ts
|  |
|  |--enums
|  |  |  StatusProduto.ts
|  |
|  |--models
|  |  |  Produto.ts
|  |  |  Usuario.ts
|  |  |  Vendedor.ts
|  |
|  |--routes
|  |  |  ProdutoRoutes.ts
|  |  |  UsuarioRoutes.ts
|
|  tsconfig.json
```

## Rotas e requisições

Retorno padrão:

Sucessos - um objeto com as propriedades *status* e *data*. Data é um objeto que encapsula os dados de resposta da requisição.

Erro - um objeto com as propriedades *status* e *data*. Data é um objeto que encapsula os dados de resposta da requisição, nesse caso, o erro da requisição.

Erros múltiplos - um objeto com as propriedades *status* e *data*. Data encapsula uma lista com os erros da requisição.

`POST - /api/v1/usuarios/login` é um endpoint de autenticação e fornecimento de chave de autorização. O processo de autorização e autenticação não está completo.

`GET - /api/v1/produtos` retorna a lista de produtos disponíveis para a visualização dos compradores. Em caso de erro retorna status 500 e uma mensagem informando que não foi possível processar a requisição.

`POST - /api/v1/produtos` adiciona um novo produto a loja. Os dados do produto devem ser informados no *body* da requisição. Retorna os dados adicionados no banco de dados com status 201. Em caso de erro retorna 400 e o erro que ocorreu.

`GET - /api/v1/produtos/:uid` retorna os dados de um único produto. É necessário informar o uid do produto na URI da requisição. Em caso de sucesso, retorna os dados com status 200, em caso de falhas retorna 400 e a mensagem do erro.

`PATCH - /api/v1/produtos/:uid` atualiza os dados de um produto com base no *body* da requisição. O uid é obrigatório para identificar o produto a ser atualizado. Retorna status 204 em casos de sucesso. Se falhar, retorna 400 e a mensagem do erro.

`PUT - /api/v1/produtos/:uid` atualiza os dados de um produto. É necessário enviar todos os campos no *body* da requisição. O uid é obrigatório para identificar o produto a ser atualizado. Retorna 204 em casos de sucesso, já em casos de falha retorna 400 e a mensagem do erro.

`DELETE - /api/v1/produtos/:uid` deleta os dados de um produto. O uid é obrigatório para identificar o produto a ser deletado. Retorna 204 em casos de sucesso e 400 em casos de falhas, junto com a mensagem de erro.