import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/verifications';
import IServicoCreateDTO from './IServicoCreateDTO';

class ServicoCreateVerifications {
  execute(req: FastifyRequest<IServicoCreateDTO>) {
    const {
      nome,
      descricao,
      tiposServicoId,
    } = req.body;

    if (!nome || typeof nome !== 'string' || nome.length < 3) throw new AppError('Nome inválido', 400);

    if (!descricao || typeof descricao !== 'string' || descricao.length < 3 || descricao.length > 200) throw new AppError('Descrição inválida', 400);

    if (!tiposServicoId || typeof tiposServicoId !== 'string' || verifyUUID(tiposServicoId)) throw new AppError('ID do tipo de serviço inválido', 400);
  }
}

export default ServicoCreateVerifications;
