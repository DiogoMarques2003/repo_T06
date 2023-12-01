import { FastifySchema } from 'fastify';

const ServicoCreate: FastifySchema = {
  description: 'Cria um novo serviço',
  summary: 'Cria um novo serviço',
  operationId: 'servicoCreate',
  tags: ['Serviços'],
  body: {
    type: 'object',
    properties: {
      nome: { type: 'string' },
      descricao: { type: 'string' },
      tiposServicoId: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Anuncio criado com sucesso',
      type: 'object',
      properties: {
        servico: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            tiposServicoId: { type: 'string' },
            donoId: { type: 'string' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para criar o anuncio inválidos',
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
      description: 'Tipo de serviço fornecido não existe',
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

export { ServicoCreate };
