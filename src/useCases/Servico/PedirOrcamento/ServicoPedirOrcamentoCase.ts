import { FastifyInstance, FastifyRequest } from 'fastify';

import ILoginRepository from '@repositories/ILoginRepository';
import IPedidoRepository from '@repositories/IPedidoRepository';
import IServicoRepository from '@repositories/IServicoRepository';
import Pedidos from '@entities/Pedidos';
import AppError from '@errors/AppError';
import { verifyToken } from '@shared/index';
import { ACCOUNT_CLIENTE, PEDIDO_PENDENTE } from '@constants/index';
import IServicoPedirOrcamentoDTO from './IServicoPedirOrcamentoDTO';

class ServicoPedirOrcamentoCase {
  constructor(
    private server: FastifyInstance,
    private readonly loginRepository: ILoginRepository,
    private readonly servicoRepository: IServicoRepository,
    private readonly pedidoRepository: IPedidoRepository,
  ) {}

  async execute(req: FastifyRequest<IServicoPedirOrcamentoDTO>): Promise<Pedidos> {
    verifyToken(this.server, req);

    const { descricao } = req.body;
    const { servicoId } = req.params;
    const { userID } = req;

    const loginDB = await this.loginRepository.getByID(userID);
    if (!loginDB) throw new AppError('O utilizador não existe', 401);
    if (loginDB.type !== ACCOUNT_CLIENTE) throw new AppError('Somente clientes podem pedir orçamentos', 401);

    const servicoDB = await this.servicoRepository.getByID(servicoId);
    if (!servicoDB) throw new AppError('O serviço não existe', 404);

    const pedidoDB = await this.pedidoRepository.getByClienteAndServico(userID, servicoId);
    if (pedidoDB) throw new AppError('Já tens um pedido para este orçamento', 400);

    const pedido = new Pedidos({
      clienteId: userID, servicoId, descricao, status: PEDIDO_PENDENTE,
    });

    return this.pedidoRepository.create(pedido);
  }
}

export default ServicoPedirOrcamentoCase;
