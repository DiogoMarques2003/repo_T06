import { FastifyInstance } from 'fastify';

import PrismaLoginRepository from '@repositories/implementations/PrismaLoginRepository';
import PrismaTiposServicoRepository from '@repositories/implementations/PrismaTiposServicoRepository';
import PrismaServicoRepository from '@repositories/implementations/PrismaServicoRepository';
import ServicoGetManyController from './ServicoGetManyController';
import ServicoGetManyVerifications from './ServicoGetManyVerifications';
import ServicoGetManyCase from './ServicoGetManyCase';

const servicoGetMany = (server: FastifyInstance): ServicoGetManyController => {
  const loginRepository = new PrismaLoginRepository(server.prisma);
  const tiposServicoRepository = new PrismaTiposServicoRepository(server.prisma);
  const servicosRepository = new PrismaServicoRepository(server.prisma);

  const servicoGetManyVerifications = new ServicoGetManyVerifications();

  const servicoGetManyCase = new ServicoGetManyCase(
    server,
    loginRepository,
    tiposServicoRepository,
    servicosRepository,
  );

  return new ServicoGetManyController(
    servicoGetManyVerifications,
    servicoGetManyCase,
  );
};

export default servicoGetMany;
