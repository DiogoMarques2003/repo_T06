import { FastifyInstance } from 'fastify';

import PrismaLoginRepository from '@repositories/implementations/PrismaLoginRepository';
import PrismaTiposServicoRepository from '@repositories/implementations/PrismaTiposServicoRepository';
import PrismaServicoRepository from '@repositories/implementations/PrismaServicoRepository';
import ServicoCreateController from './ServicoCreateController';
import ServicoCreateVerifications from './ServicoCreateVerifications';
import ServicoCreateCase from './ServicoCreateCase';

const servicoCreate = (server: FastifyInstance): ServicoCreateController => {
  const loginRepository = new PrismaLoginRepository(server.prisma);
  const tiposServicoRepository = new PrismaTiposServicoRepository(server.prisma);
  const servicosRepository = new PrismaServicoRepository(server.prisma);

  const servicoCreateVerifications = new ServicoCreateVerifications();

  const servicoCreateCase = new ServicoCreateCase(
    server,
    loginRepository,
    tiposServicoRepository,
    servicosRepository,
  );

  return new ServicoCreateController(
    servicoCreateVerifications,
    servicoCreateCase,
  );
};

export default servicoCreate;
