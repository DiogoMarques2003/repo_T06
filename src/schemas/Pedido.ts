import { FastifySchema } from 'fastify';

const PropostaGetMany: FastifySchema = {
  description: 'Obter propostas de um pedido',
  summary: 'Obter propostas de um pedido',
  operationId: 'propostasGetMany',
  tags: ['Pedidos'],
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

const PedidoGetById: FastifySchema = {
  description: 'Obter um pedido pelo seu id',
  summary: 'Obter  um pedido pelo seu id',
  operationId: 'pedidoGetById',
  tags: ['Pedidos'],
  params: {
    type: 'object',
    properties: {
      pedidoID: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Pedido selecionado com sucesso',
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
      description: 'Dados para selecionar os pedido não são válidos',
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

const PedidoCriarProposta: FastifySchema = {
  description: 'Criar uma proposta para o pedido ou recusar o pedido',
  summary: 'Criar uma proposta para o pedido ou recusar o pedido',
  operationId: 'pedidoCriarProposta',
  tags: ['Pedidos'],
  params: {
    type: 'object',
    properties: {
      pedidoID: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      valor: { type: 'number' },
      descricao: { type: 'string' },
      aceito: { type: 'boolean' },
    },
  },
  response: {
    200: {
      description: 'Pedido recusado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    201: {
      description: 'Proposta criada com sucesso',
      type: 'object',
      properties: {
        proposta: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            pedidoID: { type: 'string' },
            descricao: { type: 'string' },
            valor: { type: 'number' },
            status: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Dados para criar a proposta não são válidos',
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

export { PropostaGetMany, PedidoGetById, PedidoCriarProposta };
