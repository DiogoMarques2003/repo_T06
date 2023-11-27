import { PrismaClient } from '@prisma/client';

import Login from '@entities/Login';
import ILoginRepository from '@repositories/ILoginRepository';

class PrismaLoginRepository implements ILoginRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getByID(id: string): Promise<Login> {
    return this.prisma.login.findUnique({ where: { id } });
  }
}

export default PrismaLoginRepository;
