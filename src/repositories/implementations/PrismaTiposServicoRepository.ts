import { PrismaClient } from '@prisma/client';

import TiposServico from '@entities/TiposServico';
import ITiposServicoRepository from '@repositories/ITiposServico';

class PrismaTiposServicoRepository implements ITiposServicoRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getByID(id: string): Promise<TiposServico> {
    return this.prisma.tiposServico.findUnique({ where: { id } });
  }
}

export default PrismaTiposServicoRepository;
