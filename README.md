

## Libs utilizadas

### helmet

- Ajuda na segurança adicionando alguns HTTP response headers

### compression

- Reduz o tamanho dos dados enviados e recebidos pelo servidor, ajudando a melhorar o desempenho, pois os dados serão transmitidos mais rapidamente

### swagger

- Documentação das APIs

### typeorm

- Para bancos relacionais

### typeorm-transactional

- Uma lib para o TypeORM que permite a implementação de transações distribuídas em microservices

### mongoose

- Para bancos não relacionais

### @nestjs/cqrs

- Implementa o padrão Command Query Responsibility Segregation (CQRS), utilizado para separar as operações de leitura e escrita de um sistema. Permitindo desenhar sistemas mais robustos, flexíveis e escaláveis.

## Padrão de respostas

Sempre devolver mensagens em pt-BR, use ponto final nas frases.

### sucesso

```json
{
 "message": "Relatório criado com sucesso.",
 "data": {
  // Dados da resposta
 }
}
```

### erros

```json
{
 "message": "Erro no pedido.",
 "error": [
  {
   "field": "nome",
   "message": "O nome é obrigatório."
  },
  {
   "field": "email",
   "message": "O email é inválido."
  }
 ]
}
```

## Padrão de mensagens à serem publicadas na fila

```json
{
 "eventName": string,
 "payload": T,
 "eventVersion": number,
 "ocurredOn": new Date()
}
```

## Experiência de desenvolvimento

### ESLint Plugin Perfectionist

- Melhora a legibilidade, capacidade de manutenção, code review entre outras coisas.

### Repl

- [Read-Eval-Print-Loop (REPL)](https://docs.nestjs.com/recipes/repl)
