import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt';
import { sendMail } from '../utils/mail';

const prisma = new PrismaClient();
const refreshTokens = new Set<string>();

export const register = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, password: hashedPassword } });

  return { message: 'User registered successfully' };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  refreshTokens.add(refreshToken);

  return { accessToken, refreshToken };
};

export const refreshToken = (token: string) => {
  if (!refreshTokens.has(token)) throw new Error('Invalid refresh token');

  const decoded = verifyToken(token, config.jwtRefreshSecret) as { userId: string };
  const newAccessToken = generateAccessToken(decoded.userId);

  return { accessToken: newAccessToken };
};

export const resetPasswordRequest = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const resetToken = generateAccessToken(email);
  await sendMail(email, 'Password Reset', `Use this token to reset your password: ${resetToken}`);

  return { message: 'Password reset email sent' };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const decoded = verifyToken(token, config.jwtSecret) as { userId: string };
  console.log(decoded)
  const user = await prisma.user.findUnique({ where: { email: decoded.userId } });
  console.log(user)
  

  if (!user) throw new Error('Invalid token');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { message: 'Password successfully reset' };
};
