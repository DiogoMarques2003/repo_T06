import { FastifyInstance, FastifyRequest } from 'fastify';

import { ServicoCreate } from '@schemas/index';
import IServicoCreateDTO from '@useCases/Servico/Create/IServicoCreateDTO';
import servicoCreate from '@useCases/Servico/Create';

class Routes {
  handle(server: FastifyInstance, opts: FastifyRoutesOptions, next: () => void) {
    // Rota apenas para verificar se o servidor está a funcionar
    server.get('/', { schema: { hide: true } }, (req, res) => res.send({ message: 'Server Is working' }));

    server.post('/servico', { schema: ServicoCreate }, (req: FastifyRequest<IServicoCreateDTO>, res) => servicoCreate(server).handle(req, res));

    next();
  }
}

export default Routes;
