import { PEDIDO_PENDENTE } from '@constants/index';
import Pedidos from '@entities/Pedidos';
import { PrismaClient } from '@prisma/client';

import IPedidoRepository from '@repositories/IPedidoRepository';

class PrismaPedidoRepository implements IPedidoRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getByID(id: string): Promise<Pedidos> {
    return this.prisma.pedidos.findUnique({ where: { id } });
  }

  getAll(): Promise<Pedidos[]> {
    return this.prisma.pedidos.findMany();
  }

  create(servico: Pedidos): Promise<Pedidos> {
    return this.prisma.pedidos.create({ data: servico });
  }

  update(servico: Pedidos): Promise<Pedidos> {
    return this.prisma.pedidos.update({ where: { id: servico.id }, data: servico });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.pedidos.delete({ where: { id } }));
  }

  getByClienteAndServico(clienteId: string, servicoId: string): Promise<Pedidos> {
    return this.prisma.pedidos.findFirst({ where: { clienteId, servicoId, status: PEDIDO_PENDENTE } });
  }
}

export default PrismaPedidoRepository;
