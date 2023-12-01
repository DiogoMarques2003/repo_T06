import { FastifyInstance, FastifyRequest } from 'fastify';
import { SignPayloadType } from '@fastify/jwt';

import AppError from '@errors/AppError';
import { BEARRER_REGEX } from '@constants/index';
import { verifyUUID } from './verifications';

function generateToken(payload: SignPayloadType, server: FastifyInstance) {
  return server.jwt.sign(payload);
}

function verifyToken(server:FastifyInstance, req: FastifyRequest) {
  const token = req.headers.authorization;

  if (!token) throw new AppError('Token não fornecido', 401);

  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2) throw new AppError('Token inválido', 401);

  const [scheme, tokenValue] = tokenParts;

  if (!BEARRER_REGEX.test(scheme)) throw new AppError('Token inválido', 401);

  const dataJWT = server.jwt.decode<DecodedJWTToken>(tokenValue, { complete: true });

  if (!dataJWT || !dataJWT.payload || !dataJWT.payload.id) throw new AppError('Token inválido', 401);

  if (verifyUUID(dataJWT.payload.id)) throw new AppError('Token inválido', 401);

  req.userID = dataJWT.payload.id;
}

export { generateToken, verifyToken };
