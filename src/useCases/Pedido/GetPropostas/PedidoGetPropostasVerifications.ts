import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/verifications';
import IPedidoGetPropostasDTO from './IPedidoGetPropostasDTO';

class PedidoGetPropostasVerifications {
  execute(req: FastifyRequest<IPedidoGetPropostasDTO>) {
    const {
      pedidoId,
    } = req.params;

    if (pedidoId && verifyUUID(pedidoId)) throw new AppError('ID de pedido inválido', 400);
  }
}

export default PedidoGetPropostasVerifications;
