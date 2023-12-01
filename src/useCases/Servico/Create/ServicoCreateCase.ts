import { FastifyInstance, FastifyRequest } from 'fastify';

import Servico from '@entities/Servico';
import ILoginRepository from '@repositories/ILoginRepository';
import IServicoRepository from '@repositories/IServicoRepository';
import ITiposServicoRepository from '@repositories/ITiposServico';
import AppError from '@errors/AppError';
import { ACCOUNT_OPERATOR } from '@constants/index';
import { verifyToken } from '@shared/token';
import IServicoCreateDTO from './IServicoCreateDTO';

class ServicoCreateCase {
  constructor(
    private server: FastifyInstance,
    private loginRepository: ILoginRepository,
    private tiposServicoRepository: ITiposServicoRepository,
    private servicoRepository: IServicoRepository,
  ) {}

  async execute(req: FastifyRequest<IServicoCreateDTO>): Promise<Servico> {
    const { nome, descricao, tiposServicoId } = req.body;

    verifyToken(this.server, req);

    const login = await this.loginRepository.getByID(req.userID);
    if (!login) throw new AppError('O utilizador não existe', 401);
    if (login.type !== ACCOUNT_OPERATOR) throw new AppError('Apenas operadores podem criar serviços', 401);

    const tiposServico = await this.tiposServicoRepository.getByID(tiposServicoId);
    if (!tiposServico) throw new AppError('O tipo de serviço não existe', 404);

    const servicoDB = await this.servicoRepository.getByTipoServicoAndOwner(
      tiposServico.id,
      login.id,
    );
    if (servicoDB) throw new AppError('Já tens um serviço deste tipo', 400);

    const servico = new Servico({
      nome, descricao, tiposServicoId, donoId: login.id,
    });

    const servicoCreated = await this.servicoRepository.create(servico);

    return servicoCreated;
  }
}

export default ServicoCreateCase;
