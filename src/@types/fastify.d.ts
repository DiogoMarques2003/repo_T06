import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    env: NodeJS.ProcessEnv;
  }

  interface FastifyRequest {
    userID?: string;
    pdfFilePath?: string;
  }
}
