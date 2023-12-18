import { FastifyInstance, FastifyRequest } from 'fastify';

import Proposta from '@entities/Proposta';
import ILoginRepository from '@repositories/ILoginRepository';
import IPropostaRepository from '@repositories/IPropostaRepository';
import AppError from '@errors/AppError';
import { verifyToken } from '@shared/token';
import IPedidoRepository from '@repositories/IPedidoRepository';
import IPedidoGetPropostasDTO from './IPedidoGetPropostasDTO';

class PedidoGetPropostasCase {
  constructor(
    private server: FastifyInstance,
    private loginRepository: ILoginRepository,
    private pedidoRepository: IPedidoRepository,
    private propostaRepository: IPropostaRepository,
  ) {}

  async execute(req: FastifyRequest<IPedidoGetPropostasDTO>): Promise<Proposta[]> {
    const { pedidoId } = req.params;

    verifyToken(this.server, req);

    const login = await this.loginRepository.getByID(req.userID);
    if (!login) throw new AppError('O utilizador não existe', 401);

    const pedidoDB = await this.pedidoRepository.getByID(pedidoId);
    if (!pedidoDB) throw new AppError('O pedido não existe', 404);

    if (pedidoDB.clienteId !== req.userID) throw new AppError('Este pedido não é teu', 401);

    return this.propostaRepository.getByPedido(pedidoId);
  }
}

export default PedidoGetPropostasCase;
