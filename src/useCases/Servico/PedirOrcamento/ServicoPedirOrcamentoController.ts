import { FastifyReply, FastifyRequest } from 'fastify';

import ServicoPedirOrcamentoCase from './ServicoPedirOrcamentoCase';
import ServicoPedirOrcamentoVerification from './ServicoPedirOrcamentoVerification';
import IServicoPedirOrcamentoDTO from './IServicoPedirOrcamentoDTO';

class ServicoPedirOrcamentoController {
  constructor(
    private servicoPedirOrcamentoVerifications: ServicoPedirOrcamentoVerification,
    private servicoPedirOrcamentoCase: ServicoPedirOrcamentoCase,
  ) {}

  async handle(req: FastifyRequest<IServicoPedirOrcamentoDTO>, res: FastifyReply) {
    this.servicoPedirOrcamentoVerifications.execute(req);

    const pedido = await this.servicoPedirOrcamentoCase.execute(req);

    return res.status(201).send({ pedido, message: 'Pedido criado com sucesso' });
  }
}

export default ServicoPedirOrcamentoController;
