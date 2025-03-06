import bcrypt from 'bcryptjs';
import { config } from '../config';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt';
import { sendMail } from '../utils/mail';

const users = new Map<string, { email: string; password: string }>(); // Simulated DB
const refreshTokens = new Set<string>();

export const register = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(email, { email, password: hashedPassword });
  return { message: 'User registered successfully' };
};

export const login = async (email: string, password: string) => {
  const user = users.get(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);
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
  if (!users.has(email)) throw new Error('User not found');

  const resetToken = generateAccessToken(email); // Using access token logic for simplicity
  await sendMail(email, 'Password Reset', `Use this token to reset your password: ${resetToken}`);

  return { message: 'Password reset email sent' };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const decoded = verifyToken(token, config.jwtSecret) as { userId: string };

  if (!users.has(decoded.userId)) throw new Error('Invalid token');

  users.set(decoded.userId, { email: decoded.userId, password: await bcrypt.hash(newPassword, 10) });

  return { message: 'Password successfully reset' };
};
