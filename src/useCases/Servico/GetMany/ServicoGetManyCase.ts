import { FastifyInstance, FastifyRequest } from 'fastify';

import Servico from '@entities/Servico';
import ILoginRepository from '@repositories/ILoginRepository';
import IServicoRepository from '@repositories/IServicoRepository';
import ITiposServicoRepository from '@repositories/ITiposServico';
import AppError from '@errors/AppError';
import { ACCOUNT_CLIENTE, ACCOUNT_OPERATOR } from '@constants/index';
import { verifyToken } from '@shared/token';
import IServicoGetManyDTO from './IServicoGetManyDTO';

class ServicoGetManyCase {
  constructor(
    private server: FastifyInstance,
    private loginRepository: ILoginRepository,
    private tiposServicoRepository: ITiposServicoRepository,
    private servicoRepository: IServicoRepository,
  ) {}

  async execute(req: FastifyRequest<IServicoGetManyDTO>): Promise<Servico[]> {
    const { nome, descricao, tiposServicoId } = req.query;

    verifyToken(this.server, req);

    const login = await this.loginRepository.getByID(req.userID);
    if (!login) throw new AppError('O utilizador não existe', 401);
    if (login.type !== ACCOUNT_CLIENTE) throw new AppError('Apenas clientes podem selecionar serviços', 401);

    const tiposServico = await this.tiposServicoRepository.getByID(tiposServicoId);
    if(tiposServicoId && !tiposServico) throw new AppError('O tipo de serviço não existe', 404);

    const filters : GetServicosWithFilters = {};
    if (nome) filters.nome = { contains: nome };
    if (tiposServico) filters.tiposServicoId = tiposServico.id.toLowerCase();
    if (descricao) filters.descricao = { contains: descricao };

    return await this.servicoRepository.getByFilter(filters);
  }
}

export default ServicoGetManyCase;
