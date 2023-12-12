import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/index';
import IServicoPedirOrcamentoDTO from './IServicoPedirOrcamentoDTO';

class ServicoPedirOrcamentoVerification {
  execute(req: FastifyRequest<IServicoPedirOrcamentoDTO>) {
    const { descricao } = req.body;
    const { servicoId } = req.params;

    if (!descricao || typeof descricao !== 'string' || descricao.length < 10) throw new AppError('Descrição inválida', 400);

    if (!servicoId || typeof servicoId !== 'string' || verifyUUID(servicoId)) throw new AppError('Serviço inválido', 400);
  }
}

export default ServicoPedirOrcamentoVerification;
