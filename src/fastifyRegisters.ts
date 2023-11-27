import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

import {
  optionsCors, optionsEnv, optionsJWT, swaggerOptions, swaggerUIOptions,
} from '@config/fastifyConfig';
import errorHandler from '@handlers/errorHandler';
import notFoundHandler from '@handlers/notFoundHandler';
import prismaPlugin from '@customPlugins/prismaPlugin';
import Routes from './Routes';

const fastify = Fastify({
  logger: { transport: { target: 'pino-pretty', options: { translateTime: 'dd/mm/yyyy HH:MM:ss Z' } } },
  ignoreTrailingSlash: true,
  trustProxy: true,
  bodyLimit: 1024 * 1024 * 1, // 1MB de limite no body
});

async function registerFastify(): Promise<FastifyInstance> {
  await fastify.register(fastifyEnv, optionsEnv);
  fastify.log.info('Env loaded');

  fastify.setErrorHandler((error, req, res) => errorHandler(error, req, res));

  fastify.setNotFoundHandler((req, res) => notFoundHandler(req, res));

  await fastify.register(prismaPlugin);
  fastify.log.info('Prisma carregado');

  await fastify.register(fastifyJwt, optionsJWT(fastify));
  fastify.log.info('JWT carregado');

  await fastify.register(fastifyCors, optionsCors);
  fastify.log.info('CORS carregado');

  await fastify.register(fastifySwagger, swaggerOptions);
  fastify.log.info('Swagger carregado');

  await fastify.register(new Routes().handle, { prefix: '/api' } as FastifyRoutesOptions);
  fastify.log.info('Fastify Routes carregado');

  await fastify.register(fastifySwaggerUI, swaggerUIOptions);
  fastify.log.info('Swagger UI carregado');

  return fastify;
}

export default registerFastify;
