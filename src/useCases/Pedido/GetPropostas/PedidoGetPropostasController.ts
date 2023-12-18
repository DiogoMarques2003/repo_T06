import { FastifyReply, FastifyRequest } from 'fastify';

import PedidoGetPropostasCase from './PedidoGetPropostasCase';
import PedidoGetPropostasVerifications from './PedidoGetPropostasVerifications';
import IPedidoGetPropostasDTO from './IPedidoGetPropostasDTO';

class PedidoGetPropostasController {
  constructor(
    private propostaGetManyVerifications: PedidoGetPropostasVerifications,
    private propostaGetManyCase: PedidoGetPropostasCase,
  ) {}

  async handle(req: FastifyRequest<IPedidoGetPropostasDTO>, res: FastifyReply) {
    this.propostaGetManyVerifications.execute(req);

    const propostas = await this.propostaGetManyCase.execute(req);

    return res.status(200).send({
      message: 'Serviços selecionados com sucesso',
      propostas,
    });
  }
}

export default PedidoGetPropostasController;
