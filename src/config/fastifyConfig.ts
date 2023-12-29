import { FastifyInstance } from 'fastify';
import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyEnvOptions } from '@fastify/env';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { SwaggerOptions } from '@fastify/swagger';
import { FastifyJWTOptions } from '@fastify/jwt';

import { DOCS_PATH } from '@constants/index';

const optionsCors: FastifyCorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-for'],
  credentials: true,
  maxAge: 86400,
};

const envSchema: FastifyEnvSchema = {
  type: 'object',
  required: ['JWT'],
  properties: {
    PORT: { type: 'number', default: 3333 },
    HOST: { type: 'string', default: '0.0.0.0' },
    JWT: { type: 'string' },
  },
  additionalProperties: false,
};

const optionsEnv: FastifyEnvOptions = {
  confKey: 'env',
  schema: envSchema,
  dotenv: true,
};

const optionsJWT = (server: FastifyInstance): FastifyJWTOptions => {
  const options: FastifyJWTOptions = {
    secret: server.env.JWT,
  };

  return options;
};

const swaggerOptions: SwaggerOptions = {
  mode: 'dynamic',
  swagger: {
    info: {
      title: 'Serviços de manutenção',
      description: 'Serviços de manutenção',
      version: '0.0.1-beta',
    },
    externalDocs: {
      url: 'https://github.com/DiogoMarques2003/repo_T06/wiki',
      description: 'Wiki Github',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    host: process.env.NODE_ENV === 'production' ? 'productionURL.pt' : 'localhost:3333',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
    tags: [
      { name: 'Serviços', description: 'Rotas para os Serviços' },
      { name: 'Pedidos', description: 'Rotas para os Pedidos' },
    ],
    securityDefinitions: {
      authorization: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Token de autorização a api, exemplo: "Bearer TOKEN"',
      },
    },
    security: [{ authorization: [] }],
  },
};

const swaggerUIOptions: FastifySwaggerUiOptions = {
  routePrefix: DOCS_PATH,
  uiConfig: {
    deepLinking: true,
    persistAuthorization: true,
  },
  uiHooks: {
    onRequest(request, reply, next) { next(); },
    preHandler(request, reply, next) { next(); },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => swaggerObject,
  transformSpecificationClone: true,
};

export {
  optionsCors, optionsEnv, optionsJWT,
  swaggerOptions, swaggerUIOptions,
};
