import { FastifyInstance, FastifyRequest } from 'fastify';

import ILoginRepository from '@repositories/ILoginRepository';
import AppError from '@errors/AppError';
import { verifyToken } from '@shared/token';
import IPedidoRepository from '@repositories/IPedidoRepository';
import Pedidos from '@entities/Pedidos';
import IServicoRepository from '@repositories/IServicoRepository';
import { ACCOUNT_OPERATOR } from '@constants/index';
import IPedidoGetByIdDTO from './IPedidoGetByIdDTO';

class PedidoGetByIdCase {
  constructor(
    private server: FastifyInstance,
    private loginRepository: ILoginRepository,
    private pedidoRepository: IPedidoRepository,
    private servicoRepository: IServicoRepository,
  ) {}

  async execute(req: FastifyRequest<IPedidoGetByIdDTO>): Promise<Pedidos> {
    const { pedidoID } = req.params;

    verifyToken(this.server, req);

    const login = await this.loginRepository.getByID(req.userID);
    if (!login) throw new AppError('O utilizador não existe', 401);

    if (login.type !== ACCOUNT_OPERATOR) throw new AppError('Apenas operadores podem ver pedidos', 401);

    const pedidoDB = await this.pedidoRepository.getByID(pedidoID);
    if (!pedidoDB) throw new AppError('O pedido não existe', 404);

    const servicoDB = await this.servicoRepository.getByID(pedidoDB.servicoId);
    if (!servicoDB) throw new AppError('O serviço não existe', 404);
    if (servicoDB.donoId !== req.userID) throw new AppError('Este pedido não é para um serviço teu', 401);

    return pedidoDB;
  }
}

export default PedidoGetByIdCase;
