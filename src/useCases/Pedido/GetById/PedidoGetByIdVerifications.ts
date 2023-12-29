import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/verifications';
import IPedidoGetByIdDTO from './IPedidoGetByIdDTO';

class PedidoGetByIdVerifications {
  execute(req: FastifyRequest<IPedidoGetByIdDTO>) {
    const {
      pedidoID,
    } = req.params;

    if (typeof pedidoID !== 'string' && verifyUUID(pedidoID)) throw new AppError('ID do pedido inválido', 400);
  }
}

export default PedidoGetByIdVerifications;
