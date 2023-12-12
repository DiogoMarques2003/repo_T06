import { FastifyInstance, FastifyRequest } from 'fastify';

import { ServicoCreate, ServicoGetMany, ServicoPedirOrcamento } from '@schemas/index';
import IServicoCreateDTO from '@useCases/Servico/Create/IServicoCreateDTO';
import IServicoGetManyDTO from '@useCases/Servico/GetMany/IServicoGetManyDTO';
import servicoCreate from '@useCases/Servico/Create';
import servicoGetMany from '@useCases/Servico/GetMany';
import IServicoPedirOrcamentoDTO from '@useCases/Servico/PedirOrcamento/IServicoPedirOrcamentoDTO';
import servicoPedirOrcamento from '@useCases/Servico/PedirOrcamento';

class Routes {
  handle(server: FastifyInstance, opts: FastifyRoutesOptions, next: () => void) {
    // Rota apenas para verificar se o servidor está a funcionar
    server.get('/', { schema: { hide: true } }, (req, res) => res.send({ message: 'Server Is working' }));

    server.post('/servico', { schema: ServicoCreate }, (req: FastifyRequest<IServicoCreateDTO>, res) => servicoCreate(server).handle(req, res));

    server.get('/servico', { schema: ServicoGetMany }, (req: FastifyRequest<IServicoGetManyDTO>, res) => servicoGetMany(server).handle(req, res));

    server.post('/servico/:servicoId/pedir-orcamento', { schema: ServicoPedirOrcamento }, (req: FastifyRequest<IServicoPedirOrcamentoDTO>, res) => servicoPedirOrcamento(server).handle(req, res));

    next();
  }
}

export default Routes;
