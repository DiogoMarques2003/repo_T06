import { FastifySchema } from 'fastify';

const PropostaGetMany: FastifySchema = {
  description: 'Obter propostas',
  summary: 'Obter propostas',
  operationId: 'propostasGetMany',
  tags: ['Propostas'],
  params: {
    type: 'object',
    properties: {
      pedidoID: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Propostas selecionados com sucesso',
      type: 'object',
      properties: {
        servicos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              tiposServicoId: { type: 'string' },
              donoId: { type: 'string' },
              nome: { type: 'string' },
              descricao: { type: 'string' },
            },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para selecionar os propostas não são válidos',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      description: 'Credenciais inválidas',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Pedido não foi encontrado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export { PropostaGetMany };
