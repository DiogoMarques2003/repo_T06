import { FastifyReply, FastifyRequest } from 'fastify';

import IPedidoGetByIdDTO from './IPedidoGetByIdDTO';
import PedidoGetByIdCase from './PedidoGetByIdCase';
import PedidoGetByIdVerifications from './PedidoGetByIdVerifications';

class PedidoGetByIdController {
  constructor(
    private pedidoGetByIdVerifications: PedidoGetByIdVerifications,
    private pedidoGetByIdCase: PedidoGetByIdCase,
  ) {}

  async handle(req: FastifyRequest<IPedidoGetByIdDTO>, res: FastifyReply) {
    this.pedidoGetByIdVerifications.execute(req);

    const pedido = await this.pedidoGetByIdCase.execute(req);

    return res.status(200).send({
      message: 'Pedido obtido com sucesso',
      pedido,
    });
  }
}

export default PedidoGetByIdController;
