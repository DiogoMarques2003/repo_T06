import { FastifyReply, FastifyRequest } from 'fastify';

import IPedidoCriarPropostaDTO from './IPedidoCriarPropostaDTO';
import PedidoCriarPropostaVerifications from './PedidoCriarPropostaVerifications';
import PedidoCriarPropostaCase from './PedidoCriarPropostaCase';

class PedidoCriarPropostaController {
  constructor(
    private pedidoCriarPropostaVerification: PedidoCriarPropostaVerifications,
    private pedidoCriarPropostaCase: PedidoCriarPropostaCase,
  ) {}

  async handle(req: FastifyRequest<IPedidoCriarPropostaDTO>, res: FastifyReply) {
    this.pedidoCriarPropostaVerification.execute(req);

    const proposta = await this.pedidoCriarPropostaCase.execute(req);

    return res.status(proposta ? 201 : 200).send(proposta ? {
      message: 'Proposta criada com sucesso',
      proposta,
    } : {
      message: 'Pedido recusado com sucesso',
    });
  }
}

export default PedidoCriarPropostaController;
