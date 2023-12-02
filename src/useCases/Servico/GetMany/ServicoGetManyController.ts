import { FastifyReply, FastifyRequest } from 'fastify';

import ServicoGetManyVerifications from './ServicoGetManyVerifications';
import ServicoGetManyCase from './ServicoGetManyCase';
import IServicoGetManyDTO from './IServicoGetManyDTO';

class ServicoCreateController {
  constructor(
    private servicoGetManyVerifications: ServicoGetManyVerifications,
    private servicoGetManyCase: ServicoGetManyCase,
  ) {}

  async handle(req: FastifyRequest<IServicoGetManyDTO>, res: FastifyReply) {
    this.servicoGetManyVerifications.execute(req);

    const servicos = await this.servicoGetManyCase.execute(req);

    return res.status(200).send({
        message: 'Serviços selecionados com sucesso',
        servicos: servicos
      });
  }
}

export default ServicoCreateController;
