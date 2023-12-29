import { FastifyInstance } from 'fastify';

import PrismaLoginRepository from '@repositories/implementations/PrismaLoginRepository';
import PrismaPedidoRepository from '@repositories/implementations/PrismaPedidoRepository';
import PrismaServicoRepository from '@repositories/implementations/PrismaServicoRepository';
import PrismaPropostaRepository from '@repositories/implementations/PrismaPropostaRepository';
import PedidoCriarPropostaController from './PedidoCriarPropostaController';
import PedidoCriarPropostaVerifications from './PedidoCriarPropostaVerifications';
import PedidoCriarPropostaCase from './PedidoCriarPropostaCase';

const pedidoCriarProposta = (server: FastifyInstance): PedidoCriarPropostaController => {
  const loginRepository = new PrismaLoginRepository(server.prisma);
  const pedidoRepository = new PrismaPedidoRepository(server.prisma);
  const servicoRepository = new PrismaServicoRepository(server.prisma);
  const propostaRepository = new PrismaPropostaRepository(server.prisma);

  const pedidoCriarPropostaVerification = new PedidoCriarPropostaVerifications();

  const pedidoCriarPropostaCase = new PedidoCriarPropostaCase(
    server,
    loginRepository,
    pedidoRepository,
    servicoRepository,
    propostaRepository,
  );

  return new PedidoCriarPropostaController(
    pedidoCriarPropostaVerification,
    pedidoCriarPropostaCase,
  );
};

export default pedidoCriarProposta;
