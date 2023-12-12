import { FastifyInstance } from 'fastify';

import PrismaLoginRepository from '@repositories/implementations/PrismaLoginRepository';
import PrismaServicoRepository from '@repositories/implementations/PrismaServicoRepository';
import PrismaPedidoRepository from '@repositories/implementations/PrismaPedidoRepository';
import ServicoPedirOrcamentoController from './ServicoPedirOrcamentoController';
import ServicoPedirOrcamentoVerification from './ServicoPedirOrcamentoVerification';
import ServicoPedirOrcamentoCase from './ServicoPedirOrcamentoCase';

const servicoPedirOrcamento = (server: FastifyInstance): ServicoPedirOrcamentoController => {
  const loginRepository = new PrismaLoginRepository(server.prisma);
  const servicosRepository = new PrismaServicoRepository(server.prisma);
  const pedidoRepository = new PrismaPedidoRepository(server.prisma);

  const servicoPedirOrcamentoVerifications = new ServicoPedirOrcamentoVerification();

  const servicoPedirOrcamentoCase = new ServicoPedirOrcamentoCase(
    server,
    loginRepository,
    servicosRepository,
    pedidoRepository,
  );

  return new ServicoPedirOrcamentoController(
    servicoPedirOrcamentoVerifications,
    servicoPedirOrcamentoCase,
  );
};

export default servicoPedirOrcamento;
