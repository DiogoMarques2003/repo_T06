import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/verifications';
import IPedidoCriarPropostaDTO from './IPedidoCriarPropostaDTO';

class PedidoCriarPropostaVerifications {
  execute(req: FastifyRequest<IPedidoCriarPropostaDTO>) {
    const {
      pedidoID,
    } = req.params;

    const {
      valor,
      descricao,
      aceito,
    } = req.body;

    if (typeof pedidoID !== 'string' && verifyUUID(pedidoID)) throw new AppError('ID do pedido inválido', 400);

    if (typeof aceito !== 'boolean') throw new AppError('Aceito inválido', 400);

    if (aceito && (typeof valor !== 'number' || valor <= 0)) throw new AppError('Valor inválido', 400);

    if (aceito && typeof descricao !== 'string') throw new AppError('Descrição inválida', 400);
  }
}

export default PedidoCriarPropostaVerifications;
