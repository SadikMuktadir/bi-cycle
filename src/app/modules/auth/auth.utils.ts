import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string | number,
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
