import { FastifyInstance } from 'fastify';

import PrismaLoginRepository from '@repositories/implementations/PrismaLoginRepository';
import PrismaPedidoRepository from '@repositories/implementations/PrismaPedidoRepository';
import PrismaServicoRepository from '@repositories/implementations/PrismaServicoRepository';
import PedidoGetByIdController from './PedidoGetByIdController';
import PedidoGetByIdVerifications from './PedidoGetByIdVerifications';
import PedidoGetByIdCase from './PedidoGetByIdCase';

const pedidoGeetById = (server: FastifyInstance): PedidoGetByIdController => {
  const loginRepository = new PrismaLoginRepository(server.prisma);
  const pedidoRepository = new PrismaPedidoRepository(server.prisma);
  const servicoRepository = new PrismaServicoRepository(server.prisma);

  const pedidoGetByIdVerifications = new PedidoGetByIdVerifications();

  const pedidoGetByIdCase = new PedidoGetByIdCase(
    server,
    loginRepository,
    pedidoRepository,
    servicoRepository,
  );

  return new PedidoGetByIdController(
    pedidoGetByIdVerifications,
    pedidoGetByIdCase,
  );
};

export default pedidoGeetById;
