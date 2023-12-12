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
      description: 'Serviço criado com sucesso',
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
      description: 'Dados para criar o serviço inválidos',
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

const ServicoGetMany: FastifySchema = {
  description: 'Obter serviços',
  summary: 'Obter serivços',
  operationId: 'servicoGetMany',
  tags: ['Serviços'],
  querystring: {
    type: 'object',
    properties: {
      nome: { type: 'string' },
      descricao: { type: 'string' },
      tiposServicoId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Serviços selecionados com sucesso',
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
      description: 'Dados para selecionar os anuncios não são válidos',
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

const ServicoPedirOrcamento: FastifySchema = {
  description: 'Pedir orçamento a um serviço',
  summary: 'Pedir orçamento a um serviço',
  operationId: 'servicoPedirOrcamento',
  tags: ['Serviços'],
  params: {
    type: 'object',
    properties: {
      servicoId: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      descricao: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Pedido do serviço criado com sucesso',
      type: 'object',
      properties: {
        pedido: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            servicoId: { type: 'string' },
            clienteId: { type: 'string' },
            status: { type: 'string' },
            descricao: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para criar o pedido do serviço inválidos',
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
      description: 'O serviço não existe',
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

export { ServicoCreate, ServicoGetMany, ServicoPedirOrcamento };
