import { FastifyInstance } from 'fastify';

import { ACCOUNT_CLIENTE, ACCOUNT_OPERATOR } from '@constants/index';
import Login from '@entities/Login';
import { generateToken } from '@shared/index';

async function populateTables(server: FastifyInstance) {
  const testUserOperator = new Login({
    email: 'testUserOperator@google.com',
    password: '123456',
    username: 'testUserOperator',
    type: ACCOUNT_OPERATOR,
  });

  const testUserClient = new Login({
    email: 'testUserClient@google.com',
    password: '123456',
    username: 'testUserClient',
    type: ACCOUNT_CLIENTE,
  });

  // Apagar as contas antigas e criar as novas
  await server.prisma.login.deleteMany();
  await server.prisma.login.create({ data: testUserOperator });
  await server.prisma.login.create({ data: testUserClient });

  console.log('\nTokens:');
  console.log(`Operator: ${generateToken({ id: testUserOperator.id }, server)}`);
  console.log(`Cliente: ${generateToken({ id: testUserClient.id }, server)}`);
}

export { populateTables };
