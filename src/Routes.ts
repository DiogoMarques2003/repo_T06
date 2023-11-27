import { FastifyInstance } from 'fastify';

import RegisterDecoraters from '@handlers/RegisterDecoraters';

class Routes {
  async handle(server: FastifyInstance, opts: FastifyRoutesOptions, next: () => void):
  Promise<void> {
    await new RegisterDecoraters(server).handle();
    // Rota apenas para verificar se o servidor está a funcionar
    server.get('/', { schema: { hide: true } }, (req, res) => res.send({ message: 'Server Is working' }));

    next();
  }
}

export default Routes;
