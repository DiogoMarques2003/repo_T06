No backend iremos usar uma arquitetura SOLID, que separa cada rota por um caso de uso. É também, separado tudo o que é externo da API e é alterável, para assim so ser necessário modificar em um lugar e ja ficar na API toda.

Para geração de id iremos usar o UUID v4, pois dessa forma conseguimos ver se o id que o utilizador está a passar no request é um id valido.

Para todos estarmos a usar o mesmo padrão de código devemos instalar as seguintes extensões no vscode:
![Alt text](./.github/images/eslint.png)

Antes de executar a api ou sempre que for feita alguma alteração na base de dados é preciso usar o comando `yarn prisma migrate dev`

A documentação da api está toda disponível neste [link](http://localhost:3333/api/doc)