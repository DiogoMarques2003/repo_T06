import { FastifyInstance } from 'fastify';

import { ACCOUNT_CLIENTE, ACCOUNT_OPERATOR } from '@constants/index';
import Login from '@entities/Login';
import { generateToken } from '@shared/index';
import TiposServico from '@entities/TiposServico';

async function populateTables(server: FastifyInstance) {
  let testUserOperator = new Login({
    email: 'testUserOperator@google.com',
    password: '123456',
    username: 'testUserOperator',
    type: ACCOUNT_OPERATOR,
  });

  let testUserClient = new Login({
    email: 'testUserClient@google.com',
    password: '123456',
    username: 'testUserClient',
    type: ACCOUNT_CLIENTE,
  });

  const servicoEletricista = new TiposServico({ nome: 'Eletricista' });
  const servicoPintor = new TiposServico({ nome: 'Pintor' });

  // Verificar se já existem usuários, se existir pegar nos dados deles, senão criar
  const users = await server.prisma.login.findMany();
  if (users.length) {
    testUserOperator = users.find((user) => user.type === ACCOUNT_OPERATOR);
    testUserClient = users.find((user) => user.type === ACCOUNT_CLIENTE);
  } else {
    await server.prisma.login.create({ data: testUserOperator });
    await server.prisma.login.create({ data: testUserClient });
  }

  // Verificar se existem tipos de serviço, se não existir criar novos
  const tiposServico = await server.prisma.tiposServico.findMany();
  if (!tiposServico.length) {
    await server.prisma.tiposServico.create({ data: servicoEletricista });
    await server.prisma.tiposServico.create({ data: servicoPintor });
  }

  console.log('\nTokens:');
  console.log(`Operator: ${generateToken({ id: testUserOperator.id }, server)}`);
  console.log(`Cliente: ${generateToken({ id: testUserClient.id }, server)}`);
}

export { populateTables };
