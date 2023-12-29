import { PrismaClient } from '@prisma/client';

import Proposta from '@entities/Proposta';
import IPropostaRepository from '@repositories/IPropostaRepository';

class PrismaPropostaRepository implements IPropostaRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  criar(proposta: Proposta): Promise<Proposta> {
    return this.prisma.propostas.create({ data: proposta });
  }

  getByPedido(pedidoId: string): Promise<Proposta[]> {
    return this.prisma.propostas.findMany({ where: { pedidoID: pedidoId } });
  }
}

export default PrismaPropostaRepository;
