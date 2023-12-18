import { FastifyInstance } from 'fastify';

import PrismaLoginRepository from '@repositories/implementations/PrismaLoginRepository';
import PrismaPropostaRepository from '@repositories/implementations/PrismaPropostaRepository';
import PrismaPedidoRepository from '@repositories/implementations/PrismaPedidoRepository';
import PropostaGetManyController from './PedidoGetPropostasController';
import PropostaGetManyVerifications from './PedidoGetPropostasVerifications';
import PropostaGetManyCase from './PedidoGetPropostasCase';

const propostaGetMany = (server: FastifyInstance): PropostaGetManyController => {
  const loginRepository = new PrismaLoginRepository(server.prisma);
  const propostasRepository = new PrismaPropostaRepository(server.prisma);
  const pedidoRepository = new PrismaPedidoRepository(server.prisma);

  const propostaGetManyVerifications = new PropostaGetManyVerifications();

  const propostaGetManyCase = new PropostaGetManyCase(
    server,
    loginRepository,
    pedidoRepository,
    propostasRepository,
  );

  return new PropostaGetManyController(
    propostaGetManyVerifications,
    propostaGetManyCase,
  );
};

export default propostaGetMany;
