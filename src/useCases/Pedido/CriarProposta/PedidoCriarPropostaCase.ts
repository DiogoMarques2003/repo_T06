import { FastifyInstance, FastifyRequest } from 'fastify';

import ILoginRepository from '@repositories/ILoginRepository';
import AppError from '@errors/AppError';
import { verifyToken } from '@shared/token';
import IPedidoRepository from '@repositories/IPedidoRepository';
import IServicoRepository from '@repositories/IServicoRepository';
import {
  ACCOUNT_OPERATOR, PEDIDO_PENDENTE, PEDIDO_CANCELADO, PEDIDO_EM_REAVALIACAO,
} from '@constants/index';
import Proposta from '@entities/Proposta';
import IPropostaRepository from '@repositories/IPropostaRepository';
import IPedidoCriarPropostaDTO from './IPedidoCriarPropostaDTO';

class PedidoCriarPropostaCase {
  constructor(
    private server: FastifyInstance,
    private loginRepository: ILoginRepository,
    private pedidoRepository: IPedidoRepository,
    private servicoRepository: IServicoRepository,
    private propostaRepository: IPropostaRepository,
  ) {}

  async execute(req: FastifyRequest<IPedidoCriarPropostaDTO>): Promise<Proposta | boolean> {
    const { pedidoID } = req.params;
    const {
      valor,
      descricao,
      aceito,
    } = req.body;

    verifyToken(this.server, req);

    const login = await this.loginRepository.getByID(req.userID);
    if (!login) throw new AppError('O utilizador não existe', 401);

    if (login.type !== ACCOUNT_OPERATOR) throw new AppError('Apenas operadores podem fazer propostas', 401);

    const pedidoDB = await this.pedidoRepository.getByID(pedidoID);
    if (!pedidoDB) throw new AppError('O pedido não existe', 404);
    if (pedidoDB.status !== PEDIDO_PENDENTE) throw new AppError('O pedido não está pendente', 400);

    const servicoDB = await this.servicoRepository.getByID(pedidoDB.servicoId);
    if (!servicoDB) throw new AppError('O serviço não existe', 404);
    if (servicoDB.donoId !== req.userID) throw new AppError('Este pedido não é para um serviço teu', 401);

    if (!aceito) {
      pedidoDB.status = PEDIDO_CANCELADO;
      await this.pedidoRepository.update(pedidoDB);
      return false;
    }

    const proposta = new Proposta({
      pedidoID,
      valor,
      descricao,
      status: PEDIDO_PENDENTE,
    });

    const propostaDB = await this.propostaRepository.criar(proposta);

    pedidoDB.status = PEDIDO_EM_REAVALIACAO;

    await this.pedidoRepository.update(pedidoDB);

    return propostaDB;
  }
}

export default PedidoCriarPropostaCase;
