import { FastifyInstance, FastifyRequest } from 'fastify';

import {
  PedidoCriarProposta,
  PedidoGetById,
  PropostaGetMany, ServicoCreate, ServicoGetMany, ServicoPedirOrcamento,
} from '@schemas/index';
import IServicoCreateDTO from '@useCases/Servico/Create/IServicoCreateDTO';
import IServicoGetManyDTO from '@useCases/Servico/GetMany/IServicoGetManyDTO';
import servicoCreate from '@useCases/Servico/Create';
import servicoGetMany from '@useCases/Servico/GetMany';
import IServicoPedirOrcamentoDTO from '@useCases/Servico/PedirOrcamento/IServicoPedirOrcamentoDTO';
import servicoPedirOrcamento from '@useCases/Servico/PedirOrcamento';
import IPedidoGetPropostasDTO from '@useCases/Pedido/GetPropostas/IPedidoGetPropostasDTO';
import propostaGetMany from '@useCases/Pedido/GetPropostas';
import IPedidoGetByIdDTO from '@useCases/Pedido/GetById/IPedidoGetByIdDTO';
import pedidoGeetById from '@useCases/Pedido/GetById';
import IPedidoCriarPropostaDTO from '@useCases/Pedido/CriarProposta/IPedidoCriarPropostaDTO';
import pedidoCriarProposta from '@useCases/Pedido/CriarProposta';

class Routes {
  handle(server: FastifyInstance, opts: FastifyRoutesOptions, next: () => void) {
    // Rota apenas para verificar se o servidor está a funcionar
    server.get('/', { schema: { hide: true } }, (req, res) => res.send({ message: 'Server Is working' }));

    server.post('/servico', { schema: ServicoCreate }, (req: FastifyRequest<IServicoCreateDTO>, res) => servicoCreate(server).handle(req, res));

    server.get('/servico', { schema: ServicoGetMany }, (req: FastifyRequest<IServicoGetManyDTO>, res) => servicoGetMany(server).handle(req, res));

    server.get('/pedido/:pedidoId/propostas', { schema: PropostaGetMany }, (req: FastifyRequest<IPedidoGetPropostasDTO>, res) => propostaGetMany(server).handle(req, res));

    server.post('/servico/:servicoId/pedir-orcamento', { schema: ServicoPedirOrcamento }, (req: FastifyRequest<IServicoPedirOrcamentoDTO>, res) => servicoPedirOrcamento(server).handle(req, res));

    server.get('/pedido/:pedidoID', { schema: PedidoGetById }, (req: FastifyRequest<IPedidoGetByIdDTO>, res) => pedidoGeetById(server).handle(req, res));

    server.post('/pedido/:pedidoID/proposta', { schema: PedidoCriarProposta }, (req: FastifyRequest<IPedidoCriarPropostaDTO>, res) => pedidoCriarProposta(server).handle(req, res));

    next();
  }
}

export default Routes;
