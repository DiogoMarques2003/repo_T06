import { FastifyReply, FastifyRequest } from 'fastify';

import ServicoCreateCase from './ServicoCreateCase';
import ServicoCreateVerifications from './ServicoCreateVerifications';
import IServicoCreateDTO from './IServicoCreateDTO';

class ServicoCreateController {
  constructor(
    private servicoCreateVerifications: ServicoCreateVerifications,
    private servicoCreateCase: ServicoCreateCase,
  ) {}

  async handle(req: FastifyRequest<IServicoCreateDTO>, res: FastifyReply) {
    this.servicoCreateVerifications.execute(req);

    const servico = await this.servicoCreateCase.execute(req);

    return res.status(201).send({ servico, message: 'Serviço criado com sucesso' });
  }
}

export default ServicoCreateController;
