import { PrismaClient } from '@prisma/client';

import Servico from '@entities/Servico';
import IServicoRepository from '@repositories/IServicoRepository';

class PrismaServicoRepository implements IServicoRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getByTipoServicoAndOwner(tiposServicoId: string, donoId: string): Promise<Servico> {
    return this.prisma.servico.findFirst({ where: { tiposServicoId, donoId } });
  }

  getByFilter(
    filtros: GetServicosWithFilters
  ): Promise<Servico[]> {
    return this.prisma.servico.findMany({
      where: filtros
    });
  }

  getByID(id: string): Promise<Servico> {
    return this.prisma.servico.findUnique({ where: { id } });
  }

  getAll(): Promise<Servico[]> {
    return this.prisma.servico.findMany();
  }

  create(servico: Servico): Promise<Servico> {
    return this.prisma.servico.create({ data: servico });
  }

  update(servico: Servico): Promise<Servico> {
    return this.prisma.servico.update({ where: { id: servico.id }, data: servico });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.servico.delete({ where: { id } }));
  }
}

export default PrismaServicoRepository;
