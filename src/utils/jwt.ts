import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.tokenExpiry as number });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, config.jwtRefreshSecret, { expiresIn: config.refreshTokenExpiry as number });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
